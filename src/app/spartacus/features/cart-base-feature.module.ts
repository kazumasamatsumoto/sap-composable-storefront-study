import { NgModule } from '@angular/core';
import {
  cartBaseTranslationChunksConfig,
  cartBaseTranslationsEn,
  cartBaseTranslationsJa,
} from '@spartacus/cart/base/assets';
import {
  ADD_TO_CART_FEATURE,
  CART_BASE_FEATURE,
  CartBaseRootModule,
  MINI_CART_FEATURE,
} from '@spartacus/cart/base/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CartBaseRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CART_BASE_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base').then((m) => m.CartBaseModule),
        },
        [MINI_CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base/components/mini-cart').then(
              (m) => m.MiniCartModule
            ),
        },
        [ADD_TO_CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base/components/add-to-cart').then(
              (m) => m.AddToCartModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: cartBaseTranslationsEn, ja: cartBaseTranslationsJa },
        chunks: cartBaseTranslationChunksConfig,
      },
    }),
  ],
})
export class CartBaseFeatureModule {}
