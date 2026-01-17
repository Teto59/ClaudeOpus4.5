# CLAUDE.md

このファイルはClaude Codeがこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

**JobTracker** - 就活管理用Webアプリケーション（SPA/PWA）

企業の応募状況、選考ステータス、面接日程、メモなどを一元管理できるアプリケーション。すべてのデータはブラウザのローカルストレージに保存され、外部送信されない。

## 技術スタック

- **フレームワーク**: React 19.2.0
- **ビルドツール**: Vite 7.2.4
- **言語**: JavaScript (JSX)
- **モジュール形式**: ESM (ES Modules)
- **Linter**: ESLint 9.x (フラット設定)
- **ホスティング**: GitHub Pages

## ディレクトリ構造

```
src/
├── components/          # UIコンポーネント
│   ├── Home.jsx        # 企業一覧画面
│   ├── CompanyDetail.jsx # 企業詳細・編集画面
│   └── Notes.jsx       # メモ帳画面
├── hooks/              # カスタムフック
│   └── useLocalStorage.js # ローカルストレージ永続化
├── App.jsx             # ルートコンポーネント・ページ遷移管理
├── main.jsx            # エントリーポイント
└── *.css               # スタイルシート
```

## 開発コマンド

```bash
npm install          # 依存関係インストール
npm run dev          # 開発サーバー起動 (ホットリロード)
npm run build        # 本番ビルド (dist/へ出力)
npm run lint         # ESLint静的解析
npm run preview      # ビルド成果物プレビュー
```

## デプロイ

- mainブランチへのpushでGitHub Actionsが自動デプロイを実行
- ビルド成果物はGitHub Pagesにデプロイされる
- base pathは `/ClaudeOpus4.5/` に設定済み

## コーディング規約

- React Hooksルールに従う（eslint-plugin-react-hooks）
- コンポーネントは関数コンポーネントで記述
- 状態管理はuseStateとカスタムフック（useLocalStorage）を使用
- CSSはコンポーネントごとに分離（Component.css）

## アーキテクチャ

- **状態管理**: App.jsxでグローバル状態を管理し、propsで子コンポーネントに渡す
- **永続化**: useLocalStorageフックでローカルストレージに自動保存
- **ページ遷移**: currentPage状態による条件付きレンダリング（ルーターなし）

## Frontend aesthetics rules

- @.claude/rules/frontend-aesthetics.md
