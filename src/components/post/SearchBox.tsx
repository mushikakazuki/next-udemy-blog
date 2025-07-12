'use client'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { useState, useEffect } from 'react'

export default function SearchBox() {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)
        return () => clearTimeout(timer);
    }, [search])

    useEffect(() => {
        if(debouncedSearch.trim()) {
            router.push(`/?search=${debouncedSearch.trim()}`)
        }
        else {
            router.push('/')
        }
    }, [debouncedSearch, router])
  return (
    <>
        <Input
        type="text"
        placeholder="検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[300px] bg-white"
        />
    </>
  )
}
