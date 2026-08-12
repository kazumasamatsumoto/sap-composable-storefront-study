import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { CampaignNoticeComponent } from './campaign-notice.component';

/**
 * 【Case A】新規CMSコンポーネントの登録。
 * CMS(またはMSWモック)が flexType: 'EmintCampaignNoticeComponent' を返すと、
 * Spartacus がこのマッピングを引いて CampaignNoticeComponent を描画する。
 */
@NgModule({
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        EmintCampaignNoticeComponent: {
          component: CampaignNoticeComponent,
        },
      },
    }),
  ],
})
export class CampaignNoticeModule {}
