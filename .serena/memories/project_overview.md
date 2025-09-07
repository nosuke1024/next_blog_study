# プロジェクト概要

## プロジェクトの目的
Next.js 14 (App Router)、TypeScript、Tailwind CSS を使用したブログサイトプロジェクト。
ユーザー認証、ブログ投稿、いいね機能などのソーシャル要素を含むフルスタックWebアプリケーション。

## 技術スタック
- **フレームワーク**: Next.js 14 (App Router使用)
- **言語**: TypeScript（strictモード有効）
- **スタイリング**: Tailwind CSS + shadcn/ui コンポーネント
- **データベース**: PostgreSQL
- **ORM**: Prisma (クライアント生成先: src/generated/prisma)
- **認証**: NextAuth.js v5 (beta)
- **フォーム管理**: React Hook Form + Zod バリデーション
- **状態管理**: Zustand
- **テスト**: Jest + React Testing Library

## データベースモデル
- **User**: ユーザー情報（id, email, password, name）
- **Post**: ブログ記事（id, title, content, authorId）
- **Like**: いいね情報（id, userId, postId）

## 主な機能
- ユーザー認証（登録・ログイン）
- ブログ投稿機能（CRUD操作）
- いいね機能
- プロフィール機能

## 開発環境
- Node.js + npm
- Linux環境での開発