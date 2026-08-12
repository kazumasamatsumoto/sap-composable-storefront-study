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
 */
@NgModule({
  providers: environment.labelCmsComponents
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
