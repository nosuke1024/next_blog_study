# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドラインを提供します。

## プロジェクト概要

Next.js、TypeScript、Tailwind CSS、App Routerを使用したブログサイトプロジェクトです。

## よく使うコマンド

- `npm run dev` - 開発サーバーを起動 (http://localhost:3000)
- `npm run build` - 本番環境用にビルド
- `npm run start` - 本番サーバーを起動
- `npm run lint` - ESLintを実行
- `npx prisma migrate dev` - データベースマイグレーション実行
- `npx prisma studio` - Prisma Studioを起動（データベース管理UI）
- `npx prisma generate` - Prismaクライアントを生成

## プロジェクト構造

```
next_blog_study/
├── src/
│   ├── app/                    # App Routerのページとレイアウト
│   │   ├── (auth)/            # 認証関連ページ
│   │   │   ├── login/         # ログインページ
│   │   │   └── register/      # 登録ページ
│   │   ├── api/               # APIルート
│   │   │   ├── auth/          # NextAuth.js設定
│   │   │   └── register/      # 登録API
│   │   ├── layout.tsx         # ルートレイアウト
│   │   ├── page.tsx           # ホームページ
│   │   └── globals.css        # グローバルスタイル
│   ├── components/            # 再利用可能なコンポーネント
│   │   ├── layout/            # レイアウトコンポーネント
│   │   ├── providers/         # Contextプロバイダー
│   │   └── ui/                # UIコンポーネント（shadcn/ui）
│   ├── hooks/                 # カスタムフック
│   ├── lib/                   # ユーティリティ関数
│   │   ├── auth.ts           # NextAuth設定
│   │   ├── db.ts             # Prismaクライアント
│   │   ├── utils.ts          # ユーティリティ関数
│   │   └── validations/      # Zodスキーマ
│   ├── types/                 # 型定義
│   └── middleware.ts          # ミドルウェア
├── prisma/
│   └── schema.prisma          # Prismaスキーマ
├── public/                    # 静的アセット
├── package.json              # 依存関係とスクリプト
├── tsconfig.json             # TypeScript設定
├── tailwind.config.ts        # Tailwind CSS設定
├── next.config.js            # Next.js設定
├── components.json           # shadcn/ui設定
└── .eslintrc.json           # ESLint設定
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

## 実装済み機能

- **認証システム**: NextAuth.jsを使用したユーザー登録・ログイン
- **データベース**: PostgreSQL + Prisma ORM
- **UIコンポーネント**: shadcn/ui ベースのコンポーネント
- **バリデーション**: Zod + React Hook Form
- **スタイリング**: Tailwind CSS

## 実装予定機能

### Phase 3: ブログ機能
- ブログ投稿機能（新規作成）
- ブログ一覧ページ
- ブログ詳細ページ
- ブログ編集機能
- ブログ削除機能

### Phase 4: 追加機能
- 検索機能
- いいね機能
- ページネーション
- ソート機能（新着順、人気順）
- Markdownサポート
- 画像アップロード
- コメント機能（将来的に）

## データベースモデル

- **User**: ユーザー情報（id, email, password, name）
- **Post**: ブログ記事（id, title, content, authorId）
- **Like**: いいね情報（id, userId, postId）
