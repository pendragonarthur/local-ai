import { Ollama } from "ollama";

const ollama = new Ollama({ host: process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434' })

export async function POST(request: Request) {
    try {
        const { message, model } = await request.json();

        const chatResponse = await ollama.chat({
            model: model,
            messages: [{ role: 'user', content: `Leia o prompt e responda em português brasileiro. PROMPT: ${message}` }]
        });

        return new Response(JSON.stringify({ message: chatResponse.message.content, model: chatResponse.model }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Ollama API error:", error);
        return new Response(JSON.stringify({ error: "Failed to get response from LLM" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}