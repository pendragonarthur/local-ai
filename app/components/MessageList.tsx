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
                    <div className={`${message.role === 'user' ? "px-4 py-2 rounded-sm border-1" : "px-4 py-2 rounded-sm bg-none"}`}>
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    )
}