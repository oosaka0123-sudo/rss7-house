# RSS7 HOUSE — AI開発ルール

## 目的
関西の注文住宅会社を想定した、営業デモ用の高速・高品質な静的サイト。GitHub Pagesで公開できる状態を常に維持する。

## 最優先
1. Performance / 主要情報を即表示
2. Usability / Mobile First
3. Content / 信頼できる住宅情報
4. Design / Editorial Premium
5. Motion / Progressive Enhancement

## 役割
- Claude Code: 主実装、設計統合、最終判断
- Google Jules: 定型修正、リンク・alt・SEO・複数ファイル反映
- OpenAI Codex: 技術監査、性能、アクセシビリティ、難しい不具合
- GitHub Copilot: PR差分レビュー、セキュリティ、意図しない変更の検出

## 禁止
- mainへの複数Agent同時書き込み
- Loading画面、scroll jack、巨大ライブラリ、無意味な全要素アニメーション
- 他社サイト・文章・写真・ロゴのコピー
- 実行していないAgentレビューを実施済みと記載すること
- デモの性能値・施工事例を実在企業の実績と誤認させること

## 開発フロー
Task → Branch → Implementation → Local QA → Pull Request → Independent Review → Fix → Merge → GitHub Pages

## 品質ゲート
- `node --check script.js`
- リンク、メニュー、キーボード、320px〜Desktopを確認
- Console error 0件
- 画像にwidth/height、ヒーロー以外は遅延読込を検討
- `prefers-reduced-motion`を維持
- デモ表記を維持し、公開前に会社情報・実績・性能値を正式データへ置換

## 重要ファイル
- `index.html`: コンテンツとSEO
- `style.css`: デザイン・レスポンシブ・モーション
- `script.js`: メニューと軽量スクロール演出
- `assets/`: Web最適化済みメディア

## Chat persistence / knowledge routing

ユーザーから「このチャット内容をリポジトリに保存して」または同等の指示を受けた場合は、生の会話ログを保存せず、確定した重要情報だけをこのProjectの既存正本へ整理して反映する。

- 保存前にGitHubの現在のdefault branchを正として、`AGENTS.md`、`README.md`、`DESIGN.md`、`PROJECT_PLAN.md`、必要な関連文書、Issue / PR / Actionsを再確認する。
- サイトの目的、公開前に差し替える現行項目、利用・確認方法など利用者/AI向けの現在案内は `README.md` を更新する。
- ブランド、デザイン原則、デザイントークン、レイアウト、モーションなど長期的に維持する現行デザイン仕様は `DESIGN.md` を正本として更新する。
- 現在の実行計画・残作業・エージェント分担のProject計画は `PROJECT_PLAN.md` を更新し、完了済み項目を未完了として残さない。
- AI共通の恒久的な開発・品質・安全ルールは本 `AGENTS.md` を更新する。各AI固有の補足が必要な場合だけ既存の `CLAUDE.md` / `GEMINI.md` / `CODEX.md` / `COPILOT.md` の責務に従う。
- 長期的に重要な設計判断が既存の `DESIGN.md` 等では適切に保持できない場合のみ `DECISIONS.md`、再利用する独立した運用・復旧手順が必要な場合のみ `RUNBOOK.md`、未完了作業の追加引き継ぎが本当に必要な場合のみProject既定のファイルまたは `HANDOFF.md` を作成・更新する。形式だけの空ファイルは作らない。
- Issue / PR / Actions / Commitで復元できる差分、レビュー、テスト結果、進行履歴をチャット保存のためだけにMarkdownへ重複保存しない。
- README / DESIGN / PROJECT_PLANなど現在状態を表す文書はappend-onlyにせず、古い仕様や完了済みTODOが現行情報として残らないよう更新・整理する。
- デモ用の架空情報を、チャットから実在企業の確定情報として保存しない。会社情報、施工実績、性能値、保証、フォーム送信先等は正式データ確認前に事実化しない。
- APIキー、パスワード、Token、Secret、Webhook URL、認証情報などは保存対象から除外し、Issue / PR / Markdownへ転記しない。
- 保存後は、更新した正本と、履歴重複・未確認・機密性などの理由で保存しなかった情報を簡潔に報告する。

