import PostCard from "@/components/post/PostCard"
import { getPosts, searchPost } from "@/lib/post"
import { Post } from "@/types/post"

type SearchParms = {
  search? :string 
}

export default async function PostPage({searchParams}: {searchParams:Promise<SearchParms>}) {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.search || ''
  
  console.log(query);

  const posts = query ?
    await searchPost(query) as Post[]
    :await getPosts() as Post[]
  return (
    <>
    <div className=" container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post}/>
        ))}
      </div>
    </div>
    </>
  )
}
