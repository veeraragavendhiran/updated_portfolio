"use client"

import { AppShell } from "@/components/app-shell"
import { motion } from "framer-motion"
import { User, Briefcase, Code2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <AppShell>
      <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-[var(--violet)]/30 bg-[var(--violet-muted)] text-[var(--violet)] mb-6">
            <User className="w-3 h-3" />
            About Me
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Hi, I&apos;m <span className="gradient-text">Dev</span>.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            I&apos;m a full-stack engineer passionate about building high-performance web applications, 
            real-time systems, and AI-driven products. I believe in clean code, exceptional user 
            experiences, and constant learning.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass gradient-border p-6 rounded-2xl">
              <h3 className="flex items-center gap-2 font-bold mb-4 text-lg">
                <Briefcase className="w-5 h-5 text-[var(--violet)]" />
                Experience
              </h3>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-foreground">Senior Full Stack Engineer</h4>
                  <p className="text-sm text-muted-foreground">Tech Corp • 2023 - Present</p>
                </li>
                <li>
                  <h4 className="font-semibold text-foreground">Software Engineer</h4>
                  <p className="text-sm text-muted-foreground">Startup Inc • 2020 - 2023</p>
                </li>
              </ul>
            </div>

            <div className="glass gradient-border p-6 rounded-2xl">
              <h3 className="flex items-center gap-2 font-bold mb-4 text-lg">
                <Code2 className="w-5 h-5 text-[var(--cyan)]" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Redis", "Python", "AWS"].map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="mailto:hello@example.com"
              className={buttonVariants({ size: "lg" }) + " bg-[var(--violet)] hover:bg-[var(--violet)]/90 text-white shadow-lg shadow-[var(--violet)]/20 transition-all hover:-translate-y-0.5"}
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </section>
    </AppShell>
  )
}
