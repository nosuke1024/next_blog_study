# コードスタイルと規約

## TypeScript設定
- strictモード有効
- エイリアス設定: `@/*` で `src/*` からインポート可能

## 命名規則
- **コンポーネント**: PascalCase (例: `Button.tsx`, `NavBar.tsx`)
- **関数・変数**: camelCase
- **定数**: UPPER_SNAKE_CASE または camelCase
- **型・インターフェース**: PascalCase
- **ファイル名**: 
  - コンポーネント: PascalCase または kebab-case
  - その他: kebab-case

## ディレクトリ構造
```
src/
├── app/                    # App Router (ページとAPI)
│   ├── (auth)/            # 認証関連ページ（グループ化）
│   ├── api/               # APIルート
│   └── posts/             # ブログ関連ページ
├── components/            # 再利用可能なコンポーネント
│   ├── layout/            # レイアウト関連
│   ├── providers/         # Contextプロバイダー
│   └── ui/                # UIコンポーネント（shadcn/ui）
├── hooks/                 # カスタムフック
├── lib/                   # ユーティリティ関数とライブラリ設定
│   └── validations/       # Zodスキーマ
├── types/                 # 型定義
└── generated/            # 自動生成ファイル（Prisma）
```

## コンポーネント規約
- 関数コンポーネントのみ使用
- forwardRefパターン使用（UIコンポーネント）
- PropsはTypeScriptの型定義を使用
- shadcn/uiコンポーネントスタイルに準拠

## インポート順序
1. React関連
2. Next.js関連
3. 外部ライブラリ
4. 内部モジュール（@/で始まる）
5. 相対パス

## テスト
- テストファイルは同じディレクトリに `.test.ts` または `.test.tsx` で配置
- Jest + React Testing Library使用