'use server'
import { postSchema } from "../validations/post"
import { saveImage } from "@/utils/images"
import { prisma } from "../prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}

export async function createPost(prvActions: ActionState,formData: FormData):Promise< ActionState> {
    // データ取得
    const title = formData.get('title') as string;
    const fileImageInput = formData.get('topImage');
    const content = formData.get('content') as string;

    const topImage = fileImageInput instanceof File ? fileImageInput : null

    // バリデーション
    const validateResult = postSchema.safeParse({title, content, topImage});
    if(!validateResult.success) {
        return { success: false, errors: validateResult.error.flatten().fieldErrors }
    }

    // 画像保存
    const imageUrl = topImage ? await saveImage(topImage) : null;
    if(topImage && !imageUrl) {
        return { success: false, errors: {image: ["画像が正しく保存されませんでした。"]} }
    }
    // DB保存
    const session = await auth()
    const userId = session?.user?.id
  
    if(!session?.user?.email || !userId) {
      throw new Error('不正なリクエストです。');
    }

    await prisma.post.create({
        data: {
            title,
            content,
            topImage: imageUrl,
            published: true,
            authorId: userId
        }
    })

    redirect('/dashboard')
}