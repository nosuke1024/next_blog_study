"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { postSchema, type PostInput } from "@/lib/validations/post"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useCurrentUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isLoadingPost, setIsLoadingPost] = useState(true)

  const form = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  useEffect(() => {
    fetchPost()
  }, [params.id])

  async function fetchPost() {
    try {
      const response = await fetch(`/api/posts/${params.id}`)
      if (!response.ok) {
        throw new Error("記事の取得に失敗しました")
      }
      const data = await response.json()
      
      // 作者チェック
      if (data.author.id !== user?.id) {
        router.push(`/posts/${params.id}`)
        return
      }

      form.reset({
        title: data.title,
        content: data.content,
      })
    } catch (error) {
      console.error(error)
      router.push("/posts")
    } finally {
      setIsLoadingPost(false)
    }
  }

  async function onSubmit(data: PostInput) {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        setError(result.error || "更新に失敗しました")
        return
      }

      router.push(`/posts/${params.id}`)
    } catch (error) {
      setError("ネットワークエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingPost) {
    return <div className="container mx-auto px-4 py-8">読み込み中...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>記事を編集</CardTitle>
          <CardDescription>
            記事の内容を編集します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タイトル</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="記事のタイトルを入力"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>本文</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="記事の内容を入力"
                        className="min-h-[300px]"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "更新中..." : "更新"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/posts/${params.id}`)}
                  disabled={isLoading}
                >
                  キャンセル
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}