import { GoogleGenerativeAI } from "@google/generative-ai"
import { Pinecone } from "@pinecone-database/pinecone"
import { NextRequest } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! })

const PORTFOLIO_CONTEXT = `
You are an AI assistant for a software engineer's portfolio. You represent them professionally and helpfully.

Portfolio Owner: Full-Stack Engineer specializing in Next.js, TypeScript, PostgreSQL, Redis, and AI/ML integrations.
Key Skills: System architecture, performance optimization, real-time systems, vector databases, LLM integration.
Projects: E-Commerce Platform (10k+ concurrent users, <100ms API), AI Document Processing Platform (Pinecone + Gemini).
Experience: 3+ years building production-grade applications. Strong focus on Core Web Vitals and developer experience.
Contact: Available for new opportunities. Reach via LinkedIn or email.

Always be helpful, professional, and technically accurate. If asked to download a resume, respond with: "You can download the resume at /resume.pdf".
`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1]?.content ?? ""

    // Try to get relevant context from Pinecone (if vectors are seeded)
    let ragContext = ""
    try {
      const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" })
      const embedResult = await embedModel.embedContent(userMessage)
      const embedding = embedResult.embedding.values

      const index = pinecone.index("portfolio-index")
      const queryResult = await index.query({
        vector: embedding,
        topK: 3,
        includeMetadata: true,
      })

      ragContext = queryResult.matches
        .map((m) => m.metadata?.text ?? "")
        .filter(Boolean)
        .join("\n\n")
    } catch {
      // Pinecone not seeded yet — fall back to static context
    }

    const systemPrompt = PORTFOLIO_CONTEXT + (ragContext ? `\n\nRelevant context:\n${ragContext}` : "")

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt,
    })

    // Convert message history for Gemini
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }))

    const chat = model.startChat({ history })
    const result = await chat.sendMessageStream(userMessage)

    // Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) controller.enqueue(new TextEncoder().encode(text))
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch (err) {
    console.error("[AI Chat Error]", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}
