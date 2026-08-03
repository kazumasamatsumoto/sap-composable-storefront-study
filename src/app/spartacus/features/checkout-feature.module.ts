import { NgModule } from '@angular/core';
import {
  checkoutTranslationChunksConfig,
  checkoutTranslationsEn,
  checkoutTranslationsJa,
} from '@spartacus/checkout/base/assets';
import {
  CHECKOUT_FEATURE,
  CheckoutRootModule,
} from '@spartacus/checkout/base/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CheckoutRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () =>
            import('@spartacus/checkout/base').then((m) => m.CheckoutModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: checkoutTranslationsEn, ja: checkoutTranslationsJa },
        chunks: checkoutTranslationChunksConfig,
      },
    }),
  ],
})
export class CheckoutFeatureModule {}
