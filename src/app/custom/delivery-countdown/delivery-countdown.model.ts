import { CmsComponent } from '@spartacus/core';

/**
 * 【手法⑥】バックエンドの ItemType(EmintDeliveryCountdownComponent)の fields と 1:1。
 * CMS の属性値は文字列で届く点に注意(deadlineHour も string)。
 */
export interface CmsDeliveryCountdownComponent extends CmsComponent {
  title?: string;
  /** 当日出荷の締切時刻(0-23)。CMSからは文字列で届く */
  deadlineHour?: string;
  /** 締切経過後に表示するメッセージ */
  expiredMessage?: string;
  /** CTAボタンのラベル(固定文言をフロントに持たないため CMS 側で管理) */
  ctaLabel?: string;
  shippingNote?: string;
}
