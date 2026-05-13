import { Ollama } from "ollama";

const ollama = new Ollama({
    host: process.env.OLLAMA_HOST ?? "https://127.0.0.1:11434"
})

export async function GET() {
    try {
        const response = await ollama.list();

        return Response.json({
            models: response.models
        })
    } catch (error) {
        return Response.json(
            { error: "Failed to fetch models" },
            { status: 500 })
    }
}