"use client"
import { LoaderPinwheel } from "lucide-react";

import DefaultPage from "./components/DefaultPage";
import ChatForm from "./components/ChatForm";
import MessageList from "./components/MessageList";
import ModelsDropdown from "./components/ModelsDropdown";

import { useChat } from "@/hooks/use-chat";

export default function Home() {

  const { messages, setInput, input, isFirstInteraction, handleSubmit, isLoading, models, selectedModel, setSelectedModel } = useChat()

  return (
    <main className="bg-background min-h-screen w-full">
      <ModelsDropdown setSelectedModel={setSelectedModel} selectedModel={selectedModel} />
      <div className="max-w-5xl mx-auto h-screen flex flex-col">


        {/* ESTADO INICIAL */}
        {isFirstInteraction ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <DefaultPage />
            <div className="w-full mt-8">
              <ChatForm
                handleSubmit={handleSubmit}
                input={input}
                setInput={setInput}
              />
            </div>
          </div>
        ) : (
          <>
            {/* ÁREA DAS MENSAGENS */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
              <MessageList messages={messages} />

              {/* LOADING */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="
                  bg-[#10141C]/80
                  border border-[#1B2430]
                  text-[#A1AAB8]
                  p-2
                  rounded-2xl
                  backdrop-blur-md
                  animate-pulse
                "
                  >
                    <LoaderPinwheel className="animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>

            {/* FORM FIXO EMBAIXO */}
            <div className="sticky bottom-0 w-full bg-background px-4 py-4">
              <ChatForm
                handleSubmit={handleSubmit}
                input={input}
                setInput={setInput}
              />
            </div>
          </>
        )}
      </div>
    </main>
  )
}