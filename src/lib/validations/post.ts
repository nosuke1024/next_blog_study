import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }).max(100, { message: "タイトルは100文字以内で入力してください" }),
  content: z.string().min(1, { message: "本文を入力してください" }).max(5000, { message: "本文は5000文字以内で入力してください" }),
})

export type PostInput = z.infer<typeof postSchema>