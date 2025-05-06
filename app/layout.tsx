import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MoodProvider } from "@/context/mood-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MoodCanvas - AI Mood Journal & Visualizer",
  description: "Track your emotions and visualize your mood patterns with AI-powered journaling",
    generator: 'Dibyadyuti Dutta',
    icons: {
      icon: "/favicon.png",
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MoodProvider>{children}</MoodProvider>
      </body>
    </html>
  )
}
