import { CmsComponent } from '@spartacus/core';

/**
 * 【Case A】Accelerator 独自コンポーネントの CMS モデル定義。
 * バックエンド(-items.xml)の EmintCampaignNoticeComponent の fields と1:1で対応させる。
 * 検証フェーズでは MSW(src/mocks/handlers.ts)が同じ形の JSON を注入する。
 */
export interface CmsCampaignNoticeComponent extends CmsComponent {
  title?: string;
  message?: string;
  severity?: 'info' | 'warning';
}
