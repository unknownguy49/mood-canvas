"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles } from "lucide-react"
import { useMood } from "@/context/mood-context"

export function MoodJournal() {
  const [journalEntry, setJournalEntry] = useState("")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { analyzeJournalEntry, isAnalyzing, dailyPrompt } = useMood()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!journalEntry.trim() || isAnalyzing) return

    await analyzeJournalEntry(journalEntry)
    setJournalEntry("")
  }

  return (
    <section id="journal" className="py-20 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-teal-300">
            Express Yourself
          </h2>
          <p className="text-xl text-teal-100/80 max-w-3xl mx-auto">
            Write freely about your day, thoughts, or feelings. Our AI will analyze your mood.
          </p>
        </motion.div>

        <motion.div
          className="bg-deep-purple-800/30 backdrop-blur-sm p-6 rounded-2xl border border-violet-500/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-violet-300">Today's Prompt</h3>
          <p className="text-teal-100/90 italic">{dailyPrompt || "How are you feeling today?"}</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-deep-purple-800/30 backdrop-blur-sm p-8 rounded-2xl border border-violet-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative mb-4">
            <Textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="How are you feeling today? Write as much or as little as you'd like..."
              className="min-h-[200px] w-full bg-deep-purple-950/50 border-violet-500/30 focus:border-violet-400 text-white placeholder:text-violet-300/50 rounded-xl p-4 resize-none"
            />

            <motion.div
              className="absolute top-3 right-3 text-violet-300/50"
              animate={{
                opacity: journalEntry.length > 0 ? 0 : [0.5, 0.8, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
              }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!journalEntry.trim() || isAnalyzing}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-glow flex items-center gap-2 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100"
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Mood
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
