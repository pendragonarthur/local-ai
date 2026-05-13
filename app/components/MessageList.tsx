type Message = {
    role: string,
    content: string
}

interface MessageListProps {
    messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
    return (
        <div className="space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex relative ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`border-1 rounded-md p-2 ${message.role === 'user' ? "bg-secondary" : "bg-popover"}`}>
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    )
}