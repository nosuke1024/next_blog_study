import { Metadata } from "next"
import { notFound } from "next/navigation"
import PostDetail from "./post-detail"

// 記事データを取得する関数（メモ化される）
async function getPost(id: string) {
  console.log(`[Request Memoization] Fetching post ${id} - このログが1回だけ表示されれば、メモ化が機能しています`)
  
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/posts/${id}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    return response.json()
  } catch (error) {
    console.error('Failed to fetch post:', error)
    return null
  }
}

// メタデータ生成関数
// この関数とページコンポーネントで同じgetPost()を呼んでも、
// Next.jsのRequest Memoizationにより、実際のAPIコールは1回だけ行われます
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const post = await getPost(params.id)
  
  if (!post) {
    return {
      title: '記事が見つかりません',
    }
  }
  
  return {
    title: post.title,
    description: post.content.substring(0, 160) + '...',
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160) + '...',
      type: 'article',
      authors: [post.author.name || post.author.email],
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
    },
  }
}

// ページコンポーネント
// generateMetadataと同じgetPost()を呼んでいるが、
// Request Memoizationにより実際のAPIコールは1回だけ
export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  
  if (!post) {
    notFound()
  }
  
  // クライアントコンポーネントに記事データを渡す
  return <PostDetail post={post} />
}