import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { CustomProductIntroComponent } from './product-intro.component';

/**
 * ProductIntroComponent を CustomProductIntroComponent に差し替える。
 * - eager 領域の型: AppModule で SpartacusModule より後に import する
 * - lazy 機能内の型: このモジュールに標準モジュールを imports に追加して
 *   「ラッパーモジュール」にし、features/*-feature.module.ts の dynamic import 先を
 *   このモジュールへ変更する(実例: custom/overrides/mini-cart/)
 */
@NgModule({
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        ProductIntroComponent: { component: CustomProductIntroComponent },
      },
    }),
  ],
})
export class CustomProductIntroComponentModule {}
