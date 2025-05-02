import type { DailyPrompt, Quote, MentalHealthTip, MoodCategory } from "@/types/journal"

// Sample prompts for different mood categories
const prompts: DailyPrompt[] = [
  // Joy prompts
  { id: "1", text: "What made you smile today?", moodCategory: "joy" },
  { id: "2", text: "Describe a moment that brought you happiness recently.", moodCategory: "joy" },
  { id: "3", text: "What are three things you're grateful for right now?", moodCategory: "joy" },
  { id: "4", text: "How can you share your positive energy with others today?", moodCategory: "joy" },

  // Sadness prompts
  { id: "5", text: "What's weighing on your mind today?", moodCategory: "sadness" },
  { id: "6", text: "What would help you feel more supported right now?", moodCategory: "sadness" },
  { id: "7", text: "Is there something you need to let go of?", moodCategory: "sadness" },
  { id: "8", text: "What small step could you take to feel better today?", moodCategory: "sadness" },

  // Anxiety prompts
  { id: "9", text: "What's one worry you can set aside today?", moodCategory: "anxiety" },
  { id: "10", text: "What helps you feel grounded when you're anxious?", moodCategory: "anxiety" },
  { id: "11", text: "What's one thing within your control right now?", moodCategory: "anxiety" },
  { id: "12", text: "What would you tell a friend who was feeling this way?", moodCategory: "anxiety" },

  // Anger prompts
  { id: "13", text: "What's triggering your frustration today?", moodCategory: "anger" },
  { id: "14", text: "How can you channel this energy constructively?", moodCategory: "anger" },
  { id: "15", text: "What boundary might need to be set or reinforced?", moodCategory: "anger" },
  { id: "16", text: "What would help you feel more at peace right now?", moodCategory: "anger" },

  // Surprise prompts
  { id: "17", text: "What unexpected thing happened recently?", moodCategory: "surprise" },
  { id: "18", text: "How did this surprise change your perspective?", moodCategory: "surprise" },
  { id: "19", text: "What new opportunity might this present?", moodCategory: "surprise" },

  // Neutral prompts
  { id: "20", text: "How would you describe your energy level today?", moodCategory: "neutral" },
  { id: "21", text: "What's one thing you'd like to accomplish today?", moodCategory: "neutral" },
  { id: "22", text: "What's something you're looking forward to?", moodCategory: "neutral" },
  { id: "23", text: "How are you taking care of yourself today?", moodCategory: "neutral" },
]

// Sample quotes for different mood categories
const quotes: Quote[] = [
  // Joy quotes
  {
    id: "1",
    text: "Happiness is not something ready-made. It comes from your own actions.",
    author: "Dalai Lama",
    moodCategory: "joy",
  },
  {
    id: "2",
    text: "The most wasted of all days is one without laughter.",
    author: "E.E. Cummings",
    moodCategory: "joy",
  },
  { id: "3", text: "Joy is the simplest form of gratitude.", author: "Karl Barth", moodCategory: "joy" },

  // Sadness quotes
  {
    id: "4",
    text: "The way I see it, if you want the rainbow, you gotta put up with the rain.",
    author: "Dolly Parton",
    moodCategory: "sadness",
  },
  {
    id: "5",
    text: "There is no point treating a depressed person as though she were just feeling sad, saying, 'There now, hang on, you'll get over it.' Sadness is more or less like a head cold - with patience, it passes. Depression is like cancer.",
    author: "Barbara Kingsolver",
    moodCategory: "sadness",
  },
  {
    id: "6",
    text: "The word 'happy' would lose its meaning if it were not balanced by sadness.",
    author: "Carl Jung",
    moodCategory: "sadness",
  },

  // Anxiety quotes
  {
    id: "7",
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
    moodCategory: "anxiety",
  },
  { id: "8", text: "Anxiety is the dizziness of freedom.", author: "Søren Kierkegaard", moodCategory: "anxiety" },
  {
    id: "9",
    text: "Nothing diminishes anxiety faster than action.",
    author: "Walter Anderson",
    moodCategory: "anxiety",
  },

  // Anger quotes
  {
    id: "10",
    text: "For every minute you remain angry, you give up sixty seconds of peace of mind.",
    author: "Ralph Waldo Emerson",
    moodCategory: "anger",
  },
  {
    id: "11",
    text: "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.",
    author: "Mark Twain",
    moodCategory: "anger",
  },
  {
    id: "12",
    text: "Speak when you are angry and you will make the best speech you will ever regret.",
    author: "Ambrose Bierce",
    moodCategory: "anger",
  },

  // Surprise quotes
  {
    id: "13",
    text: "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.",
    author: "Albert Einstein",
    moodCategory: "surprise",
  },
  {
    id: "14",
    text: "Life is full of surprises and serendipity. Being open to unexpected turns in the road is an important part of success.",
    author: "Condoleezza Rice",
    moodCategory: "surprise",
  },

  // Neutral quotes
  {
    id: "15",
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    author: "Thich Nhat Hanh",
    moodCategory: "neutral",
  },
  {
    id: "16",
    text: "Life isn't about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw",
    moodCategory: "neutral",
  },
  {
    id: "17",
    text: "The meaning of life is to find your gift. The purpose of life is to give it away.",
    author: "Pablo Picasso",
    moodCategory: "neutral",
  },
]

