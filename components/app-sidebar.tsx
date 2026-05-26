"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarSeparator,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { useSidebar } from "@/components/ui/sidebar";
import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";

type Chat = {
    id: number,
    title: string,
    updatedAt: string
}

export function AppSidebar() {
    const [chats, setChats] = useState<Chat[]>([])
    const [isHover, setIsHover] = useState<number | null>()
    const { state } = useSidebar()

    const fetchChats = useCallback(async () => {
        const response = await fetch("/api/chat/list")
        const data = await response.json()
        setChats([...data])
    }, [])

    useEffect(() => {
        fetchChats()
        function handleChatCreated() {
            fetchChats()
        }

        window.addEventListener("chat-created", handleChatCreated)

        return () => {
            window.removeEventListener("chat-created", handleChatCreated)
        }
    }, [fetchChats])

    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader className={`border-b border-sidebar-border ${state === "expanded" ? "items-end" : "items-center justify-center"}`} >
                <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer" />
            </SidebarHeader>

            <SidebarGroupContent className="flex flex-col items-start gap-2 px-3 py-2 ">
                <Button className="text-sidebar-foreground cursor-pointer hover:bg-sidebar-accent rounded-xl bg-transparent border-1 border-sidebar-border">Novo Chat</Button>
            </SidebarGroupContent>
            <SidebarGroupLabel className="text-sidebar-foreground flex justify-center">Histórico</SidebarGroupLabel>
            <SidebarContent className="px-2 py-3">
                <div className="flex flex-col gap-1">
                    {chats.map((chat) => (
                        <Button
                            key={chat.id}
                            className={cn("justify-start items-center px-3 py-2 rounded-xl text-sm bg-transparent text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 border-1 border-sidebar-border hover:bg-sidebar-accent cursor-pointer")}
                            onMouseEnter={() => setIsHover(chat.id)} onMouseLeave={() => setIsHover(null)}
                        >
                            <span className="truncate flex-1 text-left">{chat.title}</span>
                            {isHover === chat.id && <Ellipsis className="ml-auto shrink-0 size-4 cursor-pointer" />}
                        </Button>
                    ))}
                </div>
            </SidebarContent>
        </Sidebar>
    );
}