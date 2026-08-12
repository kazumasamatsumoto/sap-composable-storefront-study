import { NgModule } from '@angular/core';
import { MiniCartModule } from '@spartacus/cart/base/components/mini-cart';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { CustomMiniCartComponent } from './custom-mini-cart.component';

/**
 * 【ラッパーモジュール】lazy 機能内のコンポーネント差し替えの作法。
 *
 * lazy 機能(MINI_CART_FEATURE 等)は、その機能モジュールがロードされた時点で
 * 自分の CmsConfig を後から merge する。そのため AppModule(root)で先に上書きしても
 * 機能ロード時に標準マッピングへ戻されてしまう。
 * → 標準モジュールを import した「ラッパー」を作り、その providers で上書きすれば
 *   同一チャンク内で標準登録 → 上書きの順が保証される。
 *   features/cart-base-feature.module.ts の dynamic import をこのラッパーに向けて使う。
 */
@NgModule({
  imports: [MiniCartModule],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        MiniCartComponent: { component: CustomMiniCartComponent },
      },
    }),
  ],
})
export class CustomMiniCartModule {}
