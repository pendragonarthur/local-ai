"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
                <Button className="ml-2 cursor-pointer bg-muted hover:bg-secondary" type="button">
                    {selectedModel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                {models.map((model) => (
                    <DropdownMenuItem
                        onClick={() => handleModelSelect(model)}
                        key={model}
                    >
                        {model}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}