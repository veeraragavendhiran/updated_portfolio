"use client"

import { useCallback, useState } from "react"
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type Connection,
  type NodeTypes,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { motion, AnimatePresence } from "framer-motion"
import { X, Zap, Database, Globe, Server, Shield, BarChart2, Cloud } from "lucide-react"

// ── Custom Node Icons ──────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  nextjs:  <Zap className="w-5 h-5 text-white" />,
  db:      <Database className="w-5 h-5 text-cyan-400" />,
  api:     <Server className="w-5 h-5 text-violet-400" />,
  cdn:     <Globe className="w-5 h-5 text-blue-400" />,
  auth:    <Shield className="w-5 h-5 text-green-400" />,
  metrics: <BarChart2 className="w-5 h-5 text-orange-400" />,
  cloud:   <Cloud className="w-5 h-5 text-sky-400" />,
}

type ArchNodeData = {
  label: string
  type: string
  detail: string
  metric: string
  color: string
}

// ── Custom Architecture Node ───────────────────────────────────
function ArchNode({ data, selected }: { data: ArchNodeData; selected: boolean }) {
  return (
    <div
      className={`px-4 py-3 rounded-xl border transition-all duration-200 min-w-[140px] text-center cursor-pointer
        ${selected
          ? "border-[var(--violet)] shadow-lg shadow-[var(--violet)]/30 bg-[var(--violet-muted)]"
          : "border-border/60 bg-card/80 hover:border-[var(--violet)]/50 hover:shadow-md"
        }`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div className="flex flex-col items-center gap-1.5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: data.color }}
        >
          {iconMap[data.type] ?? <Zap className="w-5 h-5 text-white" />}
        </div>
        <span className="text-xs font-semibold text-foreground">{data.label}</span>
        <span className="text-[10px] text-muted-foreground">{data.metric}</span>
      </div>
    </div>
  )
}

const nodeTypes: NodeTypes = { arch: ArchNode as never }

// ── Project Architecture Definitions ──────────────────────────
export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  nodes: (ArchNodeData & { id: string; position: { x: number; y: number } })[]
  edges: { id: string; source: string; target: string; animated?: boolean; label?: string }[]
}

