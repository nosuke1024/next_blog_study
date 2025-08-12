"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCurrentUser } from "@/hooks/use-current-user"

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string | null
    email: string
  }
  likes: Array<{
    id: string
    userId: string
  }>
}

interface PostsResponse {
  posts: Post[]
  total: number
  page: number
  totalPages: number
}

export default function PostsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useCurrentUser()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1"))
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchPosts()
  }, [searchParams])

  async function fetchPosts() {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      })
      if (searchQuery) {
        params.append("search", searchQuery)
      }

      const response = await fetch(`/api/posts?${params}`)
      
      if (!response.ok) {
        console.error("記事の取得に失敗しました")
        setPosts([])
        setTotalPages(1)
        return
      }
      
      const data: PostsResponse = await response.json()
      
      setPosts(data.posts || [])
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error("記事の取得に失敗しました:", error)
      setPosts([])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set("page", "1")
    if (searchQuery) {
      params.set("search", searchQuery)
    }
    router.push(`/posts?${params.toString()}`)
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">記事一覧</h1>
        {user && (
          <Link href="/posts/new">
            <Button>新規投稿</Button>
          </Link>
        )}
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button type="submit">検索</Button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-8">読み込み中...</div>
      ) : !posts || posts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          記事がありません
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>
                  <Link 
                    href={`/posts/${post.id}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {post.author.name || post.author.email} • {formatDate(post.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>❤️ {post.likes.length}</span>
                </div>
                <Link href={`/posts/${post.id}`}>
                  <Button variant="outline" size="sm">
                    続きを読む
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const params = new URLSearchParams(searchParams)
              params.set("page", (currentPage - 1).toString())
              router.push(`/posts?${params.toString()}`)
            }}
            disabled={currentPage === 1}
          >
            前のページ
          </Button>
          <span className="flex items-center px-4">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => {
              const params = new URLSearchParams(searchParams)
              params.set("page", (currentPage + 1).toString())
              router.push(`/posts?${params.toString()}`)
            }}
            disabled={currentPage === totalPages}
          >
            次のページ
          </Button>
        </div>
      )}
    </div>
  )
}