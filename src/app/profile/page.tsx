"use client"

import { useEffect, useState } from "react"
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

interface UserPost {
  id: string
  title: string
  content: string
  createdAt: string
  likes: Array<{ id: string }>
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading: userLoading } = useCurrentUser()
  const [posts, setPosts] = useState<UserPost[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
  })

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login")
      return
    }
    
    if (user) {
      fetchUserPosts()
    }
  }, [user, userLoading, router])

  async function fetchUserPosts() {
    try {
      const response = await fetch(`/api/posts?limit=100`)
      if (!response.ok) {
        throw new Error("記事の取得に失敗しました")
      }
      
      const data = await response.json()
      const userPosts = data.posts.filter((post: any) => post.author.id === user?.id)
      
      setPosts(userPosts)
      
      // 統計情報を計算
      const totalLikes = userPosts.reduce((sum: number, post: UserPost) => sum + post.likes.length, 0)
      setStats({
        totalPosts: userPosts.length,
        totalLikes,
      })
    } catch (error) {
      console.error("記事の取得に失敗しました:", error)
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (userLoading || loading) {
    return <div className="container mx-auto px-4 py-8">読み込み中...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">プロフィール</h1>
        <p className="text-muted-foreground">あなたの投稿と統計情報</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">ユーザー情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-semibold">{user.name || "名前未設定"}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">投稿数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalPosts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">獲得いいね数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalLikes}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">あなたの投稿</h2>
        {posts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">まだ投稿がありません</p>
              <Link href="/posts/new">
                <Button>最初の投稿を作成</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link 
                      href={`/posts/${post.id}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {formatDate(post.createdAt)} • ❤️ {post.likes.length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}