import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const chats = await prisma.chat.findMany({
            select: {
                id: true,
                title: true,
                updatedAt: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return Response.json(chats)

    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Erro ao buscar chats' }, { status: 500 })
    }
}