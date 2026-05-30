"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { createClient } from "@supabase/supabase-js"
import {
  Activity,
  Users,
  Eye,
  Globe,
  Clock,
  ArrowUpRight,
  Monitor,
  Zap,
} from "lucide-react"
import { AppShell } from "@/components/app-shell"

// Create a singleton Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function DashboardPage() {
  const [activeUsers, setActiveUsers] = useState(0)
  const [pageViews, setPageViews] = useState(0)
  const [avgSession, setAvgSession] = useState(0)
  const [realtimeEvents, setRealtimeEvents] = useState<any[]>([])

  useEffect(() => {
    // Generate initial mock data
    setActiveUsers(Math.floor(Math.random() * 20) + 5)
    setPageViews(Math.floor(Math.random() * 5000) + 1200)
    setAvgSession(Math.floor(Math.random() * 120) + 45)

    // Simulate real-time updates for demonstration if no actual table data comes in
    const interval = setInterval(() => {
      setActiveUsers((prev) => {
        const change = Math.floor(Math.random() * 5) - 2
        return Math.max(1, prev + change)
      })
      setPageViews((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)

    // Set up Supabase Realtime subscription (mock channel if no table)
    const channel = supabase
      .channel("analytics")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "page_views" },
        (payload) => {
          setRealtimeEvents((prev) => [payload.new, ...prev].slice(0, 5))
          setPageViews((prev) => prev + 1)
        }
      )
      .subscribe()

    return () => {
      clearInterval(interval)
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <AppShell>
      <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-[var(--violet)]/30 bg-[var(--violet-muted)] text-[var(--violet)] mb-6">
          <Activity className="w-3 h-3 animate-pulse" />
          Live Analytics
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Real-time portfolio metrics powered by Supabase.
        </p>
      </motion.div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Active Users"
          value={activeUsers.toString()}
          icon={<Users className="w-5 h-5 text-cyan-400" />}
          trend="+12%"
          delay={0.1}
        />
        <MetricCard
          title="Total Page Views"
          value={pageViews.toLocaleString()}
          icon={<Eye className="w-5 h-5 text-violet-400" />}
          trend="+5%"
          delay={0.2}
        />
        <MetricCard
          title="Avg Session Duration"
          value={`${Math.floor(avgSession / 60)}m ${avgSession % 60}s`}
          icon={<Clock className="w-5 h-5 text-fuchsia-400" />}
          trend="+2%"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-2 glass gradient-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold">Traffic Overview</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </div>
          </div>
          {/* Simulated Chart Graphic */}
          <div className="h-64 flex items-end justify-between gap-2">
            {Array.from({ length: 24 }).map((_, i) => {
              const height = 20 + Math.random() * 80
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: \`\${height}%\` }}
                  transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                  className="w-full bg-gradient-to-t from-[var(--violet)]/20 to-[var(--violet)] rounded-t-sm"
                />
              )
            })}
          </div>
          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            <span>24h ago</span>
            <span>Now</span>
          </div>
        </motion.div>

        {/* Real-time Event Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="glass border border-border/50 rounded-2xl p-6 flex flex-col"
        >
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Recent Activity
          </h2>
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            {realtimeEvents.length > 0 ? (
              realtimeEvents.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/50"
                >
                  <Globe className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Page View</p>
                    <p className="text-xs text-muted-foreground">{ev.path || "/"}</p>
                  </div>
                  <span className="ml-auto text-[10px] text-muted-foreground">just now</span>
                </motion.div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <Monitor className="w-8 h-8 mb-3 text-muted-foreground" />
                <p className="text-sm">Waiting for live events...</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect to a Supabase table to see data stream here.
                </p>
              </div>
            )}
          </div>
        </motion.div>
        </div>
        </section>
    </AppShell>
  )
}

function MetricCard({ title, value, icon, trend, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="glass gradient-border rounded-2xl p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-background/50 border border-border/50">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-extrabold text-foreground">{value}</p>
        <span className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
          {trend}
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  )
}
