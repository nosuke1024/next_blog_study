# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドラインを提供します。

## プロジェクト概要

Next.js、TypeScript、Tailwind CSS、App Routerを使用したブログサイトプロジェクトです。

## よく使うコマンド

- `npm run dev` - 開発サーバーを起動 (http://localhost:3000)
- `npm run build` - 本番環境用にビルド
- `npm run start` - 本番サーバーを起動
- `npm run lint` - ESLintを実行

## プロジェクト構造

```
next_blog_study/
├── src/
│   ├── app/           # App Routerのページとレイアウト
│   │   ├── layout.tsx # ルートレイアウト
│   │   ├── page.tsx   # ホームページ
│   │   └── globals.css # グローバルスタイル
│   ├── components/    # 再利用可能なコンポーネント（未作成）
│   ├── lib/          # ユーティリティ関数と共有コード（未作成）
│   └── styles/       # 追加スタイル（未作成）
├── public/           # 静的アセット（未作成）
├── package.json      # 依存関係とスクリプト
├── tsconfig.json     # TypeScript設定
├── tailwind.config.ts # Tailwind CSS設定
├── next.config.js    # Next.js設定
└── .eslintrc.json    # ESLint設定
```

## アーキテクチャ詳細

- **フレームワーク**: Next.js 14 (App Router使用)
- **言語**: TypeScript（strictモード有効）
- **スタイリング**: Tailwind CSS
- **フォント**: Google FontsのInter
- **リンター**: ESLint (Next.js設定)

## 開発ガイドライン

1. 新しいコンポーネントは `src/components/` にTypeScriptファイルとして作成
2. 新しいページはApp Router形式で作成（`src/app/` 内にフォルダを作成）
3. Tailwind CSSは設定済みですぐに使用可能
4. TypeScriptはstrictモードで型安全性を確保
5. インポートエイリアス設定済み: `@/*` で `src/*` からインポート可能

## 今後の実装予定

- ブログ記事の管理機能
- Markdownサポート
- SEO最適化
- ダークモード対応
- コンポーネントライブラリの構築