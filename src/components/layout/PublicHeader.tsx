import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SearchBox from "../post/SearchBox"

export default function PublicHeader() {
  return (
    <header className="border-b bg-blue-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <NavigationMenu>
                <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/" className="font-bold text-xl">
                            Blog
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4">
                <SearchBox></SearchBox>
                <Button variant="outline" asChild>
                    <Link href="/login">ログイン</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">登録</Link>
                </Button>
            </div>
        </div>
    </header>
  )
}
