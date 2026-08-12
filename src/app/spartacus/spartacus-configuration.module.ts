import { NgModule } from '@angular/core';
import {
  translationChunksConfig,
  translationsEn,
  translationsJa,
} from '@spartacus/assets';
import {
  FeaturesConfig,
  I18nConfig,
  OccConfig,
  SiteContextConfig,
  provideConfig,
  provideConfigFactory,
} from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfigFactory,
  mediaConfig,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';

@NgModule({
  providers: [
    provideConfigFactory(layoutConfigFactory),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
        },
      },
    }),
    provideConfig(<SiteContextConfig>{
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
        currency: ['USD'],
        language: ['en'],
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: translationsEn,
          ja: translationsJa,
        },
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<FeaturesConfig>{
      features: {
        level: '*',
      },
    }),
  ],
})
export class SpartacusConfigurationModule {}
