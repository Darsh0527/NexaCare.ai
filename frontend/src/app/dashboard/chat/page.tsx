"use client";

import { useState, useRef, useEffect } from "react";
import api from "@/lib/api";
import { Send, Bot, User, Sparkles } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Hello! I'm NexaCare AI. I can analyze patient risk factors, forecast hospital resources, and answer clinical questions. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    "Who is most at risk today?",
    "Who might be readmitted this week?",
    "How many ICU beds do we need Thursday?",
    "Which patients can be safely discharged?",
    "Show me patients with oxygen issues"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await api.post('/chat', { message: text });
      setMessages(prev => [...prev, { role: 'ai', content: res.data.reply }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I am having trouble connecting to the server. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-display font-bold text-[#1A1A1A] flex items-center gap-2">
          <Sparkles className="text-[#C8A96E]" size={24} /> AI Co-Pilot
        </h1>
        <p className="text-[#6B6B6B] text-sm mt-1">Ask questions about patients, alerts, and hospital resources</p>
      </div>

      <div className="flex flex-col flex-1 bg-white rounded-xl border border-[#E0DDD7] shadow-sm overflow-hidden">
        {/* Messages view */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F9F8F6]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-[#1A1A1A] text-white' : 'bg-[#C8A96E] text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl whitespace-pre-line leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-[#1A1A1A] text-white rounded-tr-none' 
                  : 'bg-white border border-[#E0DDD7] text-[#1A1A1A] shadow-sm rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 max-w-[80%]">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C8A96E] text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E0DDD7] rounded-tl-none flex items-center gap-1 h-[48px] px-5">
                <div className="w-1.5 h-1.5 bg-[#9B9B9B] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-[#9B9B9B] rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                <div className="w-1.5 h-1.5 bg-[#9B9B9B] rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 bg-white border-t border-[#E0DDD7]">
          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {presetQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-xs bg-[#F2F0EB] text-[#6B6B6B] border border-[#E0DDD7] px-3 py-1.5 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors text-left font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your clinical question here..."
              className="flex-1 rounded-xl border border-[#E0DDD7] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent text-[#1A1A1A]"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-[#1A1A1A] text-white p-3 rounded-xl hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[56px]"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
