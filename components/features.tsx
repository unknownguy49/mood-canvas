"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, TrendingUp, Lock, FileText } from "lucide-react"

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-violet-400" />,
      title: "AI Sentiment Analysis",
      description:
        "Our AI analyzes your journal entries to detect emotions and mood patterns without requiring structured inputs.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-teal-400" />,
      title: "Mood Visualization",
      description:
        "See your emotional journey through beautiful, interactive visualizations that bring your feelings to life.",
    },
    {
      icon: <Lock className="w-12 h-12 text-pink-400" />,
      title: "Privacy-Focused",
      description:
        "Your journal entries are stored locally or in encrypted cloud storage, ensuring your thoughts remain private.",
    },
    {
      icon: <FileText className="w-12 h-12 text-amber-400" />,
      title: "Natural Journaling",
      description: "Write freely in your own words. No structured forms or forced emotion selections.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/30 to-transparent opacity-40" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-teal-300">
            How MoodCanvas Works
          </h2>
          <p className="text-xl text-teal-100/80 max-w-3xl mx-auto">
            Combining AI technology with emotional well-being to help you understand your mood patterns.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-deep-purple-800/40 backdrop-blur-sm p-8 rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-glow-sm group"
            >
              <div className="mb-4 p-3 inline-block rounded-xl bg-gradient-to-br from-deep-purple-700 to-deep-purple-900 group-hover:from-violet-700 group-hover:to-indigo-900 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-teal-100/70 group-hover:text-teal-100/90 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
