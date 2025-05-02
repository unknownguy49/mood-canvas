# MoodCanvas

MoodCanvas is an AI-powered emotional journaling application that helps users track, visualize, and understand their mood patterns over time. Using advanced sentiment analysis and beautiful visualizations, MoodCanvas transforms your journal entries into meaningful insights about your emotional well-being.

## Features

- **AI-Powered Sentiment Analysis**: Analyze journal entries using advanced NLP models to detect emotions and mood patterns
- **Beautiful Mood Visualizations**: See your emotions come to life with dynamic, interactive visualizations
- **Daily Mood-Based Prompts**: Receive personalized journaling prompts based on your current emotional state
- **Inspirational Quotes**: Get mood-relevant inspirational quotes to provide perspective and encouragement
- **Personalized Mental Health Tips**: Receive customized suggestions based on your emotional trends
- **Weekly Mood Trends**: Track your emotional journey with detailed charts and analytics
- **Privacy-Focused**: Your data is stored locally by default with optional encrypted cloud sync
- **Responsive Design**: Enjoy a seamless experience across all devices

## Tech Stack

### Frontend
- **Framework**: Next.js with React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Charts**: Recharts (with shadcn/ui chart components)
- **Local Storage**: Browser LocalStorage API

### Backend
- **API**: Flask REST API
- **NLP Models**: Hugging Face Transformers
- **Machine Learning**: PyTorch
- **Data Processing**: TextBlob (fallback)

## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- pip

### Frontend Setup

1. Clone the repository
```bash
git clone https://github.com/unknownguy49/moodcanvas.git
cd moodcanvas
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

### Backend Setup

1. Install dependencies
```bash
pip install -r requirements.txt
```

2. Start the Flask server
```bash
python app.py
```

## Usage

1. **Journal Entry**: Write about your feelings in the journal section
2. **Sentiment Analysis**: Your text is analyzed using NLP models
3. **Mood Visualization**: See your detected mood visualized with dynamic bubbles and colors
4. **Trend Analysis**: View your weekly mood trends in the chart
5. **Personalized Content**: Receive prompts, quotes, and mental health tips based on your mood

## Project Structure

```
moodcanvas/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   └── page.tsx            # Home page
├── components/             # React components
├── context/                # React context
├── services/               # Service modules
├── types/                  # TypeScript type definitions
├── app.py                  # Main Flask application
├── package.json            # Node.js project configuration           
├── tailwind.config.js      # Tailwind CSS configuration
├── requirements.txt        # Python dependencies
└── README.md               # Project Documentation
```

### Key Components:

1. **Emotion Detection Model**: Uses a transformer model to detect emotions in text
2. **Sentiment Analysis**: Calculates sentiment polarity and subjectivity scores
3. **Response Formatting**: Converts model outputs into a standardized format for the frontend