# 見積もり項目

体制（13名）: PM 1名 / BEリーダー(BE-L) 1名 / FEリーダー(FE-L) 1名 / BE開発(BE) 5名 / FE開発(FE) 5名
表記: 「BE-L / BE×2」= BEリーダーが主担当、BEメンバー2名がアサイン。「業務」= 業務部門（13名の外）。

## A-1 現行調査・棚卸

1. SAP Commerce Cloud + Spartacus学習
   - 担当: 全員（BE-L / FE-L がカリキュラム作成）
   - 内容: 公式ドキュメントと SAP のサンプルリポジトリで、CCv2 のリポジトリ構造（core-customize / js-storefront）、OCC、Spartacus の CMS 駆動レンダリングを全員が習得。BE は OCC と型システム、FE は Spartacus のコンポーネント差し替え方式を重点。

2. CMS型棚卸し(items.xml全件)
   - 担当: BE-L / BE×2
   - 内容: 全カスタム拡張の items.xml から CMS コンポーネント型・ページテンプレート・スロット定義を抽出して一覧化。A-2-1 の標準型照合の入力になる。

3. JSP/Controller棚卸し
   - 担当: BE×2 / FE×1
   - 内容: Accelerator の JSP・タグ・Controller を画面単位で一覧化。JSP 側に埋まっている表示条件や計算ロジックを洗い出す（OCC へ移す必要があるものの特定）。

4. Facade/DTO/Populator一覧
   - 担当: BE×2
   - 内容: 既存の Facade・DTO・Populator の一覧と依存関係。OCC でそのまま再利用できるもの／Accelerator 専用で作り直しが要るものを分類。

5. コンテンツカタログ調査
   - 担当: BE×1 / 業務
   - 内容: コンテンツカタログの構成、ページ数、Staged/Online の運用実態、Restriction の利用状況を確認。

6. B2B機能利用状況
   - 担当: PM / BE-L / 業務
   - 内容: 組織管理・承認ワークフロー・見積・クイックオーダー等のうち、実際に使われている機能を業務部門と確認。

7. 外部連携・AddOn調査
   - 担当: BE-L / BE×1
   - 内容: 決済・SSO・メール・物流などの外部連携方式を一覧化。導入済み AddOn（manifest の storefrontAddons）の役割と、Spartacus 移行後に不要になるものを特定。

8. 非機能の現状値取得(実測)
   - 担当: BE-L / FE-L
   - 内容: 現行の応答時間・LCP・スループット・エラー率を Dynatrace / 外形監視で実測し、移行後の比較基準にする。

9. 検索(Solr)設定棚卸し
   - 担当: BE×1
   - 内容: インデックス型・ファセット・ソート・同義語・ブースト設定を一覧化し、OCC の検索 API で同等に表現できるか確認。

10. 運用資産棚卸し(CronJob/メール/SEO/SSO)
    - 担当: BE×1 / PM
    - 内容: CronJob 一覧と実行 aspect、メールテンプレート、SEO 設定（URL・メタ・サイトマップ）、SSO 構成の棚卸し。

11. ローカルBE環境(2211-jdk21)構築
    - 担当: BE-L / BE×1
    - 内容: 全 BE メンバーが同一手順で構築できるローカル環境と手順書。Git 管理下のファイルだけから構築できることを確認する（ローカル成果物への依存を排除）。

12. FE開発環境・MSWモック基盤
    - 担当: FE-L / FE×1
    - 内容: Angular + Spartacus の開発環境と、OCC 応答を MSW でモックする基盤。BE 未完成でも FE 開発を進められる状態にする。

13. 廃止候補の「使っていない証拠」収集
    - 担当: PM / BE×1 / 業務
    - 内容: アクセスログ・Backoffice の更新履歴・業務ヒアリングから、廃止候補のページ・機能が未使用である証拠を集める。A-2-3 の判断材料。

## A-2 Fit/Gap

