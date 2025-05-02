"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useMood } from "@/context/mood-context"
import { Quote } from "lucide-react"

type Bubble = {
  id: number
  size: number
  x: number
  y: number
  delay: number
  duration: number
}

export function MoodVisualizer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { latestMood, dailyQuote } = useMood()

  const defaultMood = {
    primary: "Neutral",
    score: 0.5,
    secondary: ["Calm", "Balanced"],
    color: "#A9A9A9",
  }

  const moodData = latestMood || defaultMood

  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    const bubbleCount = 30
    const newBubbles: Bubble[] = Array.from({ length: bubbleCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }))
    setBubbles(newBubbles)
  }, [])

  return (
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 bg-gradient-to-b from-deep-purple-900/0 via-yellow-500/10 to-deep-purple-900/0"
        style={{ opacity: 0.3 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-300">
            Your Mood Visualized
          </h2>
          <p className="text-xl text-amber-100/80 max-w-3xl mx-auto">
            See your emotions come to life with dynamic visualizations.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div
            className="flex-1 relative h-[400px] rounded-2xl overflow-hidden border border-yellow-500/30 bg-gradient-to-br from-deep-purple-900/50 to-amber-900/30 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            {bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                className="absolute rounded-full backdrop-blur-sm"
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  background: `radial-gradient(circle at 30% 30%, ${moodData.color}66, ${moodData.color}44)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        scale: [0, 1, 0.8, 1],
                        opacity: [0, 0.7, 0.5, 0.7],
                        x: [0, -20, 20, 0],
                        y: [0, 20, -20, 0],
                      }
                    : {}
                }
                transition={{
                  duration: bubble.duration,
                  delay: bubble.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}

            <motion.div
              className="absolute inset-0 flex items-center justify-center flex-col text-center p-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="text-7xl font-bold mb-2"
                style={{ color: moodData.color }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {moodData.primary}
              </motion.div>
              <div className="text-xl text-amber-200/80 mb-4">
                {moodData.secondary.join(" • ")}
              </div>
              <div className="w-32 h-4 bg-deep-purple-800/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{
                    background: `linear-gradient(to right, ${moodData.color}, ${moodData.color}CC)`,
                  }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${moodData.score * 100}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
              <div className="mt-2 text-amber-200/80">
                Intensity: {Math.round(moodData.score * 100)}%
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 md:pl-8"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold mb-4" style={{ color: moodData.color }}>
              Understanding Your {moodData.primary}
            </h3>
            <p className="text-lg text-amber-100/80 mb-6">
              {moodData.primary === "Neutral"
                ? "Your journal entries suggest a balanced emotional state. This neutral mood is characterized by feelings of calmness, stability, and emotional balance."
                : `Your journal entries reveal a strong sense of ${moodData.primary.toLowerCase()}. This emotional state is characterized by feelings of ${moodData.secondary.join(", ").toLowerCase()}.`}
            </p>

            <div className="bg-deep-purple-800/30 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20 mb-6">
              <div className="flex items-start mb-2">
                <Quote className="w-6 h-6 mr-2 flex-shrink-0 text-amber-300" />
                <div>
                  <p className="text-amber-100/90 italic mb-2">{dailyQuote.text}</p>
                  <p className="text-amber-100/70 text-right">— {dailyQuote.author}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-deep-purple-800/30 backdrop-blur-sm p-4 rounded-xl border border-yellow-500/20">
                <h4 className="font-semibold text-yellow-300 mb-1">Potential Triggers</h4>
                <p className="text-amber-100/70">
                  {moodData.primary === "Joy" && "Recent achievements, social connections, or positive life changes"}
                  {moodData.primary === "Sadness" && "Disappointments, losses, or unmet expectations"}
                  {moodData.primary === "Anxiety" && "Uncertainty, upcoming challenges, or perceived threats"}
                  {moodData.primary === "Anger" && "Frustrations, perceived injustices, or unmet needs"}
                  {moodData.primary === "Surprise" && "Unexpected events, new information, or sudden changes"}
                  {moodData.primary === "Neutral" && "Routine activities, familiar environments, or balanced lifestyle"}
                </p>
              </div>
              <div className="bg-deep-purple-800/30 backdrop-blur-sm p-4 rounded-xl border border-yellow-500/20">
                <h4 className="font-semibold text-yellow-300 mb-1">Suggested Activities</h4>
                <p className="text-amber-100/70">
                  {moodData.primary === "Joy" && "Creative expression, sharing your positivity, or setting new goals"}
                  {moodData.primary === "Sadness" && "Self-care, gentle movement, or connecting with supportive people"}
                  {moodData.primary === "Anxiety" &&
                    "Deep breathing, mindfulness practices, or breaking tasks into smaller steps"}
                  {moodData.primary === "Anger" && "Physical activity, journaling, or constructive communication"}
                  {moodData.primary === "Surprise" && "Reflection, adaptation, or exploring new opportunities"}
                  {moodData.primary === "Neutral" && "Maintaining routines, mindfulness practice, or gentle challenges"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
