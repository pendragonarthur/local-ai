"use client"

import { useState, useEffect } from "react"
import axios from "axios"

type Message = {
    role: string,
    content: string
}

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
        const currentInput = input

        const userMessage = { role: "user", content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setInput("")
        setIsLoading(true)

        try {
            const response = await axios.post("/api/chat", {
                message: currentInput,
                model: selectedModel
            })

            if (!response) {
                throw new Error("Failed to get response")
            }

            const aiMessage = {
                role: "assistant",
                content: response.data.message,
            };
            setMessages((prevMessages) => [...prevMessages, aiMessage])
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