1. 標準型名照合(型名一致率の算出)
   - 担当: BE-L / FE-L
   - 内容: A-1-2 の CMS 型一覧を Spartacus 標準コンポーネント型と突合し、一致率を算出。Fit/Gap の定量根拠。

2. コンポーネント分類判定(①〜廃止)
   - 担当: FE-L / BE-L
   - 内容: 各 CMS コンポーネントを ①標準採用 ②継承差し替え ③新規 CMS 型 ④廃止 に分類。A-4-12〜14 の工数根拠。

3. 廃止・簡素化判断(業務部門レビュー)
   - 担当: PM / 業務
   - 内容: 分類④と簡素化候補を業務部門とレビューし、A-1-13 の証拠を示して合意を取る。

4. 画面×分類マトリクス(F/Gの数量根拠)
   - 担当: FE-L / PM
   - 内容: 画面ごとに構成コンポーネントと分類を並べ、Fit/Gap の数量を確定。最終見積の根拠表。

5. 移行ロードマップ・品質ゲート定義
   - 担当: PM / BE-L / FE-L
   - 内容: フェーズ分割、リリース単位、各ゲートの合格条件（テスト網羅・性能・セキュリティ）を定義。

6. 一次見積のステコミ報告
   - 担当: PM
   - 内容: ここまでの根拠で一次見積を作成し、ステアリングコミッティに報告。

7. 要件定義
   - 担当: PM / BE-L / FE-L / 業務
   - 内容: 移行後の機能要件・非機能要件・廃止一覧を文書化して合意。

## A-3 設計

1. FEアプリ構成設計(RBSC・遅延ロード)
   - 担当: FE-L
   - 内容: Spartacus の機能モジュール構成、遅延ロードの単位、共通部品の配置方針。（RBSC は用語解説参照・定義要確認）

2. ルーティング/URL・旧URLリダイレクト設計
   - 担当: FE-L / BE×1
   - 内容: Spartacus のルート設定と現行 URL の対応表。旧 URL → 新 URL のリダイレクトを CCv2 エンドポイントの redirect set で行うか Spartacus 側で行うかを決める。

3. スタイリング方針（トークン設計）
   - 担当: FE-L / FE×1
   - 内容: デザイントークン（色・余白・タイポグラフィ）の定義と SCSS 変数への落とし方、ブランドテーマの構造。

4. i18n/エラー/ローディング標準
   - 担当: FE-L
   - 内容: 翻訳キーの命名規約、エラー表示・ローディング表示の共通パターン。

5. カスタムOCC拡張設計(3拡張構成)
   - 担当: BE-L
   - 内容: 自社 OCC を core / facade / web の 3 拡張に分ける構成と、既存 AddOn ベース OCC からの移行方針。

6. 認証・認可設計(OAuth・B2Bロール)
   - 担当: BE-L / FE-L
   - 内容: OAuth クライアント設定、トークンの運用、B2B ロールと OCC スコープの対応。

7. CMS設計(カタログ分離・スロット)
   - 担当: BE-L / FE-L
   - 内容: SPA 用コンテンツカタログの分離方針、ページテンプレートとスロットの設計、Restriction の扱い。

8. SmartEdit設計(allowlist・編集範囲)
   - 担当: BE-L / FE×1
   - 内容: SmartEdit で Spartacus を編集対象にするための allowlist 設定と、編集を許可する範囲。

9. インフラ・NW設計(CORS/CSP/CDN/WAF/SSR)
   - 担当: BE-L / FE-L
   - 内容: JS Storefront ↔ API 間の CORS、CSP ヘッダ、CDN キャッシュ方針、WAF ルール、SSR 採用の判断。

10. 外部連携方式設計
    - 担当: BE-L / BE×1
    - 内容: 決済・SSO 等を Spartacus からどう呼ぶか（OCC 経由／直接／リダイレクト）を方式ごとに決める。

