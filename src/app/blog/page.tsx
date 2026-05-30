"use client"

import { AppShell } from "@/components/app-shell"
import { motion } from "framer-motion"
import { BookOpen, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    id: 1,
    title: "Building a Real-Time Architecture with Next.js and Supabase",
    excerpt: "Learn how to leverage Supabase Realtime to build interactive dashboards with optimistic updates and seamless offline fallbacks.",
    date: "Oct 24, 2024",
    readTime: "8 min read",
    category: "Architecture"
  },
  {
    id: 2,
    title: "Optimizing Vector Searches in Pinecone",
    excerpt: "A deep dive into indexing strategies, embedding optimization, and metadata filtering for blazing fast Retrieval-Augmented Generation.",
    date: "Sep 12, 2024",
    readTime: "12 min read",
    category: "AI/ML"
  },
  {
    id: 3,
    title: "The Case for Pure CSS in 2025",
    excerpt: "Why modern CSS features like CSS Variables, Grid, and Container Queries might make you reconsider your CSS framework dependency.",
    date: "Aug 05, 2024",
    readTime: "6 min read",
    category: "Frontend"
  }
]

export default function BlogPage() {
  return (
    <AppShell>
      <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-[var(--cyan)]/30 bg-[var(--cyan)]/10 text-[var(--cyan)] mb-6">
            <BookOpen className="w-3 h-3" />
            Writing
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Thoughts on software engineering, architecture, and design.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="glass gradient-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 group hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-3">
                  <span className="text-[var(--violet)]">{post.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[var(--violet)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--cyan)] hover:text-[var(--violet)] transition-colors"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
