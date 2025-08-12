import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Next.js Blog
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          最新の技術トピックやプログラミングに関する記事を共有するブログプラットフォーム
        </p>
        <div className="flex gap-4">
          <Link href="/posts">
            <Button size="lg">
              記事を読む
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline">
              始める
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-24 grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-8">
          <svg
            className="h-12 w-12 text-primary"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <h3 className="text-xl font-bold">簡単に投稿</h3>
          <p className="text-center text-gray-500 dark:text-gray-400">
            マークダウン形式で簡単に記事を作成・編集できます
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-8">
          <svg
            className="h-12 w-12 text-primary"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <h3 className="text-xl font-bold">コミュニティ</h3>
          <p className="text-center text-gray-500 dark:text-gray-400">
            いいね機能で読者と繋がることができます
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-8">
          <svg
            className="h-12 w-12 text-primary"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <h3 className="text-xl font-bold">検索機能</h3>
          <p className="text-center text-gray-500 dark:text-gray-400">
            キーワードで記事を簡単に検索できます
          </p>
        </div>
      </div>
    </div>
  )
}