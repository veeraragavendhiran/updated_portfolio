"use client"

import { motion, Variants } from "framer-motion"
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Trophy, 
  BookOpen, 
  ExternalLink,
  Code,
  Terminal,
  Cpu
} from "lucide-react"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export function StudentSections() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Education */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
            <GraduationCap className="w-5 h-5 text-violet-400" />
          </div>
          <h2 className="text-3xl font-bold">Education</h2>
        </div>
        <motion.div variants={item} className="glass gradient-border p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <GraduationCap className="w-24 h-24 text-violet-400" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">University Name Institute of Technology</h3>
                <p className="text-lg font-medium text-violet-400 mt-1">B.Tech in Computer Science & Engineering</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-bold">
                  CGPA: 9.0 / 10
                </span>
                <p className="text-sm text-muted-foreground mt-2">Class of 2026</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Machine Learning.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Internships / Experience */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <Briefcase className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold">Experience</h2>
        </div>
        <div className="grid gap-6">
          <motion.div variants={item} className="glass gradient-border p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">Software Engineering Intern</h3>
                <p className="text-[var(--cyan)] font-medium">Tech Startup Inc.</p>
              </div>
              <p className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border/50">
                May 2024 - July 2024
              </p>
            </div>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Developed and deployed a RESTful API using Node.js and Express, improving data retrieval speeds by 20%.</li>
              <li>Integrated a real-time chat feature into the company&apos;s internal dashboard using Socket.io.</li>
              <li>Collaborated closely with the UI/UX team to implement responsive frontend components using React.</li>
            </ul>
          </motion.div>
          
          <motion.div variants={item} className="glass gradient-border p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">Freelance Web Developer</h3>
                <p className="text-[var(--cyan)] font-medium">Self-Employed</p>
              </div>
              <p className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border/50">
                2023 - Present
              </p>
            </div>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Built 5+ modern, responsive landing pages for local businesses using Next.js and Tailwind CSS.</li>
              <li>Optimized web vitals, achieving a 95+ score on Lighthouse for mobile performance.</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <Award className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-3xl font-bold">Certifications</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Jan 2024" },
            { title: "Meta Front-End Developer", issuer: "Coursera", date: "Nov 2023" },
            { title: "Complete Web Development Bootcamp", issuer: "Udemy", date: "Aug 2023" },
            { title: "Data Structures in Python", issuer: "NPTEL", date: "May 2023" },
          ].map((cert, i) => (
            <motion.div key={i} variants={item} className="glass gradient-border p-5 rounded-2xl flex flex-col h-full group hover:bg-muted/10 transition-colors">
              <h3 className="font-bold text-foreground mb-1 leading-snug">{cert.title}</h3>
              <p className="text-sm text-orange-400 font-medium mb-3">{cert.issuer}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{cert.date}</span>
                <a href="#" className="text-xs font-medium flex items-center gap-1 text-foreground hover:text-orange-400 transition-colors">
                  View Certificate <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hackathons & Achievements */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
            <Trophy className="w-5 h-5 text-pink-400" />
          </div>
          <h2 className="text-3xl font-bold">Achievements & Hackathons</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div variants={item} className="flex items-start gap-4 glass gradient-border p-5 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0 border border-pink-500/20">
              <Trophy className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">1st Runner Up - National Level Hackathon</h3>
              <p className="text-sm text-pink-400 font-medium mb-2">HackIndia 2024</p>
              <p className="text-sm text-muted-foreground">Built an AI-powered accessibility tool for visually impaired users. Won a cash prize of $500.</p>
            </div>
          </motion.div>
          <motion.div variants={item} className="flex items-start gap-4 glass gradient-border p-5 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0 border border-pink-500/20">
              <BookOpen className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Paper Presentation Winner</h3>
              <p className="text-sm text-pink-400 font-medium mb-2">TechFest Symposium</p>
              <p className="text-sm text-muted-foreground">Presented a research paper on &quot;Optimizing Vector Databases for RAG Pipelines&quot;.</p>
            </div>
          </motion.div>
          <motion.div variants={item} className="flex items-start gap-4 glass gradient-border p-5 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border/50">
              <Code className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Participant</h3>
              <p className="text-sm text-muted-foreground font-medium mb-2">Global Code Challenge</p>
              <p className="text-sm text-muted-foreground">Solved 4 complex algorithmic challenges within a strict 12-hour timeframe.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interests / What I'm Learning */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
            <Terminal className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold">What I&apos;m Learning</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item} className="glass gradient-border p-5 rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-transform">
            <Cpu className="w-5 h-5 text-green-400" />
            <span className="font-medium text-sm">Machine Learning for Agriculture</span>
          </motion.div>
          <motion.div variants={item} className="glass gradient-border p-5 rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-transform">
            <Code className="w-5 h-5 text-green-400" />
            <span className="font-medium text-sm">React Native Mobile Apps</span>
          </motion.div>
          <motion.div variants={item} className="glass gradient-border p-5 rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-transform">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="font-medium text-sm">Rust Programming Language</span>
          </motion.div>
          <motion.div variants={item} className="glass gradient-border p-5 rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-transform">
            <Trophy className="w-5 h-5 text-green-400" />
            <span className="font-medium text-sm">System Design Architecture</span>
          </motion.div>
        </div>
      </motion.div>

    </section>
  )
}
