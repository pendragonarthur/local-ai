"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useChat } from "@/hooks/use-chat";
import { Plus } from "lucide-react";

export default function ModelsDropdown() {

    const { models, setSelectedModel, selectedModel } = useChat()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>

                <Button className="ml-2 cursor-pointer bg-muted hover:bg-secondary" type="button">
                    {selectedModel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                {models.map((model) => (
                    <option className="p-2 text-sm cursor-pointer hover:bg-secondary rounded-md" key={model} value={model}>{model}</option>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}