11. UX設計・デザイン連携(トークン変換仕様)
    - 担当: FE-L / FE×1
    - 内容: デザインツールのトークンをコードへ変換する仕様と、デザイナーとの受け渡しルール。

12. 計測設計(KPI・イベント仕様)
    - 担当: PM / FE-L
    - 内容: 計測する KPI と、アナリティクスに送るイベントの定義。

13. 開発標準・セキュア実装規約
    - 担当: BE-L / FE-L
    - 内容: コーディング規約、レビュー基準、セキュア実装（XSS / CSRF / 認可漏れ）のチェックリスト。

14. CCv2環境設定(manifest・拡張有効化)
    - 担当: BE-L / FE-L
    - 内容: core-customize/manifest.json（バージョン・extensions・properties・aspects）と js-storefront/manifest.json（applications・CSR/SSR・nodeVersion）の設計。リポジトリを core-customize / js-storefront 構造に整備。

15. 接続初期設定(OAuth/CORS/ImpEx)
    - 担当: BE-L / BE×1
    - 内容: OAuth クライアント、CORS プロパティ、初期 ImpEx を環境ごとに投入。

16. CDN/WAF・外形監視の構築
    - 担当: BE-L
    - 内容: CDN 設定、Cloud Portal の WAF・レート制限、外形監視の構築。

17. ドメイン・証明書・メール認証(SPF/DKIM)
    - 担当: BE-L / PM
    - 内容: エンドポイントのドメインと SSL 証明書、送信メールの SPF / DKIM 設定。

18. Cloud Portal初期整備(S-user・2FA)
    - 担当: PM / BE-L
    - 内容: Cloud Portal のユーザー・ロール付与、S-user 管理、2FA の有効化。

19. リポジトリ・ブランチ戦略
    - 担当: BE-L / FE-L
    - 内容: 単一リポジトリか submodule 分割かの判断、ブランチ運用、CCv2 のビルド対象ブランチの決定。

20. ビルドパイプライン(lint/test/build:ssr)
    - 担当: FE-L / BE×1
    - 内容: CCv2 ビルドの前に CI で lint・単体テスト・ビルドを回す構成。SSR 採用時は build:ssr の検証。

21. デプロイ自動化
    - 担当: BE-L
    - 内容: Cloud Portal API を使ったビルド・デプロイの自動化。

22. アカウント・管理権限運用
    - 担当: PM / BE-L
    - 内容: Cloud Portal・Backoffice・hAC・Git のアカウント発行と棚卸しのルール。

23. シークレット管理
    - 担当: BE-L
    - 内容: 秘密情報を Git に置かず Cloud Portal のサービスプロパティで管理する運用。

24. 脆弱性管理
    - 担当: BE-L / FE-L
    - 内容: 依存ライブラリ（npm / Java）の脆弱性スキャンと対応期限のルール。

25. WAF/IP制御/bot対策運用設計
    - 担当: BE-L
    - 内容: エンドポイントの IP フィルタセット、レート制限、bot 対策の運用手順。

26. セキュリティ監視・監視ログ設計
    - 担当: BE-L
    - 内容: OpenSearch のアラート設定と監査ログの保全。

27. セキュリティインシデント対応設計
    - 担当: PM / BE-L
    - 内容: 検知 → 初動 → SAP 連絡 → 報告の手順。

28. コンプライアンス確認
    - 担当: PM
    - 内容: 個人情報・Cookie 同意・法令要件の確認。

29. 監視設計(SLI/SLO/計測/ルーティング)
    - 担当: BE-L / FE-L
    - 内容: SLI の定義、Dynatrace / 外形監視 / OpenSearch の役割分担、アラートの通知先。

30. 障害対応・サポート導線設計
    - 担当: PM / BE-L
    - 内容: 障害時のエスカレーション、SAP for Me チケットの起票基準と添付物（ログ・Deployment ID・時刻）。

