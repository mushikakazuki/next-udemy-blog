import { auth } from "@/auth";
import { getOwnPost } from "@/lib/ownPost";
import EditPostForm from "./EditPostForm";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{id: string}>
}

export default async function EditPage({params}:Params) {
    const session = await auth()
    const userId = session?.user?.id
  
    if(!session?.user?.email || !userId) {
      throw new Error('不正なリクエストです。');
    }

  const {id} = await params;
  const post = await getOwnPost(userId, id);

  if(!post) {
    notFound()
  }

  return (
    <EditPostForm post={post} />
  )
}
