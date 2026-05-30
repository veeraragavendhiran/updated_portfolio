"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Sparkles, Code2, Server } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

// Inline brand icons (lucide-react dropped social brand icons)
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
import Link from "next/link"
import { useEffect, useState } from "react"

const roles = [
  "Full-Stack Engineer",
  "System Architect",
  "Performance Engineer",
  "Open Source Contributor",
]

const techStack = [
  { label: "Next.js", color: "var(--foreground)" },
  { label: "TypeScript", color: "#3b82f6" },
  { label: "PostgreSQL", color: "#22d3ee" },
  { label: "Redis", color: "#ef4444" },
  { label: "Docker", color: "#60a5fa" },
  { label: "AWS", color: "#f59e0b" },
]

const stats = [
  { value: "50+", label: "Projects Shipped" },
  { value: "3+", label: "Years Experience" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "100ms", label: "Avg API Response" },
]

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2)
    } else if (deleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setDeleting(false)
        setWordIndex((w) => (w + 1) % words.length)
      }, speed / 2)
    }

    const displayTimeout = setTimeout(() => setDisplayed(current.slice(0, charIndex)), 0)
    return () => {
      clearTimeout(timeout)
      clearTimeout(displayTimeout)
    }
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return displayed
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
}

export function HeroSection() {
  const role = useTypewriter(roles)

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient-bg noise"
      aria-label="Hero section"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Radial glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--violet), transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--cyan), transparent)" }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Text Content */}
        <div className="flex flex-col gap-8">
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-[var(--violet)]/30 bg-[var(--violet-muted)] text-[var(--violet)]">
              <Sparkles className="w-3 h-3" />
              Available for new opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
              <span className="text-foreground">Hi, I&apos;m</span>
              <br />
              <span className="gradient-text">Your Name</span>
            </h1>
            {/* Typewriter role */}
            <div className="flex items-center gap-2 h-10">
              <Code2 className="w-5 h-5 text-[var(--cyan)] shrink-0" />
              <p className="text-xl sm:text-2xl font-medium text-muted-foreground">
                {role}
                <span
                  className="inline-block w-0.5 h-6 ml-1 bg-[var(--violet)] align-middle"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            I build high-performance, production-grade applications — from real-time systems and
            vector AI pipelines to interactive architecture canvases. Every line of code is
            optimized for scale, speed, and developer experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              id="hero-view-projects"
              className={buttonVariants({ size: "lg" }) + " gap-2 bg-[var(--violet)] hover:bg-[var(--violet)]/90 !text-white shadow-lg shadow-[var(--violet)]/30 hover:shadow-[var(--violet)]/50 transition-all duration-300 hover:-translate-y-0.5"}
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/resume.pdf"
              download
              id="hero-download-resume"
              className={buttonVariants({ variant: "outline", size: "lg" }) + " gap-2 border-border/60 hover:!border-[var(--cyan)] hover:!bg-[var(--cyan-muted)] hover:!text-foreground transition-all duration-300 hover:-translate-y-0.5"}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              aria-label="GitHub Profile"
              id="hero-github"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              aria-label="LinkedIn Profile"
              id="hero-linkedin"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <div className="h-4 w-px bg-border" />
            <span className="text-xs text-muted-foreground">
              Press{" "}
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono">
                Ctrl+K
              </kbd>{" "}
              to explore
            </span>
          </motion.div>
        </div>

        {/* Right: Visual Card Stack */}
        <motion.div
          variants={itemVariants}
          className="hidden lg:flex flex-col gap-4 items-end"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="gradient-border p-4 rounded-xl"
              >
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="glass gradient-border rounded-2xl p-5 w-full max-w-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-4 h-4 text-[var(--violet)]" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Core Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.label}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-border/60 bg-muted/50 text-foreground hover:border-[var(--violet)]/50 hover:bg-[var(--violet-muted)] transition-colors duration-200 cursor-default"
                >
                  {tech.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Live status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            All systems operational
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border border-border/50 flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-[var(--violet)]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
