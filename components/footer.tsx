"use client"

import { motion } from "framer-motion"
import { Heart, Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-violet-500/20 bg-deep-purple-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <motion.h3
              className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-teal-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              MoodCanvas
            </motion.h3>
            <p className="text-teal-100/70 mb-4">
              AI-powered emotional journaling that helps you understand yourself better.
            </p>
            <div className="flex space-x-4">
              <a target="_blank" href="https://github.com/unknownguy49" className="text-violet-400 hover:text-violet-300 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:dibyadyutidutta49@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-teal-100/70 hover:text-teal-100 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#journal" className="text-teal-100/70 hover:text-teal-100 transition-colors">
                  Journal
                </a>
              </li>
              <li>
                <a href="#features" className="text-teal-100/70 hover:text-teal-100 transition-colors">
                  Features
                </a>
              </li>
              
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-teal-100/70 mb-4">Stay updated with the latest features and mental wellness tips.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-deep-purple-900/50 border border-violet-500/30 focus:border-violet-400 text-white placeholder:text-violet-300/50 rounded-l-lg p-2 flex-1"
              />
              <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-4 py-2 rounded-r-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-violet-500/10 text-center">
  <p className="text-teal-100/50 flex items-center justify-center">
    Made with
    <motion.span
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
      }}
      className="mx-1 inline-block"
    >
      <Heart className="w-4 h-4 text-pink-500" />
    </motion.span>
    by Team Lone Star
  </p>
</div>

      </div>
    </footer>
  )
}