31. 証明書・ドメイン運用
    - 担当: BE-L
    - 内容: 証明書更新・ドメイン変更の手順と期限管理。

32. DR/BCP
    - 担当: PM / BE-L
    - 内容: CCv2 の DR サービス範囲を確認し、自社側の復旧計画を定義。

33. 責任分界点整理
    - 担当: PM / BE-L
    - 内容: SAP（インフラ・プラットフォーム）と自社（コード・設定・データ）の責任範囲を明文化。

34. Runbook整備
    - 担当: BE-L / FE-L
    - 内容: 定常運用・障害対応の手順書。

35. キャパシティ・スケーリング運用設計
    - 担当: BE-L
    - 内容: 負荷に応じたスケーリングと SAP への申請手順。

36. バックアップ・リストア運用設計
    - 担当: BE-L
    - 内容: DB / メディアのバックアップ範囲とリストア手順。

37. パッチ・アップデート運用設計
    - 担当: BE-L / FE-L
    - 内容: Commerce Cloud パッチ（commerceSuiteVersion）と Spartacus の追従サイクル。サポート切れ版ではビルドが失敗するため期限管理を含む。

38. ジョブ・バッチ運用設計
    - 担当: BE-L / BE×1
    - 内容: CronJob の実行 aspect（nodeGroup / cluster.node.groups）の割り当てと監視。

39. 障害対応訓練設計
    - 担当: PM / BE-L
    - 内容: 訓練シナリオと実施計画。

40. SLO運用設計
    - 担当: PM / BE-L
    - 内容: SLO の見直しサイクルとエラーバジェットの運用。

41. オンコール体制設計
    - 担当: PM
    - 内容: 当番体制・連絡手段・交代ルール。

42. テストデータ・環境利用計画
    - 担当: PM / BE-L
    - 内容: dev / staging / prod の用途分け、テストデータの投入と匿名化方針。

43. テストマネジメント(計画書・欠陥プロセス)
    - 担当: PM
    - 内容: テスト計画書、欠陥管理フロー、合否基準。

44. トップページ移植（最終見積もりの測定用）
    - 担当: FE-L / FE×2 / BE×1
    - 内容: トップページ 1 画面を実際に Spartacus へ移植して実工数を測定し、最終見積の係数にする。

## A-4 実装

1. 開発者研修
   - 担当: BE-L / FE-L → 全員
   - 内容: 設計標準・開発環境・レビュー基準を全員に展開。

2. AddOnベースOCCのCore OCC化
   - 担当: BE-L / BE×2
   - 内容: AddOn として実装されていた OCC 端点を、commercewebservices を拡張する独立拡張に移す。

3. OCC拡張雛形(3拡張)+ビルド疎通
   - 担当: BE-L / BE×1
   - 内容: 3 拡張の骨格を作り、CCv2 でビルド・デプロイが通ることを最初に確認する。

4. FE基盤実装(雛形・共通部品)
   - 担当: FE-L / FE×2
   - 内容: Spartacus アプリ雛形、共通サービス・ガード・インターセプタ、OCC 接続設定（baseUrl は index.html の meta タグ運用）。

5. LayoutConfig + テンプレートSCSS
   - 担当: FE×2
   - 内容: ページテンプレートごとの LayoutConfig（スロット配置）と対応する SCSS。

6. SPA用カタログ構築
   - 担当: BE×1
   - 内容: Spartacus 用コンテンツカタログの作成と Staged / Online の設定。

7. テンプレート/スロットImpEx
   - 担当: BE×2
   - 内容: ページテンプレート・スロット・コンポーネント定義の ImpEx。

8. 端点実装(S/M/L)+API仕様書+MSWモック
   - 担当: BE×5
   - 内容: 新規 OCC 端点を規模別（S/M/L）に実装。OpenAPI 仕様書を書き、FE 用の MSW モックを同時に提供。

