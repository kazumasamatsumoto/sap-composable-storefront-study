import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from '@spartacus/storefront';

import { App } from './app';
import { AllComponentsModule } from './custom/all-components/all-components.module';
import { CampaignNoticeModule } from './custom/campaign-notice/campaign-notice.module';
import { CustomBreadcrumbModule } from './custom/overrides/breadcrumb/custom-breadcrumb.module';
import { CustomProductIntroComponentModule } from './custom/overrides/product-intro/product-intro.module';
import { CartActionsModule } from './custom/cart-actions/cart-actions.module';
import { DeliveryCountdownModule } from './custom/delivery-countdown/delivery-countdown.module';
import { DemoBarModule } from './custom/demo-bar/demo-bar.module';
import { EnhancedBannerModule } from './custom/enhanced-banner/enhanced-banner.module';
import { FreeShippingHintModule } from './custom/free-shipping-hint/free-shipping-hint.module';
import { ScenariosModule } from './custom/scenarios/scenarios.module';
import { SpartacusModule } from './spartacus/spartacus.module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    SpartacusModule,
    DemoBarModule,
    CartActionsModule,
    // 移行サンプル(SpartacusModule より後に import して CmsConfig を後勝ちさせる)
    CampaignNoticeModule, // Case A: 独自CMSコンポーネントの新規登録
    // Case B: 既存CMS型の継承コンポーネントへの差し替え
    // ⚠ ScenariosModule の ② modern-banner が同じ型名(SimpleResponsiveBannerComponent)を
    //   登録しており、後に import した方が勝つ。両方見たい場合は
    //   environment.scenarios.modernBanner を false にしてこちらを有効にする。
    EnhancedBannerModule,
    // モダンAPI版サンプル(signal / input() / output()。中身の書き方が違うだけで登録方法は同じ)
    DeliveryCountdownModule, // 手法⑥: signal版 新規CMSコンポーネント + smart/presentational分離
    FreeShippingHintModule, // 手法⑦: outlet差し込み × Facade の toSignal 消費
    // 全コンポーネント一括カスタマイズ層(全228型に型名バッジを outlet で差し込む)
    AllComponentsModule,
    // 個別オーバーライド(eager 領域。lazy 領域の MiniCart は features/cart-base-feature.module 側)
    CustomBreadcrumbModule,
    CustomProductIntroComponentModule, // generate-override.js で生成した雛形の例
    // カスタマイズ3シナリオ(独自部品の追加 / 既存部品の改修 / Outlet で重ねる)
    ScenariosModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
