#!/usr/bin/env node
/**
 * CMSコンポーネント型名から「継承オーバーライド」の雛形を生成する。
 *
 *   npm run generate:override -- ProductIntroComponent
 *
 * やること:
 *   1. ../spartacus のソースから cmsComponents 登録箇所を探し、実装クラスを特定
 *   2. 実装クラスの .ts / .html を読み、src/app/custom/overrides/<kebab>/ に
 *      継承コンポーネント + テンプレートコピー + 登録モジュールを生成
 *   3. 親クラスの import 元(@spartacus/... エントリポイント)をパスから推定
 *
 * 制約(生成後に手直しが必要な場合あり):
 *   - テンプレートが参照する standalone imports は元ファイルの imports 配列を
 *     そのまま写すため、@spartacus 外(相対 import)のものは TODO コメントになる
 *   - lazy 機能内の型は、生成される module を「ラッパーモジュール」として
 *     features/*-feature.module.ts の dynamic import 先に差し替えること
 *     (実例: custom/overrides/mini-cart/)
 */
const fs = require('fs');
const path = require('path');

const SPARTACUS = path.resolve(__dirname, '../../spartacus');
const OUT_ROOT = path.resolve(__dirname, '../src/app/custom/overrides');
const SEARCH_ROOTS = ['core-libs/storefront', 'feature-libs', 'integration-libs'];

const typeName = process.argv[2];
if (!typeName) {
  console.error('usage: npm run generate:override -- <CmsComponentTypeName>');
  process.exit(1);
}

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.ts') && !e.name.endsWith('.spec.ts')) yield p;
  }
}

// 1. cmsComponents 登録箇所から実装クラス名を特定
let className = null;
let mappingFile = null;
outer: for (const root of SEARCH_ROOTS) {
  for (const file of walk(path.join(SPARTACUS, root))) {
    const src = fs.readFileSync(file, 'utf8');
    const re = new RegExp(`${typeName}\\s*:\\s*{[^}]*component\\s*:\\s*(\\w+)`, 's');
    const m = src.match(re);
    if (m && src.includes('cmsComponents')) {
      className = m[1];
      mappingFile = file;
      break outer;
    }
  }
}
if (!className) {
  console.error(`✗ ${typeName} の cmsComponents 登録が見つからない(lazy import 形式の登録かも)。`);
  process.exit(1);
}
console.log(`✓ 実装クラス: ${className}(登録: ${path.relative(SPARTACUS, mappingFile)})`);

// 2. クラス定義ファイルを特定
let classFile = null;
for (const root of SEARCH_ROOTS) {
  for (const file of walk(path.join(SPARTACUS, root))) {
    if (fs.readFileSync(file, 'utf8').includes(`export class ${className} `)) {
      classFile = file;
      break;
    }
  }
  if (classFile) break;
}
if (!classFile) {
  console.error(`✗ export class ${className} が見つからない。`);
  process.exit(1);
}
const classSrc = fs.readFileSync(classFile, 'utf8');
const rel = path.relative(SPARTACUS, classFile);
console.log(`✓ クラス定義: ${rel}`);

// 3. 親クラスの import 元エントリポイントをパスから推定
//    core-libs/storefront/** → @spartacus/storefront
//    feature-libs/<lib>/<sub...>/(components|root|core)/** → @spartacus/<lib>/<sub>/(components|…)
function guessEntryPoint(relPath) {
  const seg = relPath.split(path.sep);
  if (seg[0] === 'core-libs') return `@spartacus/${seg[1] === 'storefront' ? 'storefront' : seg[1]}`;
  const lib = seg[1];
  const idx = seg.findIndex((s) => ['components', 'root', 'core', 'occ', 'assets'].includes(s));
  const middle = seg.slice(2, idx + 1).join('/');
  // mini-cart のような secondary entrypoint(components/<dir> に ng-package.json がある場合)
  const maybeSecondary = seg.slice(0, idx + 2).join(path.sep);
  if (fs.existsSync(path.join(SPARTACUS, maybeSecondary, 'ng-package.json'))) {
    return `@spartacus/${lib}/${seg.slice(2, idx + 2).join('/')}`;
  }
  return middle ? `@spartacus/${lib}/${middle}` : `@spartacus/${lib}`;
}
const entryPoint = guessEntryPoint(rel);
console.log(`✓ import 元(推定): ${entryPoint}`);

