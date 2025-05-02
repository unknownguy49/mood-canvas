"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ApiSetup() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 z-50 bg-deep-purple-800/80 border-violet-500/30 text-violet-300 hover:bg-deep-purple-700/80 hover:text-violet-200"
        >
          API Setup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-deep-purple-900/95 border-violet-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-violet-300">API Setup Instructions</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="flask">
          <TabsList className="bg-deep-purple-800/50">
            <TabsTrigger value="flask">Flask API</TabsTrigger>
            <TabsTrigger value="firebase">Firebase (Optional)</TabsTrigger>
          </TabsList>

          <TabsContent value="flask" className="mt-4">
            <div className="space-y-4">
              <p className="text-teal-100/80">
                To enable full sentiment analysis functionality, set up the Flask API with TextBlob:
              </p>

              <div className="bg-deep-purple-950/80 p-4 rounded-md">
                <pre className="text-sm text-teal-100/90 overflow-x-auto">
                  <code>{`# Install required packages
pip install flask flask-cors textblob

# Create a file named app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'Text is required'}), 400
    
    # Analyze sentiment with TextBlob
    blob = TextBlob(text)
    sentiment = blob.sentiment
    
    # Determine primary emotion based on polarity
    polarity = sentiment.polarity
    subjectivity = sentiment.subjectivity
    
    if polarity > 0.5:
        primary = 'joy'
    elif polarity > 0.1:
        primary = 'surprise'
    elif polarity < -0.5:
        primary = 'sadness'
    elif polarity < -0.1:
        primary = 'anger' if subjectivity > 0.5 else 'anxiety'
    else:
        primary = 'neutral'
    
    # Normalize score to 0-1 range
    score = (polarity + 1) / 2
    
    return jsonify({
        'primary': primary,
        'score': score,
        'polarity': polarity,
        'subjectivity': subjectivity
    })

if __name__ == '__main__':
    app.run(debug=True)
`}</code>
                </pre>
              </div>

              <p className="text-teal-100/80">Run the Flask server with:</p>

              <div className="bg-deep-purple-950/80 p-4 rounded-md">
                <pre className="text-sm text-teal-100/90">
                  <code>python app.py</code>
                </pre>
              </div>

              <p className="text-teal-100/80">
                Then update the <code>sentiment-service.ts</code> file to point to your Flask API endpoint:
              </p>

              <div className="bg-deep-purple-950/80 p-4 rounded-md">
                <pre className="text-sm text-teal-100/90 overflow-x-auto">
                  <code>{`// In services/sentiment-service.ts
export const analyzeSentiment = async (text: string): Promise<MoodEntry> => {
  try {
    // Update this URL to your Flask API endpoint
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to analyze sentiment')
    }
    
    const data = await response.json()
    return formatMoodEntry(data)
  } catch (error) {
    console.error('Error analyzing sentiment:', error)
    // Fallback to simulated analysis if API fails
    return simulateSentimentAnalysis(text)
  }
}`}</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="firebase" className="mt-4">
            <div className="space-y-4">
              <p className="text-teal-100/80">To enable cloud sync with Firebase (optional):</p>

              <ol className="list-decimal list-inside space-y-2 text-teal-100/80">
                <li>
                  Create a Firebase project at{" "}
                  <a
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-300 hover:text-violet-200 underline"
                  >
                    Firebase Console
                  </a>
                </li>
                <li>Enable Firestore Database</li>
                <li>Add a web app to your project and get your Firebase config</li>
                <li>
                  Install Firebase: <code>npm install firebase</code>
                </li>
                <li>Create a Firebase config file:</li>
              </ol>

              <div className="bg-deep-purple-950/80 p-4 rounded-md">
                <pre className="text-sm text-teal-100/90 overflow-x-auto">
                  <code>{`// services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);`}</code>
                </pre>
              </div>

              <p className="text-teal-100/80">
                Then update the journal service to use Firebase instead of localStorage.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
