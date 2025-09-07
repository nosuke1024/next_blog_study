# プロジェクト構造詳細

## ルートディレクトリ
```
next_blog_study/
├── prisma/
│   └── schema.prisma          # Prismaスキーマ定義
├── src/                       # ソースコード
├── public/                    # 静的アセット
├── package.json              # 依存関係とスクリプト
├── tsconfig.json             # TypeScript設定
├── tailwind.config.ts        # Tailwind CSS設定
├── next.config.js            # Next.js設定
├── components.json           # shadcn/ui設定
├── jest.config.js            # Jest設定
├── jest.setup.js             # Jestセットアップ
├── postcss.config.js         # PostCSS設定
├── .eslintrc.json           # ESLint設定
├── .env                      # 環境変数
├── CLAUDE.md                # Claude AI用ガイドライン
└── README.md                # プロジェクト説明
```

## src/ディレクトリ詳細

### app/ (App Router)
- `(auth)/` - 認証関連ページ（ログイン、登録）
- `api/` - APIエンドポイント
  - `auth/` - NextAuth.js設定
  - `register/` - ユーザー登録API
- `posts/` - ブログ投稿関連ページ
- `profile/` - プロフィールページ
- `layout.tsx` - ルートレイアウト
- `page.tsx` - ホームページ
- `globals.css` - グローバルスタイル

### components/
- `layout/` - Header、Footer等のレイアウトコンポーネント
- `providers/` - SessionProvider等のコンテキストプロバイダー
- `ui/` - shadcn/uiベースの再利用可能UIコンポーネント

### lib/
- `auth.ts` - NextAuth設定
- `db.ts` - Prismaクライアントインスタンス
- `utils.ts` - ユーティリティ関数
- `validations/` - Zodバリデーションスキーマ

### その他
- `hooks/` - カスタムReactフック
- `types/` - TypeScript型定義
- `styles/` - 追加スタイルファイル
- `generated/` - Prismaクライアント生成先
- `middleware.ts` - Next.jsミドルウェア

## 重要なファイルパス
- Prismaクライアント: `src/generated/prisma`
- 認証設定: `src/lib/auth.ts`
- データベース接続: `src/lib/db.ts`
- バリデーション: `src/lib/validations/`