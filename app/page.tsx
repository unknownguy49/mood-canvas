import { MoodJournal } from "@/components/mood-journal"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { MoodVisualizer } from "@/components/mood-visualizer"
import { TrendAnalysis } from "@/components/trend-analysis"
import { Footer } from "@/components/footer"
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-deep-purple-950 via-deep-purple-900 to-teal-900 text-white">
      <Hero />
      <Features />
      <MoodJournal />
      <MoodVisualizer />
      <TrendAnalysis />
      <Footer />
    </main>
  )
}
