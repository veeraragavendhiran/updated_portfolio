"use client"

import { motion } from "framer-motion"
import { FolderKanban, Code2, ExternalLink } from "lucide-react"
import { AppShell } from "@/components/app-shell"

const tagColors: Record<string, string> = {
  "React": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Node.js": "bg-green-500/10 text-green-400 border-green-500/20",
  "Python": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Machine Learning": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "IoT": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "C++": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
}

const studentProjects = [
  {
    id: "project-1",
    title: "Academic Project 1: Smart Agriculture IoT System",
    description: "Developed an IoT-based soil monitoring system using Raspberry Pi and Python. Collected real-time moisture and temperature data to optimize irrigation schedules, reducing water waste by 30%.",
    tags: ["Python", "IoT", "React", "Node.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "project-2",
    title: "Hackathon Project: AI Study Buddy",
    description: "Built a web application that uses machine learning to generate personalized quizzes from uploaded PDF notes. Won 2nd place in the university hackathon.",
    tags: ["React", "Machine Learning", "Python"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "project-3",
    title: "Data Structures Visualizer",
    description: "Created an interactive web tool to visualize complex sorting algorithms and tree traversals in real-time, helping 100+ junior students learn CS fundamentals.",
    tags: ["React", "C++"],
    githubUrl: "https://github.com",
    liveUrl: ""
  }
]

export default function ProjectsPage() {
  return (
    <AppShell>
      <section
        className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
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
            My Work
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">Academic & Hackathon Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A collection of projects I&apos;ve built during my studies, hackathons, and personal time to explore new technologies.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {studentProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="glass gradient-border rounded-2xl p-6 flex flex-col h-full group hover:border-[var(--violet)]/50 transition-colors"
            >
              <h2 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-[var(--violet)] transition-colors">
                {project.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      tagColors[tag] ?? "bg-muted text-muted-foreground border-border/50"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Code2 className="w-4 h-4" /> Code
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
