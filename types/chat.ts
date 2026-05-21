export type Chat = {
    id: number,
    title: string,
    model: string,
    createdAt: Date,
    updatedAt: Date,
    messages: Message[]
}

export type Message = {
    id: number,
    chatId: number,
    role: 'assistant' | 'user' | 'system',
    content: string,
    createdAt: Date
}