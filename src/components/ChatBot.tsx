import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, X, Expand, Paperclip, Send, ChevronRight, Shrink, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  attachment?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const THEMES = [
  { hex: '#4285F4', bg: '#0b1120' },
  { hex: '#00FF88', bg: '#0a0f0a' },
  { hex: '#A855F7', bg: '#160d21' },
  { hex: '#F43F5E', bg: '#1f0d14' },
  { hex: '#FBBC05', bg: '#1a1608' }
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [attachment, setAttachment] = useState<File | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTheme = THEMES[themeIndex];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'bot',
        content: `✦ Welcome to Arcade Buddy Assistant!\n\nI'm your intelligent guide for Google Cloud Arcade.\nI can help you:\n\n🔗 Share your Google Cloud profile URL for instant point calculation\n\n🎯 Ask "recommend badges" for personalized suggestions\n\n📊 Say "show dashboard" to view your progress\n\nWhat would you like to do first?`,
        timestamp: new Date(),
        quickReplies: ["How do I calculate points?", "What are the milestones?", "How do I find my profile URL?"]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleAction = (action: string) => {
    if (action === 'calculator') {
      const calculatorEl = document.getElementById('calculator');
      if (calculatorEl) {
        calculatorEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/dashboard#calculator';
      }
    } else if (action === 'dashboard') {
      window.location.href = '/dashboard';
    } else if (action === 'badge_tracker') {
      window.location.href = '/dashboard#tracker';
    } else if (action === 'leaderboard') {
      window.location.href = '/leaderboard';
    }
  };

  const checkSpecialCommands = (text: string) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('calculate points') || lowerText.includes('skills.google/public_profiles/')) {
      return {
        reply: "Head to the Calculator section! Paste your profile URL there for instant results 🧮",
        actionButton: { label: "Open Calculator →", onClick: () => handleAction('calculator') },
        quickReplies: ["What tier am I in?", "Show milestone requirements", "What badges should I do?"]
      };
    }
    if (lowerText.includes('show dashboard') || lowerText.includes('view dashboard')) {
      return {
        reply: "Opening your dashboard!",
        actionButton: { label: "Go to Dashboard →", onClick: () => handleAction('dashboard') }
      };
    }
    if (lowerText.includes('badge tracker') || lowerText.includes('track badges')) {
      return {
        reply: "The Badge Tracker shows your eligible badges for Jul 13–Sep 14!",
        actionButton: { label: "Open Badge Tracker →", onClick: () => handleAction('badge_tracker') }
      };
    }
    if (lowerText.includes('leaderboard') || lowerText.includes('rankings')) {
      return {
        reply: "Taking you to the leaderboard!",
        actionButton: { label: "View Leaderboard →", onClick: () => handleAction('leaderboard') }
      };
    }
    
    return null;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim() && !attachment) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
      attachment: attachment ? URL.createObjectURL(attachment) : undefined
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    const hasAttachment = !!attachment;
    setAttachment(null);
    setLoading(true);

    if (hasAttachment) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'bot',
          content: "For further help, feel free to email us at 📧 abir.facilitator@gmail.com and we'll get back to you as soon as possible! or join the channel for more information link https://chat.whatsapp.com/IHPSoiWBJ6d4SZrY1yUDty",
          timestamp: new Date()
        }]);
        setLoading(false);
      }, 600);
      return;
    }

    const specialCmd = checkSpecialCommands(text);
    if (specialCmd) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'bot',
          content: specialCmd.reply,
          timestamp: new Date(),
          actionButton: specialCmd.actionButton,
          quickReplies: specialCmd.quickReplies
        }]);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const history = messages.slice(-10).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history })
      });
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      
      let quickReplies: string[] = [];
      const lowerText = text.toLowerCase();
      if (lowerText.includes('milestone') || lowerText.includes('require')) {
        quickReplies = ["How many points do I need?", "What is the program timeline?", "How do I earn bonus points?"];
      } else if (lowerText.includes('point') || lowerText.includes('tier')) {
        quickReplies = ["What tier am I in?", "Show milestone requirements", "What badges should I do?"];
      }
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot',
        content: data.reply,
        timestamp: new Date(),
        quickReplies: quickReplies.length > 0 ? quickReplies : undefined
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment! 🔄",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
        style={{ boxShadow: `0 0 20px ${currentTheme.hex}4D` }}
      >
        <div 
          className="absolute inset-0 rounded-full border animate-[pulse_2s_ease-in-out_infinite]" 
          style={{ borderColor: `${currentTheme.hex}80` }}
        />
        <Sparkles className="w-6 h-6" style={{ color: currentTheme.hex }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed z-[9999] flex flex-col overflow-hidden text-slate-200 shadow-2xl transition-all duration-300 ${
              isFullScreen 
                ? 'inset-4 md:inset-10 rounded-3xl' 
                : 'bottom-[90px] right-6 w-[360px] h-[520px] rounded-2xl'
            }`}
            style={{ 
              backgroundColor: currentTheme.bg, 
              borderColor: `${currentTheme.hex}33`,
              borderWidth: '1px',
              boxShadow: `0 8px 32px ${currentTheme.hex}26`
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 border-b"
              style={{ 
                backgroundColor: `${currentTheme.hex}14`, 
                borderColor: `${currentTheme.hex}26` 
              }}
            >
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" style={{ color: currentTheme.hex }} />
                <span className="font-bold" style={{ color: currentTheme.hex }}>Arcade Buddy Assistant</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setThemeIndex((prev) => (prev + 1) % THEMES.length)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 group relative"
                  title="Change Theme Color"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
                  title={isFullScreen ? "Minimize" : "Maximize"}
                >
                  {isFullScreen ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div 
                    className={`px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'text-black rounded-[18px_18px_4px_18px]' 
                        : 'bg-white/5 border text-slate-200 rounded-[18px_18px_18px_4px]'
                    }`}
                    style={{
                      backgroundColor: msg.role === 'user' ? currentTheme.hex : undefined,
                      borderColor: msg.role === 'bot' ? `${currentTheme.hex}26` : undefined
                    }}
                  >
                    {msg.attachment && (
                      <div className="mb-2">
                        <img src={msg.attachment} alt="attachment" className="max-w-[200px] rounded-lg border border-white/20" />
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {msg.role === 'bot' ? (
                        <div className="markdown-body prose prose-invert max-w-none prose-p:my-1 prose-ul:my-1">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                  
                  {msg.actionButton && (
                    <button
                      onClick={msg.actionButton.onClick}
                      className="mt-2 text-xs font-medium border px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                      style={{
                        backgroundColor: `${currentTheme.hex}1A`,
                        color: currentTheme.hex,
                        borderColor: `${currentTheme.hex}4D`
                      }}
                    >
                      {msg.actionButton.label}
                    </button>
                  )}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.quickReplies.map((reply, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => handleSend(reply)}
                          className="text-[12px] px-3.5 py-1.5 rounded-full border transition-colors whitespace-nowrap"
                          style={{
                            color: currentTheme.hex,
                            borderColor: `${currentTheme.hex}4D`,
                            backgroundColor: `${currentTheme.hex}0D`
                          }}
                        >
                          {reply}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start px-4 py-3 bg-white/5 border rounded-[18px_18px_18px_4px] flex items-center gap-1"
                  style={{ borderColor: `${currentTheme.hex}26` }}
                >
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.hex }} />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.hex }} />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.hex }} />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div 
              className="p-3 bg-white/5 border-t flex flex-col gap-2 relative"
              style={{ borderColor: `${currentTheme.hex}1A` }}
            >
              {attachment && (
                <div className="absolute bottom-[100%] left-4 mb-2 p-2 bg-slate-800/90 rounded-lg backdrop-blur-md flex items-center gap-2 border border-white/10 shadow-lg">
                  <ImageIcon className="w-4 h-4 text-slate-300" />
                  <div className="text-xs text-slate-200 truncate max-w-[150px]">{attachment.name}</div>
                  <button onClick={() => setAttachment(null)} className="text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-full p-1 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileSelect}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-400 hover:text-slate-200 transition-colors bg-white/5 hover:bg-white/10 rounded-full"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask for badge recommendations or help..."
                  className="flex-1 bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-0 px-2"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() && !attachment}
                  className="w-10 h-10 rounded-full bg-black flex items-center justify-center disabled:opacity-50 disabled:text-slate-500 hover:scale-105 transition-transform shrink-0"
                  style={{ color: currentTheme.hex, boxShadow: `0 0 10px ${currentTheme.hex}33` }}
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
