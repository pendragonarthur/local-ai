import { Ollama } from "ollama";
export const runtime = 'nodejs'

const ollama = new Ollama({ host: process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434' })

export async function POST(request: Request) {
    try {
        const { message, model } = await request.json();
        console.log({ message, model })

        const encoder = new TextEncoder()

        const stream = new ReadableStream({

            async start(controller) {
                try {
                    const response = await ollama.chat({
                        model: model,
                        messages: [{ role: 'user', content: `Leia o prompt e responda em português brasileiro. PROMPT: ${message}` }],
                        stream: true
                    })

                    for await (const chunk of response) {
                        let content = chunk.message.content
                        if (content) {
                            const encondedChunk = encoder.encode(content)
                            controller.enqueue(encondedChunk)
                        }
                    }
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