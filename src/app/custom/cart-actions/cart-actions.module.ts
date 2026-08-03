import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CartActionsComponent } from './cart-actions.component';

@NgModule({
  declarations: [CartActionsComponent],
  imports: [CommonModule],
  providers: [
    // outlet の id には CMS スロット名がそのまま使える。
    // EmptyCartMiddleContent = CartPageTemplate の空カート中央スロット
    // (定義元: core-libs/storefront/recipes/config/layout-config.ts:110)
    provideOutlet({
      id: 'EmptyCartMiddleContent',
      position: OutletPosition.AFTER,
      component: CartActionsComponent,
    }),
  ],
})
export class CartActionsModule {}
