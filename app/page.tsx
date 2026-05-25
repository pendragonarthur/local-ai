"use client"
import { LoaderPinwheel } from "lucide-react";

import DefaultPage from "./components/DefaultPage";
import ChatForm from "./components/ChatForm";
import MessageList from "./components/MessageList";
import ModelsDropdown from "./components/ModelsDropdown";

import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";

export default function Home() {

  const { messages, setInput, input, isFirstInteraction, handleSubmit, isLoading, models, selectedModel, setSelectedModel } = useChat()

  return (
    <main className="bg-background py-6 min-h-screen items-center flex flex-col">
      <span>
        <ModelsDropdown setSelectedModel={setSelectedModel} selectedModel={selectedModel} />
      </span>

      <div className={cn("flex flex-col w-full max-w-5xl space-y-8 h-full", `${isFirstInteraction ? "justify-center " : "justify-between"}`)}>
        <div className={cn("px-6")}>
          {isFirstInteraction && <DefaultPage />}

          <MessageList messages={messages} />

          {isLoading && (
            <div className="flex justify-start mt-4">
              <div className=" border border-[#1e301b] text-[#A1AAB8] p-2 rounded-2xl backdrop-blur-md animate-pulse">
                <LoaderPinwheel className="animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
        <div className="max-w-4xl mx-auto px-4 w-full">
          <ChatForm
            handleSubmit={handleSubmit}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </main>
  )
}