import { Ollama } from "ollama";
export const runtime = 'nodejs'
import prisma from "@/lib/prisma";

const ollama = new Ollama({ host: process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434' })

export async function POST(request: Request) {
    try {
        const { message, model, chatId } = await request.json();
        const encoder = new TextEncoder()
        let assistantContent = '';

        async function createUserMessage() {
            await prisma.message.create({
                data: {
                    chatId,
                    role: 'user',
                    content: message
                }
            })
        }

        await createUserMessage()

        const previousMessages = await prisma.message.findMany({
            where: {
                chatId
            }, orderBy: {
                createdAt: 'asc'
            }
        })

        const formattedMessages = previousMessages.map((message) => ({ role: message.role, content: message.content }))

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const response = await ollama.chat({
                        model: model,
                        messages: formattedMessages,
                        stream: true
                    })
                    for await (const chunk of response) {
                        const content = chunk.message.content
                        if (content) {
                            const encodedChunk = encoder.encode(content)
                            controller.enqueue(encodedChunk)
                            assistantContent += content
                        }
                    }

                    await prisma.message.create({
                        data: {
                            chatId,
                            role: 'assistant',
                            content: assistantContent
                        }
                    })

                    controller.close()
                } catch (error) {
                    console.log(error, 'Erro no streaming da LLM')
                    controller.error(error)
                }
            }
        })

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Content-Type-Options': 'nosniff',
                'Cache-Control': 'no-cache',
            },
        })
    } catch (error) {
        console.error("Ollama API error:", error);
        return new Response(JSON.stringify({ error: "Failed to get response from LLM" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}