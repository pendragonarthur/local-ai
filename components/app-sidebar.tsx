"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { useSidebar } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";

type Chat = {
    id: number,
    title: string,
    updatedAt: string
}

export function AppSidebar() {
    const [chats, setChats] = useState<Chat[]>([])
    const { state } = useSidebar()

    async function fetchChats() {
        const response = await fetch("/api/chat/list")
        const data = await response.json()

        console.log("FETCH CHATS")
        console.log(data)

        setChats([...data])
    }

    useEffect(() => {
        function handleChatCreated() {
            console.log("EVENTO RECEBIDO")
            fetchChats()
        }

        window.addEventListener("chat-created", handleChatCreated)

        return () => {
            window.removeEventListener("chat-created", handleChatCreated)
        }
    }, [fetchChats])

    console.log("RENDER SIDEBAR")
    console.log(chats)

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className={`border-b border-sidebar-border ${state === "expanded" ? "items-end" : "items-center justify-center"}`} >
                <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer" />
            </SidebarHeader>
            <SidebarContent>
                {chats.map((chat) => (
                    <p key={chat.id}>{chat.title}</p>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}