const projects: Project[] = [
  {
    id: "ecommerce",
    title: "Real-Time E-Commerce Platform",
    description:
      "A high-scale e-commerce backend processing 10k+ concurrent users with sub-100ms API response times, featuring real-time inventory updates and AI-powered recommendations.",
    tags: ["Next.js", "Supabase", "Redis", "PostgreSQL", "Stripe"],
    nodes: [
      { id: "cdn",  label: "Vercel Edge",  type: "cdn",  detail: "Global CDN with 50ms TTFB",  metric: "50ms TTFB",   color: "linear-gradient(135deg,#3b82f6,#1d4ed8)", position: { x: 280, y: 0   } },
      { id: "app",  label: "Next.js App",  type: "nextjs", detail: "SSR + PPR hybrid rendering", metric: "LCP < 1.2s", color: "linear-gradient(135deg,#7c3aed,#4f46e5)", position: { x: 280, y: 120 } },
      { id: "api",  label: "API Layer",   type: "api",  detail: "Server Actions + REST endpoints", metric: "95ms avg",  color: "linear-gradient(135deg,#8b5cf6,#6d28d9)", position: { x: 80,  y: 240 } },
      { id: "auth", label: "Supabase Auth", type: "auth", detail: "Row-level security policies",  metric: "JWT + RLS",  color: "linear-gradient(135deg,#10b981,#059669)", position: { x: 480, y: 240 } },
      { id: "db",   label: "PostgreSQL",  type: "db",   detail: "Connection pooling via PgBouncer", metric: "10k QPS",  color: "linear-gradient(135deg,#06b6d4,#0284c7)", position: { x: 80,  y: 360 } },
      { id: "cache",label: "Redis Cache", type: "metrics",detail: "Session + inventory cache",     metric: "99.9% hit", color: "linear-gradient(135deg,#f59e0b,#d97706)", position: { x: 480, y: 360 } },
      { id: "cloud",label: "AWS S3",      type: "cloud", detail: "Asset storage + CDN delivery",  metric: "< 5ms",     color: "linear-gradient(135deg,#64748b,#334155)", position: { x: 280, y: 480 } },
    ],
    edges: [
      { id: "e1", source: "cdn",  target: "app",   animated: true,  label: "HTTPS" },
      { id: "e2", source: "app",  target: "api",   animated: true  },
      { id: "e3", source: "app",  target: "auth",  animated: false },
      { id: "e4", source: "api",  target: "db",    animated: true,  label: "SQL" },
      { id: "e5", source: "api",  target: "cache", animated: true,  label: "Redis" },
      { id: "e6", source: "api",  target: "cloud", animated: false, label: "S3 SDK" },
    ],
  },
  {
    id: "aiplatform",
    title: "AI Document Processing Platform",
    description:
      "An intelligent document pipeline using vector embeddings and LLMs to process, classify, and extract insights from PDFs and images at enterprise scale.",
    tags: ["Python", "FastAPI", "Pinecone", "Gemini", "PostgreSQL"],
    nodes: [
      { id: "ui",      label: "Web UI",         type: "nextjs",  detail: "Drag-and-drop file interface",      metric: "React 19",   color: "linear-gradient(135deg,#7c3aed,#4f46e5)", position: { x: 280, y: 0   } },
      { id: "gateway", label: "API Gateway",    type: "api",     detail: "FastAPI + request validation",     metric: "< 30ms",    color: "linear-gradient(135deg,#8b5cf6,#6d28d9)", position: { x: 280, y: 120 } },
      { id: "embed",   label: "Embeddings",     type: "metrics", detail: "Gemini text-embedding-004",       metric: "1536 dims",  color: "linear-gradient(135deg,#f59e0b,#d97706)", position: { x: 80,  y: 240 } },
      { id: "vector",  label: "Pinecone",       type: "db",      detail: "ANN search < 20ms",               metric: "1M vectors", color: "linear-gradient(135deg,#06b6d4,#0284c7)", position: { x: 80,  y: 360 } },
      { id: "llm",     label: "Gemini Pro",     type: "cloud",   detail: "RAG-augmented generation",        metric: "gpt-4o quality", color: "linear-gradient(135deg,#64748b,#334155)", position: { x: 480, y: 240 } },
      { id: "store",   label: "PostgreSQL",     type: "db",      detail: "Structured metadata + audit log", metric: "ACID",       color: "linear-gradient(135deg,#10b981,#059669)", position: { x: 480, y: 360 } },
      { id: "queue",   label: "Job Queue",      type: "auth",    detail: "Async processing with retries",   metric: "Redis Streams", color: "linear-gradient(135deg,#ec4899,#be185d)", position: { x: 280, y: 480 } },
    ],
    edges: [
      { id: "e1", source: "ui",      target: "gateway", animated: true  },
      { id: "e2", source: "gateway", target: "embed",   animated: true,  label: "chunk" },
      { id: "e3", source: "embed",   target: "vector",  animated: true,  label: "upsert" },
      { id: "e4", source: "gateway", target: "llm",     animated: true,  label: "RAG" },
      { id: "e5", source: "vector",  target: "llm",     animated: true,  label: "context" },
      { id: "e6", source: "llm",     target: "store",   animated: false, label: "persist" },
      { id: "e7", source: "gateway", target: "queue",   animated: false, label: "async" },
    ],
  },
]

// ── Detail Panel ───────────────────────────────────────────────
function DetailPanel({ node, onClose }: { node: ArchNodeData; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2 }}
        className="absolute top-4 right-4 z-10 w-64 glass gradient-border rounded-xl p-4 shadow-xl"
      >
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: node.color }}
          >
            {iconMap[node.type] ?? <Zap className="w-4 h-4 text-white" />}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-1">{node.label}</h3>
        <p className="text-xs text-muted-foreground mb-3">{node.detail}</p>
        <div className="px-2 py-1 rounded-md bg-[var(--violet-muted)] border border-[var(--violet)]/20">
          <span className="text-xs font-mono text-[var(--violet)]">{node.metric}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Main Architecture Canvas Component ────────────────────────
export function ArchitectureCanvas({ project }: { project: Project }) {
  const [nodes, , onNodesChange] = useNodesState(
    project.nodes.map((n) => ({
      id: n.id,
      type: "arch",
      position: n.position,
      data: { label: n.label, type: n.type, detail: n.detail, metric: n.metric, color: n.color },
    }))
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    project.edges.map((e) => ({
      ...e,
      style: { stroke: "oklch(0.72 0.22 293 / 60%)", strokeWidth: 2 },
      labelStyle: { fill: "oklch(0.72 0.22 293)", fontSize: 10, fontWeight: 600 },
      labelBgStyle: { fill: "oklch(0.14 0.03 280)", fillOpacity: 0.8 },
    }))
  )
  const [selectedNode, setSelectedNode] = useState<ArchNodeData | null>(null)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-border/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => setSelectedNode(node.data as ArchNodeData)}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        className="bg-transparent"
        colorMode="dark"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="oklch(1 0 0 / 6%)" />
        <Controls className="[&>button]:bg-card [&>button]:border-border [&>button]:text-foreground [&>button:hover]:bg-muted" />
        <MiniMap
          className="!bg-card !border-border"
          nodeColor="oklch(0.72 0.22 293 / 60%)"
          maskColor="oklch(0.10 0.02 280 / 80%)"
        />
      </ReactFlow>
      {selectedNode && (
        <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  )
}

export { projects }