9. DTO/Populator拡張(既存端点への属性追加)
   - 担当: BE×3
   - 内容: 既存 OCC 端点の DTO に自社属性を追加する Populator の実装。

10. items.xml・型システム(新規型追加)
    - 担当: BE×2
    - 内容: 新規 CMS 型・業務型の items.xml 定義。

11. 端点の認可・スコープ設定
    - 担当: BE-L / BE×1
    - 内容: OCC 端点ごとの OAuth スコープと B2B ロール制御。

12. コンポーネント①標準採用(CMS設定のみ)
    - 担当: FE×1 / BE×1
    - 内容: Spartacus 標準コンポーネントをそのまま使う。CMS 側の型・データ設定のみ。

13. コンポーネント②継承差し替え
    - 担当: FE×3
    - 内容: 標準コンポーネントを継承・拡張して置き換える（Outlet / ConfigModule による差し替え）。

14. コンポーネント③新規CMS型
    - 担当: FE×3 / BE×1
    - 内容: 自社固有 CMS 型に対応する Angular コンポーネントの新規実装。BE 側で型定義（A-4-10）。

15. CMSFlex/Outlet差し込み
    - 担当: FE×2
    - 内容: CMSFlexComponent や Outlet を使った差し込み実装。

16. 画面横断機能(ヘッダ/検索/PLP/PDP/カート)
    - 担当: FE×4
    - 内容: 全ページ共通の主要機能（ヘッダ、検索、商品一覧、商品詳細、カート）。

17. チェックアウトフロー(ステップ別)
    - 担当: FE×3 / BE×1
    - 内容: 配送・支払・確認の各ステップと決済連携。

18. B2B機能(組織/承認WF/見積/クイックオーダー)
    - 担当: FE×3 / BE×2
    - 内容: Spartacus の B2B ライブラリ採用と自社カスタマイズ。

19. スタイリング(ブランドテーマ・レスポンシブ)
    - 担当: FE×2
    - 内容: トークンに基づくテーマ実装とレスポンシブ対応。

20. i18n辞書(言語別・通貨・日付)
    - 担当: FE×1 / 業務
    - 内容: 翻訳辞書、通貨・日付フォーマット。

21. アクセシビリティ/ブラウザ対応
    - 担当: FE×2
    - 内容: WCAG 対応と対象ブラウザでの検証・修正。

22. 旧URL→新URLリダイレクト実装
    - 担当: FE×1 / BE-L
    - 内容: A-3-2 の設計を実装（CCv2 redirect set または Spartacus ルート）。

23. アナリティクス実装(タグ・イベント)
    - 担当: FE×1
    - 内容: A-3-12 の計測設計に基づくタグ・イベント送信。

24. ページ・コンポーネント投入(Restriction含む)
    - 担当: BE×2 / 業務
    - 内容: 各ページのコンポーネント配置と Restriction を ImpEx / SmartEdit で投入。

25. ナビゲーションノード移送
    - 担当: BE×1
    - 内容: ヘッダ・フッタ等のナビゲーションノードを SPA 用カタログへ移送。

26. メディア参照整備
    - 担当: BE×1
    - 内容: 画像・メディアの参照先（メディアコンテナ・フォーマット）の整備。

27. Staged→Online同期運用の確立
    - 担当: BE-L / 業務
    - 内容: 同期ジョブ、承認フロー、リリースとの同期タイミング。

28. ローカライズ投入
    - 担当: BE×1 / 業務
    - 内容: 言語別 CMS コンテンツ・商品属性の投入。

29. 単体テスト(FE Jest/BE JUnit)
    - 担当: FE×5 / BE×5
    - 内容: 各実装と同時に作成。カバレッジ基準は A-2-5 の品質ゲートに従う。

30. 結合テスト(実OCC)・B2B認可・契約テスト
    - 担当: FE-L / BE-L / FE×2 / BE×2
    - 内容: MSW を外して実 OCC で結合。B2B ロール別の認可、API 仕様（契約）との一致を検証。

