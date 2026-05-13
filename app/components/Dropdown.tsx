import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus } from "lucide-react"

export function Dropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="ml-2 cursor-pointer bg-transparent hover:bg-muted" type="button">
                    <Plus className="text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuItem>Inserir arquivos</DropdownMenuItem>
                <DropdownMenuItem>Criar imagem</DropdownMenuItem>
                <DropdownMenuItem>Pesquisar na web</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
