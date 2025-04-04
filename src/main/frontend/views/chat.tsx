import React, { useState, useEffect, useRef } from "react";
import { Button, TextField } from "@vaadin/react-components";
import { ChatAIService } from "Frontend/generated/endpoints";
import Markdown from "react-markdown";

interface Message {
    content: string;
    isAI: boolean;
    id: number;
}

export default function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function handleSubmit() {
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            content: input,
            isAI: false,
            id: Date.now(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await ChatAIService.ragChat(input);

            // Add AI response
            const aiMessage: Message = {
                content: response,
                isAI: true,
                id: Date.now() + 1,
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                content: "Sorry, I'm having trouble responding. Please try again later.",
                isAI: true,
                id: Date.now() + 1,
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="chat-container">
            <div className="message-list">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.isAI ? "ai-message" : "user-message"}`}
                    >
                        {message.isAI ? (
                            <Markdown>{message.content}</Markdown>
                        ) : (
                            message.content
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="message ai-message loading-indicator">
                        <div className="typing-dots">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-container">
                <TextField
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="chat-input"
                    placeholder="Type your message..."
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <Button
                    theme="primary"
                    className="send-button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    Send
                </Button>
            </div>
        </div>
    );
}