31. E2E基盤構築+主要導線シナリオ
    - 担当: FE-L / FE×2
    - 内容: E2E ツール基盤と、購買導線・ログイン・検索の主要シナリオ。

32. SSR検証(初期HTML・window混入・SEO)
    - 担当: FE-L / FE×1
    - 内容: SSR 採用時、初期 HTML の内容、window 参照による SSR エラー、SEO タグを検証。

33. デプロイ戦略実装+canary判定基準書
    - 担当: BE-L / PM
    - 内容: Blue/Green・canary の運用実装と、切り替え判定基準の文書化。

34. ロードマップ追随(リリース追従)1回消化
    - 担当: FE-L / BE-L / FE×1 / BE×1
    - 内容: 開発期間中に Spartacus / Commerce Cloud のパッチを 1 回取り込み、追従手順を確立。

35. 設計書・手順書の整備・維持
    - 担当: BE-L / FE-L
    - 内容: 設計書・Runbook・トラブルシュート記録の維持。

## A-5 検証

1. 回帰テスト運用(自動+手動セット)
   - 担当: PM / FE×2 / BE×2
   - 内容: 自動テスト（E2E・単体）と手動チェックリストの運用。

2. SmartEdit検証(配置・編集・同期)
   - 担当: BE×1 / FE×1 / 業務
   - 内容: SmartEdit からの配置・編集・Staged→Online 同期の動作確認。

3. ブラウザ/デバイスマトリクス実行
   - 担当: FE×3
   - 内容: 対象ブラウザ・デバイスの組み合わせ検証。

4. CMSコンテンツ表示検証(全ページ×言語)
   - 担当: FE×2 / BE×1 / 業務
   - 内容: 全ページ・全言語の表示確認。

5. 性能・負荷テスト(SAP申請こみ)
   - 担当: BE-L / FE-L / PM
   - 内容: Cloud Portal の性能テスト機能で実施。SAP への事前申請が必要。

6. セキュリティ検証・脆弱性診断
   - 担当: BE-L / PM
   - 内容: 外部診断の手配と実施。

7. 診断指摘対応+再診断
   - 担当: BE×2 / FE×2
   - 内容: 指摘の修正と再診断。

8. CRC(Cloud Readiness Check)準備・申請
   - 担当: PM / BE-L
   - 内容: 本番 Go-Live 前に SAP が行う準備状況確認。チェックリストの準備と申請。

## 補足

- BE-L に CCv2 の環境・セキュリティ・運用設計（A-3-14〜41）が集中する。SAP との責任分界が絡むため、PM が半分を持つか、運用設計に外部支援を入れる判断が要る。
- A-3-44「トップページ移植」は最終見積の精度を決める。省くと A-4 が推定のままになる。

## 用語解説

### プラットフォーム

- **SAP Commerce Cloud（旧 hybris）**: SAP の EC プラットフォーム。Java ベース。本文書ではバックエンド全体を指す。
- **CCv2**: SAP Commerce Cloud の Public Cloud 版（Azure / Kubernetes 上）。ビルド・デプロイは Cloud Portal から行い、サーバーに SSH できない。
- **Cloud Portal**: CCv2 の管理画面。ビルド・デプロイ・エンドポイント・サービス・ログ・監視を操作する。
- **エンドポイント**: Cloud Portal 上の公開入口。ドメイン・IP フィルタ・どのサービスに流すか（Storefront / JS Storefront / API / Backoffice 等）を設定する。既定は DENY ALL。
- **サービス / aspect**: Platform の実行形態。accstorefront（Accelerator）、api（OCC）、backoffice、backgroundProcessing（CronJob）など。manifest の aspects で定義。
- **manifest.json**: CCv2 のビルド定義。core-customize/manifest.json（BE）と js-storefront/manifest.json（FE）の 2 つがある。
- **core-customize / js-storefront**: CCv2 が期待するリポジトリの 2 大ディレクトリ。BE カスタマイズと JS ストアフロント。
- **OpenSearch（旧 Kibana）**: CCv2 のログ閲覧画面。インデックス logs-json-* を選ぶ。
- **Dynatrace**: CCv2 付属の監視ツール。Pod の状態・性能を見る。
- **S-user**: SAP サポートポータル用アカウント。Cloud Portal のログインにも使う。
- **CRC（Cloud Readiness Check）**: 本番 Go-Live 前に SAP が実施する準備状況確認。申請が必要。
- **SAP for Me**: SAP へのサポートチケット起票窓口。

