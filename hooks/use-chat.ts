"use client"

import { useState, useEffect } from "react"
import axios from "axios"

type Message = {
    role: string,
    content: string
}

const decoder = new TextDecoder()

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFirstInteraction, setIsFirstInteraction] = useState<boolean>(true)
    const [models, setModels] = useState<string[]>([])
    const [selectedModel, setSelectedModel] = useState("")


    useEffect(() => {
        async function fetchModels() {
            try {
                const response = await axios.get("/api/models")

                const modelNames = response.data.models.map((model: any) => model.name);

                setModels(modelNames);

                if (modelNames.length > 0) {
                    setSelectedModel(modelNames[0])
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchModels()
    }, [])


    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setIsFirstInteraction(false)
        setInput("")
        setIsLoading(true)

        let userMessage = input

        setMessages([...messages, {
            role: 'user', content: userMessage
        }, { role: 'assistant', content: '' }])

        try {
            const response = await fetch("/api/chat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage, model: selectedModel })
            })

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`)
            }

            const body = response.body

            if (!body) {
                throw new Error(`HTTP error status: ${response.status}`)
            }

            const reader = body.getReader()

            while (true) {
                setIsLoading(false)
                let { value: chunk, done: readerDone } = await reader.read()
                let text = decoder.decode(chunk, { stream: true })
                if (readerDone) {
                    break
                }

                setMessages((prev) => {

                    let updated = [...prev]
                    let lastIndex = updated.length - 1
                    const lastMessage = {
                        ...updated[lastIndex]
                    }
                    lastMessage.content += text
                    updated[lastIndex] = lastMessage

                    return updated
                })

            }
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = {
                role: "assistant",
                content: "Desculpe, encontrei um error enquanto processava sua requisição."
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage])
        } finally {
            setIsLoading(false)
        }


    }

    return { messages, input, setInput, isLoading, handleSubmit, isFirstInteraction, models, selectedModel, setSelectedModel }
}