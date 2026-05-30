"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Home,
  FolderKanban,
  User,
  BookOpen,
  BarChart2,
  Sun,
  Moon,
  Terminal,
  MessageSquare,
  Mail,
  FileText,
  Zap,
} from "lucide-react"

// Inline brand icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenAI?: () => void
}

export function CommandPalette({ open, onOpenChange, onOpenAI }: CommandPaletteProps) {
  const router = useRouter()
  const { setTheme } = useTheme()

  const runCommand = useCallback(
    (command: () => void) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange]
  )

  const navigate = (href: string) => {
    runCommand(() => router.push(href))
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigate("/")} id="cmd-home">
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/projects")} id="cmd-projects">
            <FolderKanban className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/about")} id="cmd-about">
            <User className="mr-2 h-4 w-4" />
            <span>About Me</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/blog")} id="cmd-blog">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Blog</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard")} id="cmd-dashboard">
            <BarChart2 className="mr-2 h-4 w-4" />
            <span>Analytics Dashboard</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(() => onOpenAI?.())}
            id="cmd-open-ai"
          >
            <MessageSquare className="mr-2 h-4 w-4 text-[var(--violet)]" />
            <span>Ask AI Assistant</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => window.open("/resume.pdf", "_blank"))}
            id="cmd-download-resume"
          >
            <FileText className="mr-2 h-4 w-4 text-[var(--cyan)]" />
            <span>Download Resume</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))} id="cmd-theme-dark">
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))} id="cmd-theme-light">
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("cyberpunk"))} id="cmd-theme-cyber">
            <Terminal className="mr-2 h-4 w-4 text-green-400" />
            <span>Cyberpunk Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))} id="cmd-theme-system">
            <Zap className="mr-2 h-4 w-4" />
            <span>System Default</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Social">
          <CommandItem
            onSelect={() => runCommand(() => window.open("https://github.com", "_blank"))}
            id="cmd-github"
          >
            <GithubIcon className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => window.open("https://linkedin.com", "_blank"))}
            id="cmd-linkedin"
          >
            <LinkedinIcon className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => window.open("mailto:you@email.com"))}
            id="cmd-email"
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>Send Email</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
