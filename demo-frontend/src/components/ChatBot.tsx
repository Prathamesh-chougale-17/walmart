"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mic, Volume, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLangStore } from "@/stores/langStore";
import { useProductStore } from "@/stores/productStore";
import { useToast } from "./ui/use-toast";
interface Message {
  text: string;
  sender: "user" | "bot";
  language?: string;
}

interface ChatFormData {
  message: string;
}

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { register, handleSubmit, reset } = useForm<ChatFormData>();
  const { language, setLanguage } = useLangStore();
  const { products, updateProductRelevance } = useProductStore();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = window.speechSynthesis;

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognition.current = new webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.lang = language;
      recognition.current.onresult = handleSpeechResult;
    }
  }, [language]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSpeechResult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    handleSend(transcript);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop();
    } else {
      recognition.current?.start();
    }
    setIsListening(!isListening);
  };

  const speakMessage = (text: string) => {
    if (isSpeaking) {
      synthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synthesis.speak(utterance);
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
  };

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    const newUserMessage: Message = { text: message, sender: "user", language };
    setMessages((prev) => [...prev, newUserMessage]);
    reset();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language, context: messages }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const botMessage: Message = {
        text: data.message,
        sender: "bot",
        language,
      };
      setMessages((prev) => [...prev, botMessage]);

      if (data.recommendations) {
        const recommendationMessage: Message = {
          text: "Based on your query, here are some product recommendations:",
          sender: "bot",
          language,
        };
        setMessages((prev) => [...prev, recommendationMessage]);

        data.recommendations.forEach((rec: any) => {
          setMessages((prev) => [
            ...prev,
            {
              text: `${rec.name} - $${rec.price} - <a href="/product/${rec.id}">View Product</a>`,
              sender: "bot",
              language,
            },
          ]);
        });

        updateProductRelevance(data.recommendations.map((rec: any) => rec.id));
      }

      if (data.inventoryInfo) {
        const inventoryMessage: Message = {
          text: `Current inventory status: ${data.inventoryInfo}`,
          sender: "bot",
          language,
        };
        setMessages((prev) => [...prev, inventoryMessage]);
      }

      speakMessage(botMessage.text);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: ChatFormData) => {
    handleSend(data.message);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200"
          >
            <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg">
              <h3 className="font-semibold text-lg">Chat Assistant</h3>
              <div className="flex items-center space-x-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    {message.text.includes("<a href") ? (
                      <div dangerouslySetInnerHTML={{ __html: message.text }} />
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-white rounded-b-lg">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex space-x-2"
              >
                <Input
                  {...register("message")}
                  placeholder="Type your message..."
                  className="flex-grow"
                />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  <Send className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  onClick={toggleListening}
                  className={`${
                    isListening
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    speakMessage(messages[messages.length - 1]?.text)
                  }
                  disabled={isSpeaking}
                  className={`${
                    isSpeaking
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  <Volume className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
