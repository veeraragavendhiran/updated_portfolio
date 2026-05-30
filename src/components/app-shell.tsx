"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { CommandPalette } from "@/components/command-palette"
import { AIChatPanel } from "@/components/ai-chat-panel"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [cmdOpen, setCmdOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)

  // Global Cmd+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCmdOpen((open) => !open)
      }
      if (e.key === "Escape") {
        setCmdOpen(false)
        setAiOpen(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Navbar onCommandPaletteOpen={() => setCmdOpen(true)} />
      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        onOpenAI={() => setAiOpen(true)}
      />
      <AIChatPanel open={aiOpen} onClose={() => setAiOpen(false)} />
      <main className="pt-16">{children}</main>
    </>
  )
}
