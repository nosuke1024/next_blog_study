"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Button } from "@/components/ui/button"

export function Header() {
  const router = useRouter()
  const { user, isLoading } = useCurrentUser()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
    router.refresh()
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Next.js Blog
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link href="/posts" className="text-sm hover:underline">
            記事一覧
          </Link>
          
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link href="/posts/new" className="text-sm hover:underline">
                    新規投稿
                  </Link>
                  <Link href="/profile" className="text-sm hover:underline">
                    プロフィール
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                  >
                    ログアウト
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      ログイン
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">
                      新規登録
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}