### バックエンド（SAP Commerce）

- **拡張（extension）**: SAP Commerce の機能単位。自社コードは bin/custom/ 配下の拡張として実装。
- **items.xml**: 拡張ごとのデータ型定義。CMS コンポーネント型・商品属性などの型はここで定義。
- **CMS 型 / CMS コンポーネント**: ページに配置する部品の型。Spartacus は CMS 型名を見て対応する Angular コンポーネントを描画する。
- **ページテンプレート / スロット**: ページの枠と、部品を置く領域。Spartacus 側では LayoutConfig でスロット配置を定義。
- **コンテンツカタログ / Staged→Online**: CMS データの入れ物。編集用（Staged）から公開用（Online）へ同期して公開する。
- **Restriction**: CMS の表示制限（ユーザーグループ・時間・カタログ別）。Spartacus でも適用される。
- **ナビゲーションノード**: ヘッダ・フッタなどのメニュー構造を表す CMS データ。
- **ImpEx**: SAP Commerce のデータ投入形式（CSV 風）。CMS・商品・設定データの投入に使う。
- **Facade / DTO / Populator**: Facade = 業務ロジックの入口、DTO = API で返すデータ構造、Populator = モデルから DTO への変換。OCC はこの 3 層で作る。
- **OCC（Omni Commerce Connect）**: SAP Commerce の REST API。Spartacus はすべて OCC 経由で BE と通信する（/occ/v2/<baseSite>/...）。
- **commercewebservices**: OCC を提供する標準拡張。自社端点はこれを拡張して作る。
- **AddOn**: Accelerator に機能を差し込む拡張形式。Spartacus では不要になる（manifest の storefrontAddons）。
- **Accelerator / yacceleratorstorefront**: 従来の JSP ベースのストアフロント。今回の移行元。
- **Solr**: 検索エンジン。商品検索・ファセットを担う。
- **CronJob / nodeGroup**: 定期バッチ。CCv2 では cluster.node.groups で実行する aspect を指定。
- **Backoffice**: 管理画面（商品・注文・CMS 管理）。
- **hAC**: hybris Administration Console。技術者向け管理コンソール（ImpEx 実行・設定確認）。
- **SmartEdit**: CMS のビジュアル編集ツール。Spartacus を編集対象にするには allowlist 設定が必要。
- **B2B ロール / 組織 / 承認ワークフロー**: 購買者・承認者などのロール、組織階層、注文承認の流れ。
- **OAuth / スコープ**: OCC の認証方式。クライアント ID とスコープで端点へのアクセスを制御。
- **2211-jdk21**: SAP Commerce のバージョン系列。2211 リリースの JDK 21 版。

### フロントエンド（Composable Storefront）

