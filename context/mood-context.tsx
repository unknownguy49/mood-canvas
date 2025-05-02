"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { JournalEntry, MoodEntry, MoodCategory, WeeklyMoodData } from "@/types/journal"
import {
  getJournalEntries,
  getMoodData,
  saveJournalEntry,
  saveMoodData,
  getWeeklyMoodData,
  getLatestMood,
} from "@/services/journal-service"
import { analyzeSentiment } from "@/services/sentiment-service"
import { getDailyPrompt, getQuote, getMentalHealthTips } from "@/services/content-service"

interface MoodContextType {
  journalEntries: JournalEntry[]
  moodData: MoodEntry[]
  weeklyMoodData: WeeklyMoodData[]
  latestMood: MoodEntry | null
  isAnalyzing: boolean
  dailyPrompt: string
  dailyQuote: { text: string; author: string }
  mentalHealthTips: string[]
  analyzeJournalEntry: (text: string) => Promise<void>
  refreshDailyContent: () => void
}

const MoodContext = createContext<MoodContextType | undefined>(undefined)

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [moodData, setMoodData] = useState<MoodEntry[]>([])
  const [weeklyMoodData, setWeeklyMoodData] = useState<WeeklyMoodData[]>([])
  const [latestMood, setLatestMood] = useState<MoodEntry | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [dailyPrompt, setDailyPrompt] = useState("")
  const [dailyQuote, setDailyQuote] = useState({ text: "", author: "" })
  const [mentalHealthTips, setMentalHealthTips] = useState<string[]>([])

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadData = () => {
      const entries = getJournalEntries()
      const moods = getMoodData()
      const latest = getLatestMood()

      setJournalEntries(entries)
      setMoodData(moods)
      setLatestMood(latest)

      // Process weekly mood data
      processWeeklyMoodData()

      // Set daily content based on latest mood
      refreshDailyContent(latest?.primary.toLowerCase() as MoodCategory)
    }

    loadData()
  }, [])

  // Process weekly mood data for the chart
  const processWeeklyMoodData = () => {
    const weeklyData = getWeeklyMoodData()

    // If no data, create empty dataset
    if (weeklyData.length === 0) {
      const emptyData: WeeklyMoodData[] = []
      const today = new Date()

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const day = date.toLocaleDateString("en-US", { weekday: "short" })

        emptyData.push({
          day,
          joy: 0,
          sadness: 0,
          anxiety: 0,
          anger: 0,
          surprise: 0,
        })
      }

      setWeeklyMoodData(emptyData)
      return
    }

    // Group entries by day
    const groupedByDay: Record<string, MoodEntry[]> = {}

    weeklyData.forEach((entry) => {
      const date = new Date(entry.timestamp)
      const day = date.toLocaleDateString("en-US", { weekday: "short" })

      if (!groupedByDay[day]) {
        groupedByDay[day] = []
      }

      groupedByDay[day].push(entry)
    })

    // Create data for the last 7 days
    const chartData: WeeklyMoodData[] = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const day = date.toLocaleDateString("en-US", { weekday: "short" })

      const dayEntries = groupedByDay[day] || []

      // Calculate average mood scores for the day
      const moodScores = {
        joy: 0,
        sadness: 0,
        anxiety: 0,
        anger: 0,
        surprise: 0,
      }

      dayEntries.forEach((entry) => {
        const primary = entry.primary.toLowerCase()
        if (primary === "joy") moodScores.joy += entry.score
        else if (primary === "sadness") moodScores.sadness += entry.score
        else if (primary === "anxiety") moodScores.anxiety += entry.score
        else if (primary === "anger") moodScores.anger += entry.score
        else if (primary === "surprise") moodScores.surprise += entry.score
      })

      // If we have entries for this day, calculate averages
      if (dayEntries.length > 0) {
        Object.keys(moodScores).forEach((key) => {
          moodScores[key as keyof typeof moodScores] /= dayEntries.length
        })
      }

      chartData.push({
        day,
        ...moodScores,
      })
    }

    setWeeklyMoodData(chartData)
  }

  // Refresh daily content based on mood
  const refreshDailyContent = (moodCategory: MoodCategory = "neutral") => {
    const prompt = getDailyPrompt(moodCategory)
    const quote = getQuote(moodCategory)
    const tips = getMentalHealthTips(moodCategory, 3)

    setDailyPrompt(prompt.text)
    setDailyQuote({ text: quote.text, author: quote.author })
    setMentalHealthTips(tips.map((tip) => tip.text))
  }

  // Analyze a journal entry
  const analyzeJournalEntry = async (text: string) => {
    if (!text.trim()) return

    setIsAnalyzing(true)

    try {
      // Analyze sentiment
      const moodResult = await analyzeSentiment(text)

      // Create journal entry
      const journalEntry: JournalEntry = {
        id: Math.random().toString(36).substring(2, 15),
        content: text,
        timestamp: new Date().toISOString(),
        mood: moodResult,
      }

      // Save data
      saveJournalEntry(journalEntry)
      saveMoodData(moodResult)

      // Update state
      setJournalEntries([...journalEntries, journalEntry])
      setMoodData([...moodData, moodResult])
      setLatestMood(moodResult)

      // Update weekly data
      processWeeklyMoodData()

      // Refresh daily content based on new mood
      refreshDailyContent(moodResult.primary.toLowerCase() as MoodCategory)
    } catch (error) {
      console.error("Error analyzing journal entry:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const value = {
    journalEntries,
    moodData,
    weeklyMoodData,
    latestMood,
    isAnalyzing,
    dailyPrompt,
    dailyQuote,
    mentalHealthTips,
    analyzeJournalEntry,
    refreshDailyContent,
  }

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>
}

export const useMood = () => {
  const context = useContext(MoodContext)
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider")
  }
  return context
}
