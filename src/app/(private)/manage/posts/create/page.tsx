'use client'
import { useState, useActionState } from "react";
import { createPost } from "@/lib/actions/createPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function CreatePage() {
    const [state, formAction] = useActionState(createPost, {
        success: false, errors: {}
    })

    const [contentLength, setContentLength] = useState(0);
    const [content, setContent] = useState("");
    const [preview, setPreview] = useState(false);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
         const value = e.target.value;
         setContent(value);
         setContentLength(value.length);
    }

  return (
    <div className=" container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">新規記事投稿（マークダウン対応）</h1>
        <form className="space-y-4" action={formAction}>
            <div>
                <Label htmlFor="title">タイトル</Label>
                <Input type="text" id="title" name="title" placeholder="タイトルを入力してください" />
                {state.errors.title && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.title.join(',')}</p>
                )}
                <div>
                    <Label htmlFor="topImage">トップ画像</Label>
                    <Input
                    type="file"
                    id="topImage"
                    accept="image/*"
                    name="topImage"
                    />
                    {state.errors.topImage && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.topImage.join(',')}</p>
                    )}
                </div>
            </div>
            <div>
                <Label htmlFor="title">内容（マークダウン）</Label>
                <TextareaAutosize id="content" name="content" className="w-full border p-2" placeholder="マークダウン形式で入力" minRows={8} value={content} onChange={handleContentChange}/>
            </div>
            {state.errors.content && (
                <p className="text-red-500 text-sm mt-1">{state.errors.content.join(',')}</p>
            )}
            <div className="text-right text-sm text-gray-500 mt-1">
                文字数：{contentLength}
            </div>
            <div>
                <Button type="button" onClick={() => setPreview(!preview)}>{ preview ? "プレビュー終了" : "プレビュー" }</Button>
            </div>
            {preview && (
                <div className="border p-4 bg-gray-50 prose max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        skipHtml={false} // HTMLスキップを無効化
                        unwrapDisallowed={true} // Markdownの改行を解釈
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            )}
            <Button type="submit" className=" bg-blue-500 text-white px-4 py-2">送信</Button>
        </form>
    </div>
  )
}
