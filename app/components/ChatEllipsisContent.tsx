import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { EllipsisVertical, Pencil, Pin, Trash } from "lucide-react";


const ellipsisItens = [
    {
        id: 1,
        text: "Renomear",
        textColor: "",
        bgColor: "bg-zinc-800",
        icon: <Pencil />,
        // onClick: ()=> void
    },
    {
        id: 2,
        text: "Fixar chat",
        textColor: "",
        bgColor: "bg-zinc-800",
        icon: <Pin />,
        // onClick: ()=> void
    },
    {
        id: 3,
        text: "Deletar chat",
        textColor: "text-red-500",
        bgColor: "bg-red-800/20",
        icon: <Trash color="red" />,
        // onClick: ()=> void
    },

]

interface ChatEllipsisContentProps {
    open: boolean,
    onOpenChange: (open: any) => void;
}

export default function ChatEllipsisContent({ open, onOpenChange }: ChatEllipsisContentProps) {
    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
                <span onClick={(e) => e.stopPropagation()}>
                    <EllipsisVertical className="size-4 cursor-pointer" />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                {ellipsisItens.map((i) => {
                    return (
                        <DropdownMenuItem className={cn(`hover:${i.bgColor} ${i.textColor}`, "cursor-pointer")} key={i.id}>
                            {i.icon} {i.text}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}