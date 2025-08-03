'use server'
import { postSchema } from "../validations/post"
import { saveImage } from "@/utils/images"
import { prisma } from "../prisma"
import { redirect } from "next/navigation"

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}

export async function updatePost(prvActions: ActionState,formData: FormData):Promise< ActionState> {
    // データ取得
    const title = formData.get('title') as string;
    const fileImageInput = formData.get('topImage');
    const content = formData.get('content') as string;

    const topImage = fileImageInput instanceof File ? fileImageInput : null
    const postId = formData.get('postId') as string;
    const oldImageUrl = formData.get('oldImageUrl') as string;
    const published = formData.get('published') === 'true'

    console.log(fileImageInput);

    // バリデーション
    const validateResult = postSchema.safeParse({title, content, topImage});
    if(!validateResult.success) {
        return { success: false, errors: validateResult.error.flatten().fieldErrors }
    }

    // 画像保存
    let imageUrl = oldImageUrl
    if(topImage && topImage.size > 0 && topImage.name !== 'undefined') {
        const newImageUrl = await saveImage(topImage)
        if(!newImageUrl) {
            return { success: false, errors: {image: ["画像が正しく保存されませんでした。"]} }
        }
        imageUrl = newImageUrl
    }

    // DB保存
    await prisma.post.update({
        where: { id: postId },
        data: {
            title,
            content,
            topImage: imageUrl,
            published
        }
    })

    redirect('/dashboard')
}