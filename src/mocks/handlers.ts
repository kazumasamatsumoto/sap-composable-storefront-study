import { bypass, http, HttpResponse } from 'msw';

/**
 * 【Case A 検証用】ホームページの CMS レスポンスに独自コンポーネントを注入する。
 *
 * 実案件ではバックエンドに ItemType(EmintCampaignNoticeComponent)を定義して
 * スロットに配置するが、検証フェーズ(CLAUDE.md: モックAPIを正とする)では
 * 実バックエンドのレスポンスを bypass fetch で取得 → JSON をパッチして返す。
 * これで「CMSが独自型を返してきたら Spartacus がどう描画するか」を実際に確認できる。
 */
const CAMPAIGN_NOTICE_COMPONENT = {
  uid: 'EmintCampaignNoticeDemo',
  typeCode: 'CMSFlexComponent',
  // Spartacus は flexType > typeCode > uid の優先順で CmsConfig.cmsComponents を引く
  flexType: 'EmintCampaignNoticeComponent',
  name: 'Emint Campaign Notice (MSW mock)',
  title: '移行検証キャンペーン実施中',
  message:
    'この帯は Case A(Composable Storefront に存在しない独自コンポーネント)を MSW で注入した表示検証です。',
  severity: 'info',
};

/**
 * 【手法⑥ 検証用】signal 版 新規CMSコンポーネント(delivery-countdown)のモックデータ。
 * 注入の仕組みは Case A と同じ。fields が全て文字列で届く点(deadlineHour)も実挙動に合わせる。
 */
const DELIVERY_COUNTDOWN_COMPONENT = {
  uid: 'EmintDeliveryCountdownDemo',
  typeCode: 'CMSFlexComponent',
  flexType: 'EmintDeliveryCountdownComponent',
  name: 'Emint Delivery Countdown (MSW mock)',
  title: '当日出荷',
  deadlineHour: '15',
  expiredMessage: '本日分の受付は終了しました(明営業日の出荷になります)',
  ctaLabel: 'カートを確認',
  shippingNote: '15時までのご注文で当日出荷(モック検証用の表示です)',
};

export const handlers = [
  http.get('*/cms/pages', async ({ request }) => {
    // MSW を素通しして実バックエンド(またはモックサーバー)から本物を取得
    const real = await fetch(bypass(request));
    if (!real.ok) {
      return real;
    }
    const page: any = await real.json();

    const label = new URL(request.url).searchParams.get('pageLabelOrId');
    const isHomepage = !label || label === '/' || label === 'homepage';

    const slots: any[] = page?.contentSlots?.contentSlot ?? [];
    if (isHomepage && slots.length > 0) {
      // powertools-spa(B2B)の LandingPage2Template では Section2A が本文上部
      const target =
        slots.find((s) => s.position === 'Section2A') ??
        slots.find((s) => Array.isArray(s?.components?.component));
      if (target) {
        target.components = target.components ?? {};
        target.components.component = [
          CAMPAIGN_NOTICE_COMPONENT,
          DELIVERY_COUNTDOWN_COMPONENT,
          ...(target.components.component ?? []),
        ];
      }
    }
    return HttpResponse.json(page);
  }),
];
