import type { MoodEntry, JournalEntry } from "@/types/journal"

// LocalStorage keys
const JOURNAL_ENTRIES_KEY = "moodcanvas_journal_entries"
const MOOD_DATA_KEY = "moodcanvas_mood_data"

// Get all journal entries
export const getJournalEntries = (): JournalEntry[] => {
  if (typeof window === "undefined") return []

  const entriesJson = localStorage.getItem(JOURNAL_ENTRIES_KEY)
  return entriesJson ? JSON.parse(entriesJson) : []
}

// Save a journal entry
export const saveJournalEntry = (entry: JournalEntry): void => {
  const entries = getJournalEntries()
  entries.push(entry)
  localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(entries))
}

// Get all mood data
export const getMoodData = (): MoodEntry[] => {
  if (typeof window === "undefined") return []

  const moodDataJson = localStorage.getItem(MOOD_DATA_KEY)
  return moodDataJson ? JSON.parse(moodDataJson) : []
}

// Save mood data
export const saveMoodData = (moodData: MoodEntry): void => {
  const allMoodData = getMoodData()
  allMoodData.push(moodData)
  localStorage.setItem(MOOD_DATA_KEY, JSON.stringify(allMoodData))
}

// Get mood data for the last 7 days
export const getWeeklyMoodData = (): MoodEntry[] => {
  const allMoodData = getMoodData()
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  return allMoodData
    .filter((entry) => new Date(entry.timestamp) >= oneWeekAgo)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

// Get the most recent mood entry
export const getLatestMood = (): MoodEntry | null => {
  const allMoodData = getMoodData()
  if (allMoodData.length === 0) return null

  return allMoodData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
}

// Clear all data (for testing)
export const clearAllData = (): void => {
  localStorage.removeItem(JOURNAL_ENTRIES_KEY)
  localStorage.removeItem(MOOD_DATA_KEY)
}