- **Composable Storefront / Spartacus**: SAP 公式の Angular 製ストアフロント。OCC のみで BE と通信する。Spartacus はオープンソース時代の名称で、現在の製品名が Composable Storefront。
- **Angular**: Google 製のフロントエンドフレームワーク。Spartacus の基盤。
- **CSR / SSR**: Client-Side Rendering（ブラウザで描画）／Server-Side Rendering（Node サーバーで初期 HTML を生成）。SSR は SEO・初期表示に有利だが運用が複雑。
- **JS Storefront**: CCv2 上で Spartacus を配信するサービス／エンドポイントの名前。
- **baseUrl / OCC_BACKEND_BASE_URL_VALUE**: Spartacus が叩く OCC の URL。CCv2 では index.html の meta タグにプレースホルダーを置き、デプロイ時に環境の API URL へ置換される。
- **BaseSite**: サイト識別子。OCC の URL パスに入る。
- **LayoutConfig**: ページテンプレートごとのスロット配置を定義する Spartacus の設定。
- **Outlet**: Spartacus の差し込み口。標準コンポーネントの前後・置換に自社コンポーネントを差し込む仕組み。
- **CMSFlexComponent**: CMS 側で任意のコンポーネント名を指定して Spartacus 側の実装に結びつける柔軟な CMS 型。
- **遅延ロード（lazy loading）**: 必要になったときにモジュールを読み込む。初期表示を軽くする。
- **RBSC**: 原文の略称。標準用語ではないため、設計書内での定義を確認のこと。
- **デザイントークン**: 色・余白・フォントなどを変数として定義したもの。デザインとコードの共通言語。
- **i18n**: 国際化。翻訳辞書・通貨・日付フォーマット。
- **MSW（Mock Service Worker）**: ブラウザで API 応答をモックするライブラリ。BE 未完成時に FE 開発を進めるために使う。
- **Jest / JUnit**: 単体テストフレームワーク（FE / BE）。
- **E2E テスト**: ブラウザを自動操作して導線全体を検証するテスト。
- **契約テスト**: API 仕様（OpenAPI）と実装・利用側が一致していることを検証するテスト。
- **アクセシビリティ / WCAG**: 障害のある利用者を含む誰でも使えるようにする基準。

### インフラ・セキュリティ・運用

- **CORS**: 別ドメイン間の API 呼び出し許可。JS Storefront から API を呼ぶために corsfilter.* プロパティで許可する。
- **CSP**: Content Security Policy。読み込みを許可するスクリプト・リソースの出所を制限するヘッダ。
- **CDN**: コンテンツ配信網。静的ファイルのキャッシュ配信。
- **WAF**: Web Application Firewall。攻撃パターンの遮断・レート制限。Cloud Portal のエンドポイント設定に含まれる。
- **IP フィルタセット**: エンドポイントへのアクセスを許可する IP の一覧。
- **SPF / DKIM**: 送信メールのなりすまし防止設定。
- **2FA**: 二要素認証。
- **SLI / SLO**: サービスレベル指標／目標。可用性・応答時間の測定と目標値。
- **エラーバジェット**: SLO を満たした上で許容される失敗の余地。
- **DR / BCP**: 災害復旧／事業継続計画。
- **Runbook**: 運用・障害対応の手順書。
- **オンコール**: 障害時に対応する当番体制。
- **Blue/Green / canary**: 新旧 2 系統を用意して切り替える（Blue/Green）、一部トラフィックだけ新系統に流す（canary）デプロイ方式。CCv2 は Storefront / JS Storefront / API で対応。
- **責任分界点**: SAP（インフラ・プラットフォーム）と自社（コード・設定・データ）の責任範囲の境界。
- **外形監視**: 外部から実際にアクセスして稼働を確認する監視。

### プロジェクト管理

- **Fit/Gap**: 標準機能で満たせる（Fit）か、カスタマイズが要る（Gap）かの分析。
- **コンポーネント分類 ①〜④**: ①標準採用（CMS 設定のみ）②継承差し替え ③新規 CMS 型 ④廃止。工数係数が段階的に上がる。
- **品質ゲート**: フェーズを進める合格条件。
- **ステコミ（ステアリングコミッティ）**: 経営層・部門長による意思決定会議。
- **ロードマップ追随**: SAP のリリース（月次パッチ・年次メジャー）に自社実装を追従させること。サポート切れ版でのビルドは失敗する。
