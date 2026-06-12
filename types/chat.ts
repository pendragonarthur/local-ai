export type MessageRole = 'assistant' | 'user' | 'system'

export type Chat = {
    id: number,
    title: string,
    model: string,
    createdAt: Date,
    updatedAt: Date,
    messages: DBMessage[]
}

export type DBMessage = {
    id: number,
    chatId: number,
    role: MessageRole
    content: string,
    createdAt: Date
}

export type UIMessage = {
    role: MessageRole,
    content: string
}