'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  "What's available in King West under $800K?",
  "Best condos for 2027 move-in?",
  "Compare Downtown vs Midtown",
  "First-time buyer options?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || messageCount >= 20) return;
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setMessageCount((c) => c + 1);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
      if (messageCount + 1 >= 3 && !leadSubmitted) setShowLeadCapture(true);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    }
    setLoading(false);
  };

  const submitLead = async () => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadForm, source: 'chat' }),
      });
      setLeadSubmitted(true);
      setShowLeadCapture(false);
    } catch { /* silent */ }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-card-hover flex items-center justify-center transition-all duration-300 hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[600px] bg-white flex flex-col overflow-hidden border border-black/[0.06] shadow-card-hover">
          {/* Header */}
          <div className="bg-primary text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div>
              <h3 className="text-sm font-normal">SimpleHome.ca</h3>
              <p className="text-[10px] text-white/50 font-light mt-0.5">Concierge</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 bg-surface flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-muted" strokeWidth={1.5} />
                  </div>
                  <div className="bg-surface px-3 py-2 text-sm font-light text-primary">
                    Welcome. How can I help you find the right property in Toronto?
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 ml-9">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-[11px] font-light border border-black/[0.08] text-muted px-3 py-1.5 hover:border-primary hover:text-primary transition-colors duration-300"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary' : 'bg-surface'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" strokeWidth={1.5} /> : <Bot className="w-4 h-4 text-muted" strokeWidth={1.5} />}
                </div>
                <div className={`px-3 py-2 text-sm font-light max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-surface text-primary'}`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 bg-surface flex items-center justify-center">
                  <Bot className="w-4 h-4 text-muted" strokeWidth={1.5} />
                </div>
                <div className="bg-surface px-3 py-2 text-sm text-muted font-light">
                  <span className="flex gap-1">
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
                  </span>
                </div>
              </div>
            )}

            {showLeadCapture && !leadSubmitted && (
              <div className="border border-copper/20 p-3">
                <p className="text-[11px] font-normal text-primary mb-2">
                  Want personalized assistance? A licensed agent can help.
                </p>
                <div className="space-y-2">
                  <input placeholder="Name" value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} className="w-full border-0 border-b border-black/10 pb-1.5 text-xs font-light focus:outline-none focus:border-primary bg-transparent" />
                  <input placeholder="Email" value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} className="w-full border-0 border-b border-black/10 pb-1.5 text-xs font-light focus:outline-none focus:border-primary bg-transparent" />
                  <input placeholder="Phone" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} className="w-full border-0 border-b border-black/10 pb-1.5 text-xs font-light focus:outline-none focus:border-primary bg-transparent" />
                  <div className="flex gap-2 pt-1">
                    <button onClick={submitLead} className="bg-primary text-white px-3 py-1.5 text-[10px] uppercase tracking-wider">Submit</button>
                    <button onClick={() => setShowLeadCapture(false)} className="text-muted text-[10px]">Later</button>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-1.5 bg-surface">
            <p className="text-[9px] text-muted/60 text-center font-light">
              SimpleHome.ca partners with licensed Ontario real estate professionals.
            </p>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-black/[0.06] flex-shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={messageCount >= 20 ? 'Limit reached' : 'Ask about Toronto properties...'}
                disabled={messageCount >= 20}
                className="flex-1 border-0 border-b border-black/10 pb-2 text-sm font-light focus:outline-none focus:border-primary disabled:opacity-50 bg-transparent"
              />
              <button type="submit" disabled={loading || !input.trim() || messageCount >= 20} className="bg-primary text-white p-2 hover:bg-primary/80 disabled:opacity-30 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
