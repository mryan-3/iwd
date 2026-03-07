'use client'

import { useState, useEffect } from 'react'
import { LetterData } from '../lib/encode'
import { getLetter } from '../lib/db'
import { ComposeHeader } from '../components/compose-header'
import { ComposeCard } from '../components/compose-card'
import { ViewLetter } from '../components/view-letter'
import { ScatteredHearts } from '../components/hearts'
import { motion, AnimatePresence } from 'framer-motion'

export default function Page() {
  const [letterData, setLetterData] = useState<LetterData | null>(null)
  const [isViewMode, setIsViewMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLetter() {
      const params = new URLSearchParams(window.location.search)
      const id = params.get('id')

      if (id) {
        try {
          const data = await getLetter(id)
          if (data) {
            setLetterData(data)
            setIsViewMode(true)
          } else {
            setIsViewMode(false)
          }
        } catch (error) {
          console.error("Failed to load letter", error)
          setIsViewMode(false)
        }
      } else {
        setIsViewMode(false)
      }
      setLoading(false)
    }

    loadLetter()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-100 border-t-purple-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen font-ui selection:bg-purple-50 selection:text-purple-500">
      <AnimatePresence mode="wait">
        {isViewMode && letterData ? (
          <motion.div key="view"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">

              <ViewLetter data={letterData} />

              {/* Make another one button */}
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                // onClick={handleMakeAnother}
                className="mt-16 text-xs uppercase tracking-widest font-ui text-purple-400 hover:text-purple-600 transition-colors border-b border-transparent hover:border-purple-200 pb-1"
              >
                Make someone&apos;s day
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="compose"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative min-h-screen bg-warm-white flex flex-col items-center justify-center p-6"
          >
            <ScatteredHearts />
            <div className="w-full max-w-2xl z-10 py-12">
              <ComposeHeader />
              <ComposeCard />
              <footer className="mt-12 text-center text-green-300 text-xs font-bold uppercase tracking-[0.2em]">
                Made with love for International Women&apos;s Day
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
