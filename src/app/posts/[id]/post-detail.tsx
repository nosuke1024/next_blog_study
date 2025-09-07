"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCurrentUser } from "@/hooks/use-current-user"

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string | null
    email: string
  }
  likes: Array<{
    id: string
    user: {
      id: string
      name: string | null
    }
  }>
}

interface PostDetailProps {
  post: Post
}

export default function PostDetail({ post: initialPost }: PostDetailProps) {
  const router = useRouter()
  const { user } = useCurrentUser()
  const [post, setPost] = useState<Post>(initialPost)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  async function fetchPost() {
    try {
      const response = await fetch(`/api/posts/${post.id}`)
      if (!response.ok) {
        throw new Error("記事の取得に失敗しました")
      }
      const data = await response.json()
      setPost(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDelete() {
    if (!confirm("本当に削除しますか？")) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("削除に失敗しました")
      }

      router.push("/posts")
    } catch (error) {
      alert("削除に失敗しました")
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleLike() {
    if (!user) {
      router.push("/login")
      return
    }

    setIsLiking(true)
    const isLiked = post?.likes.some(like => like.user.id === user.id)

    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: isLiked ? "DELETE" : "POST",
      })

      if (!response.ok) {
        throw new Error("いいねの処理に失敗しました")
      }

      // 記事を再取得
      await fetchPost()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLiking(false)
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isAuthor = user?.id === post.author.id

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-3xl">{post.title}</CardTitle>
              <CardDescription className="mt-2">
                {post.author.name || post.author.email} • {formatDate(post.createdAt)}
                {post.updatedAt !== post.createdAt && (
                  <span className="ml-2 text-xs">
                    (編集済み: {formatDate(post.updatedAt)})
                  </span>
                )}
              </CardDescription>
            </div>
            {isAuthor && (
              <div className="flex gap-2">
                <Link href={`/posts/${post.id}/edit`}>
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "削除中..." : "削除"}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
          <div className="mt-8 flex items-center gap-4 border-t pt-4">
            <Button
              variant={post.likes.some(like => like.user.id === user?.id) ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              disabled={isLiking}
            >
              <span className="mr-2">❤️</span>
              <span>{post.likes.length} いいね</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mx-auto mt-8 max-w-4xl">
        <Link href="/posts">
          <Button variant="outline">記事一覧に戻る</Button>
        </Link>
      </div>
    </div>
  )
}