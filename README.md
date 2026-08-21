# mystore — ng new から Spartacus を組み込んだ学習用リポジトリ

`ng new` で作った素の Angular 21 アプリに、Composable Storefront(Spartacus)を
**npm ライブラリとして組み込んだ**リポジトリ。
[構築手順書](https://learning-site-eta-five.vercel.app/guides/build-playbook) の
Phase 1〜2 を実体験するための教材で、「フォークではなくライブラリ導入」という
開発モデルをコードで確認できる。

## 実プロジェクトとの違い(1点だけ)

実プロジェクトでは `.npmrc` + RBSC(SAP のレジストリ)から `@spartacus/*` を取得するが、
ここでは RBSC ライセンスの代わりに **OSS clone(`../spartacus`)からビルドした
tarball(`../spartacus-dist/*.tgz`)を `file:` 参照**している。

```jsonc
// package.json(抜粋)— 実プロジェクトでは "221121.15.1" のようなバージョン指定になる
"@spartacus/core": "file:../spartacus-dist/spartacus-core-221121.15.1.tgz",
```

**それ以外の構成(app/spartacus/ 配下の配線・設定・スタイル)は
`ng add @spartacus/schematics` が生成するものと同じ形**にしてある。

## 起動

```bash
npm install --legacy-peer-deps   # feature-lib が @spartacus/schematics を peer 要求するため
npm start                        # http://localhost:4200
```

バックエンドは SAP のデモサーバー(`src/environments/environment.ts` の `occBaseUrl`)。
自己署名証明書のため、初回はブラウザで
`https://40.76.109.9:9002/occ/v2/basesites?fields=FULL` を開いて証明書例外を許可すること
(手順の詳細は学習サイトの「ローカル起動手順」参照)。

## 何がどこにあるか(読む順)

| ファイル | 役割 |
|---|---|
| `src/app/app-module.ts` | ルートモジュール。`AppRoutingModule`(**ライブラリ提供**)と `SpartacusModule` を読み込むだけ |
| `src/app/app.html` | `<cx-storefront>` 1 行だけ。**ページの中身は CMS 駆動で決まる**ため自分では書かない |
| `src/app/spartacus/spartacus.module.ts` | Spartacus 導入の入口(Base + Features + Configuration) |
| `src/app/spartacus/spartacus-configuration.module.ts` | 全設定の集約(OCC の向き先・baseSite・i18n・レイアウト) |
| `src/app/spartacus/spartacus-features.module.ts` | 使う機能の一覧。eager なベース CMS コンポーネント群+ lazy 機能 4 つ |
| `src/app/spartacus/features/*.ts` | 機能ごとの lazy load 宣言(`featureModules` に動的 `import()`。**Router は使っていない**ことを確認せよ) |
| `src/styles.scss` | Spartacus core → Bootstrap(内蔵)→ Spartacus styles の順の読み込み+自分の上書き場所 |

## 確認すべき学習ポイント

1. **ルート定義がどこにもない**のに全ページが表示される
   → ライブラリがワイルドカードルートを登録し CMS がページを返す(CMS 駆動ルーティング)
2. `features/cart-base-feature.module.ts` の動的 `import()`
   → DevTools の Network でカートページ初回表示時に chunk が遅延ロードされるのを見る
3. `spartacus-configuration.module.ts` の `provideConfig`
   → baseSite を `electronics` に変えると別ストアになる(設定駆動)
4. `styles.scss` 末尾で `--cx-color-primary` を上書き → ブランドカラーが一発で変わる
5. 次の一歩: 学習サイトの演習ドリル(コンポーネント差し替え・Outlet・カスタム API)を
   このリポジトリ上で実施する

## CMS型名バッジの ON / OFF

画面上の全部品に CMS 型名ラベルを出す仕掛け(`src/app/custom/all-components/`)。
移行の Gap 分析で「この部品はどの CMS 型か」を実機確認するのに使う。

**① 既定値**(`src/environments/environment.ts`):
```ts
labelCmsComponents: true,
```

**② 実行時に切り替える**(再ビルド不要。DevTools Console で実行してリロード。①より優先):
```js
localStorage.setItem('cx-label-components', 'on');   // 表示
localStorage.setItem('cx-label-components', 'off');  // 非表示
localStorage.removeItem('cx-label-components');      // environment の設定に戻す
```

## 制約(既知)

- feature の SCSS(`@spartacus/styles` 以外の機能別スタイル)は未取込。カート等の一部画面は
  素朴な見た目になる(必要になったら `@import '@spartacus/cart';` 等を styles 側に追加)
- SSR は未構成(次の学習ステップ。実プロジェクトでは Phase 1 から `--ssr` で入れる)
- B2C 構成のみ(B2B は `checkout/b2b` 等の root モジュール追加が必要)
