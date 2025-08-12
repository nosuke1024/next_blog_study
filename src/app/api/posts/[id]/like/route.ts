import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      )
    }

    // 既存のいいねをチェック
    const existingLike = await db.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: params.id,
        },
      },
    })

    if (existingLike) {
      return NextResponse.json(
        { error: "既にいいねしています" },
        { status: 400 }
      )
    }

    // いいねを作成
    const like = await db.like.create({
      data: {
        userId: session.user.id,
        postId: params.id,
      },
    })

    return NextResponse.json(like, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "いいねの追加に失敗しました" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      )
    }

    // いいねを削除
    await db.like.delete({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: params.id,
        },
      },
    })

    return NextResponse.json({ message: "いいねを削除しました" })
  } catch (error) {
    return NextResponse.json(
      { error: "いいねの削除に失敗しました" },
      { status: 500 }
    )
  }
}