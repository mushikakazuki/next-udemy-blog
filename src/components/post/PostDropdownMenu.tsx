'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import DeletePostDialog from "./DeletePostDialog";


export default function PostDropdownMenu({postId}: {postId:string}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteDialogChange = (open: boolean) => {
    setShowDeleteDialog(open);
    if(!open) {
      setIsDropDownOpen(false) 
    }
  }
  
  return (
    <>
    <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
        <DropdownMenuTrigger className="px-2 py-1 border rounded-md">⋯</DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem asChild>
                <Link href={`/manage/posts/${postId}`} className="cursor-pointer">詳細</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href={`/manage/posts/${postId}/edit`} className="cursor-pointer">編集</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => {
              setIsDropDownOpen(false) 
              setShowDeleteDialog(true)}
            }>削除</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    { showDeleteDialog && (
      <DeletePostDialog isOpen={showDeleteDialog} postId={postId} onOpenChange={handleDeleteDialogChange}/>
    ) }
    </>
  )
}
