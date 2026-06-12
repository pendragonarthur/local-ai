"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import ChatEllipsisContent from "@/app/components/ChatEllipsisContent";

import { useFetchChats } from "@/hooks/use-fetch-chats";
import { SquarePen } from "lucide-react";


export function AppSidebar() {
    const { fetchChats, chats, isHover, setIsHover, state } = useFetchChats();
    const [openChatEllipsis, setOpenChatEllipsis] = useState<number | null>()

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
            <SidebarHeader className={`border-b border-sidebar-border flex-row items-center justify-between`}>
                <h1 className={`${state === "collapsed" ? "hidden" : ""} px-2 text-md`}>Clover</h1>
                <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer" />
            </SidebarHeader>
            <SidebarContent className="px-2 py-4">
                <SidebarGroupContent className="w-full">
                    <Button className="text-sidebar-foreground w-full justify-start hover:bg-sidebar-accent rounded-md bg-transparent"><SquarePen /> <span className={`${state === "collapsed" ? "hidden" : ""}`}> Novo Chat</span></Button>
                </SidebarGroupContent>
                <SidebarGroupLabel className="text-zinc-500 flex items-center justify-start"> Recentes
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <div className={`flex flex-col gap-1 ${state === "collapsed" ? "hidden" : ""}`}>
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                className={cn("justify-start items-center px-2 flex py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 cursor-pointer")}
                                onMouseEnter={() => setIsHover(chat.id)}
                                onMouseLeave={() => {
                                    if (openChatEllipsis !== chat.id) setIsHover(null)
                                }}
                            >
                                <p className="truncate flex-1 text-left">{chat.title}</p>
                                {isHover === chat.id && (
                                    <ChatEllipsisContent
                                        open={openChatEllipsis === chat.id}
                                        onOpenChange={(open: any) => setOpenChatEllipsis(open ? chat.id : null)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </SidebarGroupContent>
            </SidebarContent>

        </Sidebar>
    );
}