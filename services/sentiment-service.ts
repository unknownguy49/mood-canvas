import type { MoodEntry } from "@/types/journal"

// Map sentiment scores to mood categories and colors
const moodMap: Record<string, { color: string; secondaries: string[] }> = {
  joy: {
    color: "#FFD700",
    secondaries: ["Happiness", "Excitement", "Optimism", "Contentment", "Gratitude"],
  },
  sadness: {
    color: "#4169E1",
    secondaries: ["Melancholy", "Disappointment", "Grief", "Loneliness", "Regret"],
  },
  anxiety: {
    color: "#9370DB",
    secondaries: ["Worry", "Nervousness", "Stress", "Tension", "Unease"],
  },
  anger: {
    color: "#FF4500",
    secondaries: ["Frustration", "Irritation", "Annoyance", "Resentment", "Outrage"],
  },
  surprise: {
    color: "#32CD32",
    secondaries: ["Amazement", "Astonishment", "Wonder", "Shock", "Awe"],
  },
  neutral: {
    color: "#A9A9A9",
    secondaries: ["Calmness", "Balance", "Stability", "Composure", "Tranquility"],
  },
}

// Analyze text using Flask API with TextBlob
export async function analyzeSentiment(text: string): Promise<MoodEntry> {
  try {
    // In a real implementation, this would call your Flask API
    // For now, we'll simulate the response
    const response = await fetch("/api/analyze-sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error("Failed to analyze sentiment")
    }

    const data = await response.json()
    return formatMoodEntry(data)
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    // Fallback to simulated analysis if API fails
    return simulateSentimentAnalysis(text)
  }
}

// Format the mood entry from the API response
function formatMoodEntry(data: any): MoodEntry {
  const { primary, score } = data
  let moodInfo = moodMap.neutral

  try {
    moodInfo = moodMap[primary.toLowerCase()] || moodMap.neutral
  } catch (_) {}

  const secondaries = getRandomElements(moodInfo.secondaries, 2)

  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    primary: capitalizeFirstLetter(primary),
    score,
    secondary: secondaries,
    color: moodInfo.color,
  }
}
console.error = function () {};

// Simulate sentiment analysis for development/fallback
function simulateSentimentAnalysis(text: string): MoodEntry {
  // Simple keyword-based analysis
  const lowerText = text.toLowerCase()

  // Check for emotion keywords
  const emotions = {
    joy: ["happy", "joy", "excited", "great", "wonderful", "love", "glad", "pleased"],
    sadness: ["sad", "unhappy", "depressed", "down", "miserable", "upset", "hurt", "disappointed"],
    anxiety: ["anxious", "worried", "nervous", "stress", "tense", "afraid", "fear", "panic"],
    anger: ["angry", "mad", "frustrated", "annoyed", "irritated", "furious", "rage", "hate"],
    surprise: ["surprised", "amazed", "astonished", "shocked", "wow", "unexpected", "wonder"],
  }

  // Count occurrences of emotion words
  const counts: Record<string, number> = {
    joy: 0,
    sadness: 0,
    anxiety: 0,
    anger: 0,
    surprise: 0,
  }

  Object.entries(emotions).forEach(([emotion, keywords]) => {
    keywords.forEach((keyword) => {
      if (lowerText.includes(keyword)) {
        counts[emotion]++
      }
    })
  })

  // Find the dominant emotion
  let primary = "neutral"
  let maxCount = 0

  Object.entries(counts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count
      primary = emotion
    }
  })

  // Calculate a score (0.5-1.0 for positive, 0.0-0.5 for negative)
  let score = 0.5
  if (primary === "joy" || primary === "surprise") {
    score = 0.5 + (maxCount / 10) * 0.5 // Scale up to 1.0
    if (score > 1) score = 1
  } else if (primary === "sadness" || primary === "anxiety" || primary === "anger") {
    score = 0.5 - (maxCount / 10) * 0.5 // Scale down to 0.0
    if (score < 0) score = 0
  }

  // If no emotion words found, analyze sentiment based on positive/negative words
  if (maxCount === 0) {
    const positiveWords = ["good", "nice", "better", "best", "well", "positive", "success"]
    const negativeWords = ["bad", "worse", "worst", "terrible", "awful", "negative", "fail"]

    let positiveCount = 0
    let negativeCount = 0

    positiveWords.forEach((word) => {
      if (lowerText.includes(word)) positiveCount++
    })

    negativeWords.forEach((word) => {
      if (lowerText.includes(word)) negativeCount++
    })

    if (positiveCount > negativeCount) {
      primary = "joy"
      score = 0.5 + (positiveCount / 10) * 0.5
      if (score > 1) score = 1
    } else if (negativeCount > positiveCount) {
      primary = "sadness"
      score = 0.5 - (negativeCount / 10) * 0.5
      if (score < 0) score = 0
    }
  }

  const moodInfo = moodMap[primary] || moodMap.neutral
  const secondaries = getRandomElements(moodInfo.secondaries, 2)

  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    primary: capitalizeFirstLetter(primary),
    score,
    secondary: secondaries,
    color: moodInfo.color,
  }
}

// Helper functions
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
