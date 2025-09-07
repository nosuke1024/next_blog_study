"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-red-600">エラーが発生しました</h2>
        <p className="text-gray-600 text-center max-w-md">
          申し訳ございません。記事の読み込み中にエラーが発生しました。
        </p>
        <div className="flex gap-4">
          <Button
            onClick={reset}
            variant="default"
          >
            もう一度試す
          </Button>
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
          >
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}