export const environment = {
  production: false,
  // OCC(バックエンド)の向き先。ハードコードせず必ずここで管理する。
  // 現在は SAP のデモバックエンド。MSW モックや実環境に差し替えるのもここ。
  occBaseUrl: 'https://40.76.109.9:9002',
  // Case A 検証用: MSW で CMS レスポンスに独自コンポーネントを注入する(dev のみ有効)
  mockCms: false,
  // 全CMSコンポーネントに型名バッジを表示する(custom/all-components/)
  labelCmsComponents: true,

  /**
   * カスタマイズ3シナリオの ON/OFF(custom/scenarios/)。
   * 個別に切り替えて、素の状態との差分を確認できる。
   */
  scenarios: {
    /** ① JSP製の独自部品を CMSFlexComponent として移植 */
    storeNotice: true,
    /** ② 標準 Banner を継承してモダンなデザインに */
    modernBanner: true,
    /** ③ 画像バナーの上にキャンペーン帯を Outlet で重ねる */
    campaignOverlay: true,
  },
};
