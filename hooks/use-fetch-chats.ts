import { useSidebar } from "@/components/ui/sidebar"
import { Chat } from "@/types/chat"
import { useState, useCallback } from "react"

export function useFetchChats() {
    const [chats, setChats] = useState<Chat[]>([])
    const [isHover, setIsHover] = useState<number | null>()
    const { state } = useSidebar()

    const fetchChats = useCallback(async () => {
        const response = await fetch("/api/chat/list")
        const data = await response.json()
        setChats([...data])
    }, [])

    return { fetchChats, chats, setChats, isHover, setIsHover, state }
} 