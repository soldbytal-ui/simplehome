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

      if (messageCount + 1 >= 3 && !leadSubmitted) {
        setShowLeadCapture(true);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
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
    } catch {
      // silent fail
    }
  };

  return (
    <>
      {/* Chat button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/[0.08]">
          {/* Header */}
          <div className="bg-accent text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div>
              <h3 className="font-semibold text-sm">SimpleHome.ca Assistant</h3>
              <p className="text-xs text-white/70">Powered by AI</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="bg-surface rounded-xl rounded-tl-none px-3 py-2 text-sm text-primary">
                    Hi! I can help you find pre-construction condos in Toronto. What are you looking for?
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 ml-9">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-xs bg-surface hover:bg-surface2 text-primary px-3 py-1.5 rounded-full transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-accent' : 'bg-accent/10'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-accent" />
                  )}
                </div>
                <div
                  className={`rounded-xl px-3 py-2 text-sm max-w-[80%] ${
                    msg.role === 'user'
                      ? 'bg-accent text-white rounded-tr-none'
                      : 'bg-surface text-primary rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="bg-surface rounded-xl rounded-tl-none px-3 py-2 text-sm text-muted">
                  <span className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  </span>
                </div>
              </div>
            )}

            {/* Lead capture */}
            {showLeadCapture && !leadSubmitted && (
              <div className="bg-accent/5 rounded-xl p-3 border border-accent/20">
                <p className="text-xs font-medium text-primary mb-2">
                  Want personalized help? Leave your info and a licensed agent will reach out.
                </p>
                <div className="space-y-2">
                  <input
                    placeholder="Name"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-xs"
                  />
                  <input
                    placeholder="Email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-xs"
                  />
                  <input
                    placeholder="Phone"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-xs"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={submitLead}
                      className="bg-accent text-white px-3 py-1.5 rounded-lg text-xs font-medium"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowLeadCapture(false)}
                      className="text-muted text-xs"
                    >
                      Maybe later
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-1.5 bg-surface">
            <p className="text-[10px] text-muted text-center">
              SimpleHome.ca partners with licensed Ontario real estate professionals.
            </p>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-black/[0.08] flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={messageCount >= 20 ? 'Message limit reached' : 'Ask about Toronto condos...'}
                disabled={messageCount >= 20}
                className="flex-1 px-3 py-2 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim() || messageCount >= 20}
                className="bg-accent text-white p-2 rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