// 4. 元ファイルからテンプレートパス・selector・standalone imports を抽出
const templateUrlM = classSrc.match(/templateUrl\s*:\s*'([^']+)'/);
const selectorM = classSrc.match(/selector\s*:\s*'([^']+)'/);
const importsM = classSrc.match(/imports\s*:\s*\[([^\]]*)\]/s);
const templateHtml = templateUrlM
  ? fs.readFileSync(path.resolve(path.dirname(classFile), templateUrlM[1]), 'utf8')
  : null;
const selector = selectorM ? selectorM[1] : 'app-custom';
const standaloneImports = importsM
  ? importsM[1].split(',').map((s) => s.trim()).filter(Boolean)
  : [];

// 5. imports のそれぞれの由来を元ファイルの import 文から引く
function importSourceOf(name) {
  const re = new RegExp(`import\\s*{[^}]*\\b${name}\\b[^}]*}\\s*from\\s*'([^']+)'`, 's');
  const m = classSrc.match(re);
  return m ? m[1] : null;
}

// 6. 生成
const kebab = typeName
  .replace(/Component$/, '')
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .toLowerCase();
const outDir = path.join(OUT_ROOT, kebab);
if (fs.existsSync(outDir)) {
  console.error(`✗ ${outDir} は既に存在する。`);
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const customClass = `Custom${className}`;
const importLines = [];
const todoImports = [];
const bySource = new Map();
for (const name of standaloneImports) {
  const src = importSourceOf(name);
  if (src && !src.startsWith('.')) {
    if (!bySource.has(src)) bySource.set(src, []);
    bySource.get(src).push(name);
  } else if (src) {
    // 相対 import → @spartacus/storefront 等の public API から引けるか要確認
    todoImports.push(`${name}(元: ${src})`);
    if (!bySource.has('@spartacus/storefront')) bySource.set('@spartacus/storefront', []);
    bySource.get('@spartacus/storefront').push(name);
  }
}
for (const [src, names] of bySource) {
  importLines.push(`import { ${[...new Set(names)].join(', ')} } from '${src}';`);
}

const componentTs = `import { ChangeDetectionStrategy, Component } from '@angular/core';
${importLines.join('\n')}
import { ${className} } from '${entryPoint}';
${todoImports.length ? `// TODO: 次の imports は元ソースでは相対 import。public API に無ければ実装を確認すること:\n//   ${todoImports.join('\n//   ')}` : ''}
/**
 * ${typeName} の継承オーバーライド(generate-override.js による生成)。
 * 元実装: spartacus/${rel.split(path.sep).join('/')}
 * ロジックは標準クラスを相続し、テンプレート(コピー)だけを編集する。
 */
@Component({
  selector: '${selector}',
  templateUrl: './${kebab}.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [${standaloneImports.join(', ')}],
})
export class ${customClass} extends ${className} {}
`;

const moduleTs = `import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { ${customClass} } from './${kebab}.component';

/**
 * ${typeName} を ${customClass} に差し替える。
 * - eager 領域の型: AppModule で SpartacusModule より後に import する
 * - lazy 機能内の型: このモジュールに標準モジュールを imports に追加して
 *   「ラッパーモジュール」にし、features/*-feature.module.ts の dynamic import 先を
 *   このモジュールへ変更する(実例: custom/overrides/mini-cart/)
 */
@NgModule({
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        ${typeName}: { component: ${customClass} },
      },
    }),
  ],
})
export class ${customClass}Module {}
`;

fs.writeFileSync(path.join(outDir, `${kebab}.component.ts`), componentTs);
fs.writeFileSync(path.join(outDir, `${kebab}.module.ts`), moduleTs);
if (templateHtml) {
  fs.writeFileSync(
    path.join(outDir, `${kebab}.component.html`),
    `<!-- 元: spartacus/${path.relative(SPARTACUS, path.resolve(path.dirname(classFile), templateUrlM[1])).split(path.sep).join('/')} をコピー。ここを編集する -->\n${templateHtml}`
  );
} else {
  console.warn('! templateUrl が見つからないためテンプレートは未生成(inline template かも)');
}

console.log(`\n生成完了: ${path.relative(process.cwd(), outDir)}/`);
console.log(`次の手順:`);
console.log(`  1. ${kebab}.component.html を編集してカスタマイズする`);
console.log(`  2. ${customClass}Module を AppModule(eager)または feature module(lazy)へ配線する`);
console.log(`  3. ng build で TODO import が解決できているか確認する`);
