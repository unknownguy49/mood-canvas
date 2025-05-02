"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMood } from "@/context/mood-context"

export function TrendAnalysis() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { weeklyMoodData, mentalHealthTips } = useMood()

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-teal-300">
            Your Emotional Journey
          </h2>
          <p className="text-xl text-teal-100/80 max-w-3xl mx-auto">
            Track your mood patterns over time to gain deeper insights.
          </p>
        </motion.div>

        <motion.div
          className="bg-deep-purple-800/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-violet-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Weekly Mood Trends</h3>

          <div className="h-[400px] w-full">
            <ChartContainer
              config={{
                joy: {
                  label: "Joy",
                  color: "hsl(45, 100%, 50%)",
                },
                sadness: {
                  label: "Sadness",
                  color: "hsl(210, 100%, 60%)",
                },
                anxiety: {
                  label: "Anxiety",
                  color: "hsl(270, 70%, 60%)",
                },
                anger: {
                  label: "Anger",
                  color: "hsl(0, 100%, 60%)",
                },
                surprise: {
                  label: "Surprise",
                  color: "hsl(150, 100%, 45%)",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyMoodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                  <YAxis
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: "rgba(255,255,255,0.7)" }}
                    domain={[0, 1]}
                    tickFormatter={(value) => `${value * 100}%`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="joy"
                    stroke="var(--color-joy)"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#1a1a2e" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sadness"
                    stroke="var(--color-sadness)"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#1a1a2e" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="anxiety"
                    stroke="var(--color-anxiety)"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#1a1a2e" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="anger"
                    stroke="var(--color-anger)"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#1a1a2e" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="surprise"
                    stroke="var(--color-surprise)"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#1a1a2e" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-violet-300">Personalized Mental Health Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mentalHealthTips.map((tip, index) => (
                <motion.div
                  key={index}
                  className="bg-deep-purple-900/50 p-4 rounded-xl border border-violet-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <p className="text-teal-100/70">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
