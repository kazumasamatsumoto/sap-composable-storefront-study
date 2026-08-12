import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { EnhancedBannerComponent } from './enhanced-banner.component';

/**
 * 【Case B】既存CMS型名の差し替え登録。
 * BannerModule(標準)が SimpleResponsiveBannerComponent → BannerComponent を登録済みだが、
 * 設定は deep-merge の「後勝ち」なので、AppModule でこのモジュールを後から import することで
 * 同型名を EnhancedBannerComponent に上書きできる(コアファイルは一切改変しない)。
 */
@NgModule({
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        SimpleResponsiveBannerComponent: {
          component: EnhancedBannerComponent,
        },
      },
    }),
  ],
})
export class EnhancedBannerModule {}
