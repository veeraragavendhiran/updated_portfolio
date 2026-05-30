"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface AIChatPanelProps {
  open: boolean
  onClose: () => void
}

const suggestions = [
  "What technologies do you specialize in?",
  "Show me projects where you optimized SQL queries",
  "What's your experience with real-time systems?",
  "Can you download the resume PDF?",
]

export function AIChatPanel({ open, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm a context-aware AI trained on this portfolio's resume, projects, and blog posts. Ask me anything — technical questions, project details, or just say hi! 👋",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })

      if (!res.ok) throw new Error("API error")
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""
      const assistantId = Date.now().toString() + "-a"
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          assistantContent += decoder.decode(value, { stream: true })
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: assistantContent } : m
            )
          )
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-err",
          role: "assistant",
          content: "Sorry, I ran into an issue. Please try again in a moment!",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col glass border-l border-border/50 shadow-2xl"
            role="dialog"
            aria-label="AI Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)] flex items-center justify-center shadow-lg shadow-[var(--violet)]/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Portfolio AI</p>
                  <p className="text-xs text-[var(--violet)] flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Powered by Gemini
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                id="ai-chat-close"
                aria-label="Close AI panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)]"
                        : "bg-muted border border-border"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-card border border-border/60 text-foreground rounded-tl-none"
                        : "bg-[var(--violet)] text-white rounded-tr-none"
                    }`}
                  >
                    {msg.content || (
                      <span className="flex gap-1 items-center text-muted-foreground">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Thinking…
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-5 pb-3 flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-medium">Try asking:</p>
                <div className="flex flex-col gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-left text-xs px-3 py-2 rounded-lg border border-border/60 hover:border-[var(--violet)]/50 hover:bg-[var(--violet-muted)] text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-5 pb-5 pt-2 border-t border-border/50">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about this portfolio…"
                  disabled={loading}
                  id="ai-chat-input"
                  className="flex-1 rounded-xl border border-border/60 bg-muted/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--violet)]/40 focus:border-[var(--violet)] transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  id="ai-chat-send"
                  className="shrink-0 w-10 h-10 rounded-xl bg-[var(--violet)] text-white flex items-center justify-center hover:bg-[var(--violet)]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-[var(--violet)]/30"
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
