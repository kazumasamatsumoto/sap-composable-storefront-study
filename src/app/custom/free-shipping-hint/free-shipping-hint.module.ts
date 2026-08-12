import { NgModule } from '@angular/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { FreeShippingHintComponent } from './free-shipping-hint.component';

/**
 * 【手法⑦】outlet 登録は ① と同一。差し込むコンポーネントの中身が
 * signal ベースかどうかは outlet 機構に影響しない。
 * MiniCartComponent は lazy(cart-base)領域だが、outlet 登録自体は
 * root で行ってよい(CmsConfig と違い後から merge で戻されることはない)。
 */
@NgModule({
  providers: [
    provideOutlet({
      id: 'MiniCartComponent',
      position: OutletPosition.AFTER,
      component: FreeShippingHintComponent,
    }),
  ],
})
export class FreeShippingHintModule {}
