"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useChat } from "@/hooks/use-chat";

interface ModelsDropdownProps {
    selectedModel: string,
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>
}

export default function ModelsDropdown({ selectedModel, setSelectedModel }: ModelsDropdownProps) {

    const { models } = useChat()

    const handleModelSelect = (model: string) => {
        setSelectedModel(model)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="ml-2 bg-muted hover:bg-secondary cursor-pointer" type="button" disabled={!selectedModel} suppressHydrationWarning>
                    {selectedModel
                        ? selectedModel
                        : <Skeleton className="h-4 w-22" />
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                {models.map((model) => (
                    <DropdownMenuItem onClick={() => handleModelSelect(model)} key={model}>
                        {model}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}