import { CmsComponent } from '@spartacus/core';

/**
 * 【シナリオ1】店舗お知らせコンポーネントのモデル。
 *
 * Accelerator 側は JspIncludeComponent(page 属性に JSP パスを持つ型)だったが、
 * SPA 化にあたり CMSFlexComponent へ「型を置き換えて」移植する。
 *
 * バックエンド ImpEx(SPA用コンテンツカタログ):
 *   INSERT_UPDATE CMSFlexComponent;$contentCV[unique=true];uid[unique=true];name;flexType
 *   ;;StoreNoticeFlex;Store Notice;StoreNoticeComponent
 *
 * さらに文言を CMS で管理したい場合は items.xml でカスタム型を定義する
 * (属性は OCC が自動的に返す — Commerce9 p149-150)。
 */
export interface CmsStoreNoticeComponent extends CmsComponent {
  /** 見出し */
  headline?: string;
  /** 本文(CMS 側で RichText にする場合は innerHTML で描画する) */
  body?: string;
  /** 表示トーン。CMS からは文字列で届く */
  tone?: 'info' | 'warning' | 'success';
  /** リンク先(cxRoute の名前ではなく CMS の URL) */
  linkUrl?: string;
  linkLabel?: string;
}
