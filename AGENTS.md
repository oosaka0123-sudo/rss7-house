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

