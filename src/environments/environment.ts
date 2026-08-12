export const environment = {
  production: false,
  // OCC(バックエンド)の向き先。ハードコードせず必ずここで管理する。
  // 現在は SAP のデモバックエンド。MSW モックや実環境に差し替えるのもここ。
  occBaseUrl: 'https://40.76.109.9:9002',
  // Case A 検証用: MSW で CMS レスポンスに独自コンポーネントを注入する(dev のみ有効)
  mockCms: true,
  // 全CMSコンポーネントに型名バッジを表示する(custom/all-components/)
  labelCmsComponents: true,
};
