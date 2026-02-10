import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Send, Paperclip, Code, User, Bot, FolderGit2, Volume2, Cpu } from 'lucide-react';
import { Theme } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Robot Avatar
const ROBOT_AVATAR = "https://images.unsplash.com/photo-1727386245813-c70d8883995e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwcm9ib3QlMjBhdmF0YXIlMjBwb3J0cmFpdCUyMDNkJTIwcmVuZGVyfGVufDF8fHx8MTc3MDY5NDYzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  context?: string;
  timestamp: string;
}

interface Persona {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
}

const PERSONAS: Persona[] = [
  { id: 'coach', name: 'Coach Nova', role: 'Encouraging Coach', icon: <User size={18} />, color: 'bg-emerald-500' },
  { id: 'prof', name: 'Dr. Turing', role: 'Strict Professor', icon: <Bot size={18} />, color: 'bg-blue-600' },
  { id: 'socratic', name: 'Socrates v2', role: 'Socratic Peer', icon: <Cpu size={18} />, color: 'bg-purple-500' },
];

export function AIChatbot({ theme }: { theme: Theme }) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: 'assistant', 
      content: "Hello! I'm ready to help you optimize your study flow. I see you're currently working on the 'Gateway' component. Shall we review the authentication logic?",
      context: "src/components/auth/Gateway.tsx",
      timestamp: "10:23 AM"
    }
  ]);
  const [input, setInput] = useState('');
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsThinking(true);

    // Mock response
    setTimeout(() => {
      const responses = [
        "That's a great question. Based on the current repository structure, the `Gateway` component handles the initial user entry. Ideally, we should abstract the validation logic into a hook.",
        "Consider using a custom hook for form management here. It would make the component cleaner.",
        "Have you thought about how this integrates with the global theme context? The current implementation looks solid, but could be more modular."
      ];
      const responseText = responses[Math.floor(Math.random() * responses.length)];
      
      setIsThinking(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: responseText,
        context: "src/hooks/useForm.ts",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <div className="h-full flex gap-6 overflow-hidden">
      {/* Persona Sidebar */}
      <div className={`w-64 flex flex-col rounded-2xl border ${
        theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-4">Select Persona</h3>
          <div className="space-y-2">
            {PERSONAS.map(persona => (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activePersona.id === persona.id
                    ? theme === 'light' 
                      ? 'bg-indigo-50 border border-indigo-100' 
                      : 'bg-indigo-900/20 border border-indigo-900/50'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-full ${persona.color} flex items-center justify-center text-white shadow-lg`}>
                  {persona.icon}
                </div>
                <div className="text-left">
                  <div className={`font-medium text-sm ${activePersona.id === persona.id ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                    {persona.name}
                  </div>
                  <div className="text-xs text-slate-400">{persona.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 mt-auto">
          <div className={`p-4 rounded-xl ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-800'}`}>
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">System Stats</h4>
            <div className="flex justify-between text-sm mb-1">
              <span>Memory</span>
              <span className="font-mono text-emerald-500">1.2 GB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Context</span>
              <span className="font-mono text-blue-500">4k Tokens</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col rounded-2xl border overflow-hidden relative ${
        theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        
        {/* Repo Sync Header */}
        <div className={`h-12 px-4 flex items-center border-b ${
          theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <FolderGit2 size={14} className="text-indigo-500" />
            <span>repo-sync:</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              master
            </span>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200">src/components/auth/Gateway.tsx</span>
          </div>
          <div className="ml-auto flex gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-500 font-medium">Live Connected</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 relative">
                {msg.role === 'assistant' ? (
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900">
                      <ImageWithFallback src={ROBOT_AVATAR} alt="AI" className="w-full h-full object-cover" />
                    </div>
                    {/* Voice Interface Glow (Static for now, but implies activity) */}
                    <div className="absolute -inset-1 rounded-full bg-indigo-500/20 animate-pulse z-[-1]" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                    <User size={20} />
                  </div>
                )}
              </div>

              {/* Bubble */}
              <div className={`flex flex-col max-w-[70%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl ${
                   msg.role === 'user'
                     ? 'bg-indigo-500 text-white rounded-br-none shadow-md shadow-indigo-200 dark:shadow-none'
                     : theme === 'light'
                       ? 'bg-slate-100 text-slate-800 rounded-bl-none'
                       : 'bg-slate-800 text-slate-100 rounded-bl-none'
                }`}>
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
                
                {/* Meta info */}
                <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {msg.context && msg.role === 'assistant' && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-indigo-400">
                        <Code size={10} />
                        {msg.context.split('/').pop()}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900">
                  <ImageWithFallback src={ROBOT_AVATAR} alt="AI" className="w-full h-full object-cover" />
               </div>
               <div className={`flex items-center gap-1 p-4 rounded-2xl rounded-bl-none ${
                 theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'
               }`}>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 border-t ${
          theme === 'light' ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800'
        }`}>
          {/* Waveform Visualization if Recording */}
          <AnimatePresence>
            {isRecording && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 40, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex items-center justify-center gap-1 mb-2 overflow-hidden"
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [10, Math.random() * 30 + 10, 10] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                    className="w-1 bg-indigo-500 rounded-full"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSend} className="relative flex items-end gap-2">
            <button 
              type="button"
              className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <Paperclip size={20} />
            </button>
            
            <div className={`flex-1 rounded-xl flex items-center px-4 py-2 border transition-all ${
              theme === 'light' 
                ? 'bg-slate-50 border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100'
                : 'bg-slate-950 border-slate-700 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-900'
            }`}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your code or concepts..."
                className="flex-1 bg-transparent border-none outline-none min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`ml-2 p-2 rounded-full transition-colors ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Mic size={20} />
              </button>
            </div>

            <button
              type="submit"
              disabled={!input.trim()}
              className="p-3 bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
