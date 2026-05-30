"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FolderKanban, ChevronDown, ChevronUp } from "lucide-react"
import dynamic from "next/dynamic"
import { projects } from "@/components/architecture-canvas"
import { AppShell } from "@/components/app-shell"

// Dynamically import ReactFlow (client-only, large bundle)
const ArchitectureCanvas = dynamic(
  () => import("@/components/architecture-canvas").then((m) => m.ArchitectureCanvas),
  { ssr: false, loading: () => (
    <div className="w-full h-[480px] rounded-2xl border border-border/50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="w-8 h-8 border-2 border-[var(--violet)]/40 border-t-[var(--violet)] rounded-full animate-spin" />
        <span className="text-sm">Loading canvas…</span>
      </div>
    </div>
  )}
)

const tagColors: Record<string, string> = {
  "Next.js": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PostgreSQL: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Redis: "bg-red-500/10 text-red-400 border-red-500/20",
  Supabase: "bg-green-500/10 text-green-400 border-green-500/20",
  Stripe: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Pinecone: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  Gemini: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  FastAPI: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Python: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  AWS: "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

export default function ProjectsPage() {
  const [expanded, setExpanded] = useState<string>(projects[0].id)

  return (
    <AppShell>
      <section
        className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        aria-label="Projects"
      >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-[var(--violet)]/30 bg-[var(--violet-muted)] text-[var(--violet)] mb-6">
          <FolderKanban className="w-3 h-3" />
          Interactive Architecture Diagrams
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Click any node in the architecture canvas to explore technical details,
          performance metrics, and optimization strategies.
        </p>
      </motion.div>

      {/* Project Cards */}
      <div className="flex flex-col gap-6">
        {projects.map((project, i) => {
          const isOpen = expanded === project.id
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="gradient-border rounded-2xl overflow-hidden"
            >
              {/* Card Header */}
              <button
                className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-muted/20 transition-colors duration-200"
                onClick={() => setExpanded(isOpen ? "" : project.id)}
                aria-expanded={isOpen}
                id={`project-toggle-${project.id}`}
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-foreground mb-2">{project.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          tagColors[tag] ?? "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 mt-1 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Expandable Canvas */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="canvas"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-border/50"
                  >
                    <div className="p-6 pt-4">
                      <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--violet)] animate-pulse" />
                        Click nodes to inspect • Drag to rearrange • Scroll to zoom
                      </p>
                      <ArchitectureCanvas project={project} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
      </section>
    </AppShell>
  )
}
