import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {

        const { model, firstMessage } = await request.json()

        const title = firstMessage.slice(0, 30)

        const chat = await prisma.chat.create({
            data: {
                model, title
            }
        })

        return Response.json({
            chatId: chat.id
        })


    } catch (error) {
        console.log(error)
        return Response.json({ error: "Erro ao criar chat" }, { status: 500 })
    }
}