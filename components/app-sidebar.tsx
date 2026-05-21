"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {

    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className={`border-b border-sidebar-border ${state === "expanded" ? "items-end" : "items-center justify-center"}`} >
                <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer" />
            </SidebarHeader>
            <SidebarContent>
            </SidebarContent>
        </Sidebar>
    );
}