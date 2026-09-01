# RSS7 HOUSE — 4エージェント実行指示

## Claude Code / 主実装
`AGENTS.md`を最上位ルールとして読み、現状コードを監査。デザイン統合、フォーム本接続、詳細ページ追加、レスポンシブ調整を担当。1タスク1ブランチ、PR経由で統合する。

## Google Jules / 定型作業
リンク・alt・meta・構造化データ・画像参照・表記揺れ・複数ページ共通部品を確認。大量で低リスクな修正だけを担当し、デザイン刷新や性能値の創作はしない。

## OpenAI Codex / 独立技術監査
Progressive Enhancement、アクセシビリティ、JavaScript、Core Web Vitals、セキュリティ、エッジケースを独立監査。重大度と再現手順を添えてPRレビューする。

## GitHub Copilot / 常設PRレビュー
差分だけでなく変更意図との一致を確認。意図しない削除、重複、到達不能リンク、HTML/CSS/JSエラー、秘密情報、GitHub Pages互換性を指摘する。

## 共通タスク順
1. 現サイト監査
2. デモ表示と架空情報の明示確認
3. Mobile 320/375/430px、Desktop 1440px QA
4. Console・リンク・フォーム・キーボードテスト
5. Lighthouse / Core Web Vitals改善
6. PRレビュー、修正、再テスト
7. mainへmerge、GitHub Pages公開確認

## 現時点の残作業
- GitHub上で専用リポジトリを作成
- 正式URL確定後にcanonical・OG URL・sitemapを設定
- 実会社化する場合のみ会社情報・許認可・正式性能値・施工実績へ差し替え
- フォーム送信先とプライバシーポリシーを正式接続
