# 開発用コマンド集

## 基本コマンド
- `npm run dev` - 開発サーバーを起動 (http://localhost:3000)
- `npm run build` - 本番環境用にビルド
- `npm run start` - 本番サーバーを起動
- `npm run lint` - ESLintを実行してコード品質チェック

## テストコマンド
- `npm test` - テストを実行
- `npm run test:watch` - ウォッチモードでテストを実行
- `npm run test:coverage` - カバレッジレポート付きでテストを実行

## Prisma関連コマンド
- `npx prisma migrate dev` - データベースマイグレーション実行
- `npx prisma studio` - Prisma Studio起動（データベース管理UI）
- `npx prisma generate` - Prismaクライアントを生成（src/generated/prismaに出力）
- `npx prisma db push` - スキーマ変更をデータベースに反映（マイグレーションなし）
- `npx prisma db seed` - シードデータを投入

## タスク完了時に実行すべきコマンド
1. `npm run lint` - コード品質チェック
2. `npm test` - テスト実行（テストファイルがある場合）
3. `npm run build` - ビルドエラーがないか確認

## システムコマンド (Linux)
- `ls` - ファイル一覧表示
- `cd` - ディレクトリ移動
- `grep` - ファイル内検索
- `find` - ファイル検索
- `git` - バージョン管理