// Sample mental health tips for different mood categories
const mentalHealthTips: MentalHealthTip[] = [
  // Joy tips
  {
    id: "1",
    text: "Share your positive feelings with others to amplify your joy and spread happiness.",
    moodCategory: "joy",
  },
  {
    id: "2",
    text: "Practice gratitude daily to maintain your positive outlook and emotional well-being.",
    moodCategory: "joy",
  },
  { id: "3", text: "Channel your positive energy into creative pursuits or helping others.", moodCategory: "joy" },

  // Sadness tips
  {
    id: "4",
    text: "Allow yourself to feel sad without judgment. Emotions are temporary and will pass with time.",
    moodCategory: "sadness",
  },
  {
    id: "5",
    text: "Reach out to a trusted friend or family member. Connection can help during difficult times.",
    moodCategory: "sadness",
  },
  {
    id: "6",
    text: "Practice self-compassion and treat yourself with the same kindness you would offer a friend.",
    moodCategory: "sadness",
  },

  // Anxiety tips
  {
    id: "7",
    text: "Try the 5-4-3-2-1 grounding technique: acknowledge 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.",
    moodCategory: "anxiety",
  },
  {
    id: "8",
    text: "Practice deep breathing: inhale for 4 counts, hold for 7, exhale for 8. Repeat several times.",
    moodCategory: "anxiety",
  },
  {
    id: "9",
    text: "Break large tasks into smaller, manageable steps to reduce feeling overwhelmed.",
    moodCategory: "anxiety",
  },

  // Anger tips
  {
    id: "10",
    text: "Take a timeout before responding. Count to 10 or walk away until you feel calmer.",
    moodCategory: "anger",
  },
  {
    id: "11",
    text: "Express your feelings assertively, not aggressively. Use 'I' statements to communicate your needs.",
    moodCategory: "anger",
  },
  {
    id: "12",
    text: "Physical activity can help release tension. Try a brisk walk or other exercise.",
    moodCategory: "anger",
  },

  // Surprise tips
  {
    id: "13",
    text: "Embrace unexpected changes as opportunities for growth and new experiences.",
    moodCategory: "surprise",
  },
  {
    id: "14",
    text: "Practice adaptability by being open to changing your plans when necessary.",
    moodCategory: "surprise",
  },

  // Neutral tips
  {
    id: "15",
    text: "Establish a consistent daily routine to provide structure and stability.",
    moodCategory: "neutral",
  },
  {
    id: "16",
    text: "Practice mindfulness to stay present and engaged with your daily activities.",
    moodCategory: "neutral",
  },
  {
    id: "17",
    text: "Set small, achievable goals to maintain motivation and a sense of accomplishment.",
    moodCategory: "neutral",
  },
]

// Get a random prompt based on mood category
export const getDailyPrompt = (moodCategory: MoodCategory = "neutral"): DailyPrompt => {
  const filteredPrompts = prompts.filter((prompt) => prompt.moodCategory === moodCategory)
  if (filteredPrompts.length === 0) {
    return prompts[Math.floor(Math.random() * prompts.length)]
  }
  return filteredPrompts[Math.floor(Math.random() * filteredPrompts.length)]
}

// Get a random quote based on mood category
export const getQuote = (moodCategory: MoodCategory = "neutral"): Quote => {
  const filteredQuotes = quotes.filter((quote) => quote.moodCategory === moodCategory)
  if (filteredQuotes.length === 0) {
    return quotes[Math.floor(Math.random() * quotes.length)]
  }
  return filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]
}

// Get mental health tips based on mood category
export const getMentalHealthTips = (moodCategory: MoodCategory = "neutral", count = 3): MentalHealthTip[] => {
  const filteredTips = mentalHealthTips.filter((tip) => tip.moodCategory === moodCategory)
  if (filteredTips.length === 0) {
    // If no tips for this category, return random tips
    const shuffled = [...mentalHealthTips].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // If we have fewer tips than requested, return all of them
  if (filteredTips.length <= count) {
    return filteredTips
  }

  // Otherwise, return random selection
  const shuffled = [...filteredTips].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
