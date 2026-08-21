import { NgModule } from '@angular/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { environment } from '../../../environments/environment';
import { ALL_CMS_COMPONENT_TYPES } from './all-cms-component-types';
import { ComponentBadgeComponent } from './component-badge.component';

/**
 * 【全コンポーネント一括カスタマイズ層】
 * Spartacus は各CMSコンポーネントを「型名と同名の outlet」で包んで描画するため、
 * 全228型の型名を outlet id にして provideOutlet すれば、
 * 個別実装ゼロで全コンポーネントの前(BEFORE)に任意のUIを差し込める。
 *
 * - 対象型がページに現れたときだけ描画される(未導入ライブラリの型は単に何も起きない)
 * - lazy ロードされる機能(cart/checkout等)のコンポーネントにも効く
 * - environment.labelCmsComponents で一括 on/off
 *
 * テンプレートや挙動そのものを変えたい型は custom/overrides/ の個別差し替えを使う
 * (作り方: npm run generate:override -- <型名>)。
 *
 * ## ON / OFF
 * ① environment.labelCmsComponents(既定値)
 * ② DevTools Console で実行時に切り替える(再ビルド不要。①より優先):
 *    localStorage.setItem('cx-label-components', 'on');   // 表示
 *    localStorage.setItem('cx-label-components', 'off');  // 非表示
 *    localStorage.removeItem('cx-label-components');      // environment に戻す
 */
/** 有効判定。localStorage の指定が最優先、無ければ environment の値を使う */
function isBadgeEnabled(): boolean {
  try {
    const override = globalThis.localStorage?.getItem('cx-label-components');
    if (override === 'on') return true;
    if (override === 'off') return false;
  } catch {
    // localStorage にアクセスできない環境(SSR 等)は environment に従う
  }
  return environment.labelCmsComponents;
}

@NgModule({
  providers: isBadgeEnabled()
    ? ALL_CMS_COMPONENT_TYPES.map((type) =>
        provideOutlet({
          id: type,
          position: OutletPosition.BEFORE,
          component: ComponentBadgeComponent,
        })
      )
    : [],
})
export class AllComponentsModule {}
