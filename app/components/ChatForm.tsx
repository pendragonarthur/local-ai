import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Send } from "lucide-react";
import React from "react";
import { Dropdown } from "./Dropdown";

interface ChatFormProps {
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
}

export default function ChatForm({ input, setInput, handleSubmit }: ChatFormProps) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <FieldSet>
                    <InputGroup className="h-full p-2">
                        <Dropdown />
                        <InputGroupInput placeholder="Digite sua mensagem..." value={input} onChange={(e) => setInput(e.target.value)} />
                        <Button className="cursor-pointer bg-secondary" type="submit"><Send className="text-muted-foreground" /></Button>
                    </InputGroup>
                </FieldSet>
            </div>
        </form>
    )
}