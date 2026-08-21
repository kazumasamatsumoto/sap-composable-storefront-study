import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { environment } from '../../../environments/environment';
import { CampaignOverlayComponent } from './campaign-overlay/campaign-overlay.component';
import { ModernBannerComponent } from './modern-banner/modern-banner.component';
import { StoreNoticeComponent } from './store-notice/store-notice.component';

/**
 * カスタマイズ3シナリオ(NgModule 版)。
 * standalone 版(mystore21)の scenarios.providers.ts と同じ内容を
 * NgModule の providers として提供する。
 *
 *  ① 独自部品の追加   : JSP 製の独自部品を CMSFlexComponent として移植(store-notice)
 *  ② 既存部品の改修   : 標準 Banner を継承してモダンなデザインに(modern-banner)
 *  ③ Outlet で重ねる  : 画像バナーの上にキャンペーン帯を差し込む(campaign-overlay)
 *
 * ON/OFF は environment.scenarios で個別に切り替えられる。
 * ⚠ AppModule では SpartacusModule より後に import すること(設定は後勝ち)。
 */
function buildProviders() {
  const flags = environment.scenarios;
  const providers: any[] = [];

  // ── ① 独自部品の追加(CMSFlexComponent) ─────────────────────
  if (flags.storeNotice) {
    providers.push(
      provideConfig(<CmsConfig>{
        cmsComponents: {
          // キーは CMSFlexComponent の flexType の値。
          // JspIncludeComponent のままなら uid をキーにする(非推奨)。
          StoreNoticeComponent: { component: StoreNoticeComponent },
        },
      }),
      // CMS 側に部品を用意できるまでのフォールバック
      provideOutlet({
        id: 'Section1',
        position: OutletPosition.BEFORE,
        component: StoreNoticeComponent,
      })
    );
  }

  // ── ② 既存部品の改修(継承 + 同型名で再登録) ─────────────────
  if (flags.modernBanner) {
    providers.push(
      provideConfig(<CmsConfig>{
        cmsComponents: {
          BannerComponent: { component: ModernBannerComponent },
          SimpleBannerComponent: { component: ModernBannerComponent },
          SimpleResponsiveBannerComponent: { component: ModernBannerComponent },
        },
      })
    );
  }

  // ── ③ Outlet で重ねる ────────────────────────────────────
  if (flags.campaignOverlay) {
    for (const type of [
      'SimpleResponsiveBannerComponent',
      'SimpleBannerComponent',
      'BannerComponent',
    ]) {
      providers.push(
        provideOutlet({
          id: type,
          position: OutletPosition.BEFORE,
          component: CampaignOverlayComponent,
        })
      );
    }
  }

  return providers;
}

@NgModule({
  providers: buildProviders(),
})
export class ScenariosModule {}
