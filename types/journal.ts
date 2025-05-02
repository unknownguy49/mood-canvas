export interface JournalEntry {
  id: string
  content: string
  timestamp: string
  mood?: MoodEntry
}

export interface MoodEntry {
  id: string
  timestamp: string
  primary: string
  score: number
  secondary: string[]
  color: string
}

export interface DailyPrompt {
  id: string
  text: string
  moodCategory: string
}

export interface Quote {
  id: string
  text: string
  author: string
  moodCategory: string
}

export interface MentalHealthTip {
  id: string
  text: string
  moodCategory: string
}

export type MoodCategory = "joy" | "sadness" | "anxiety" | "anger" | "surprise" | "neutral"

export interface WeeklyMoodData {
  day: string
  joy: number
  sadness: number
  anxiety: number
  anger: number
  surprise: number
}
