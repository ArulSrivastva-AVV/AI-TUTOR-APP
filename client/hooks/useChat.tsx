import { useState } from 'react';
import { chatService } from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add student message to UI immediately
    const userMessage = { role: 'student', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 2. Call the backend service
      const data = await chatService.askQuestion(text);
      
      // 3. Add AI response to UI
      const botMessage = { role: 'tutor', content: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Tutor failed to respond:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
};