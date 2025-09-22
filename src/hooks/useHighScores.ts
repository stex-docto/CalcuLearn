import { useState, useEffect, useCallback } from 'react'
import { HighScore } from '@/types/game'

const STORAGE_KEY = 'calculearn-high-scores'
const MAX_SCORES = 10

export function useHighScores() {
  const [highScores, setHighScores] = useState<HighScore[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const scores = JSON.parse(stored)
        setHighScores(scores)
      } catch (error) {
        console.error('Error loading high scores:', error)
        setHighScores([])
      }
    }
  }, [])

  const saveScoresToStorage = useCallback((scores: HighScore[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
    } catch (error) {
      console.error('Error saving high scores:', error)
    }
  }, [])

  const addScore = useCallback(
    (newScore: HighScore) => {
      setHighScores((prev) => {
        const updatedScores = [...prev, newScore]
          .sort((a, b) => b.score - a.score)
          .slice(0, MAX_SCORES)

        saveScoresToStorage(updatedScores)
        return updatedScores
      })
    },
    [saveScoresToStorage]
  )

  const clearScores = useCallback(() => {
    setHighScores([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const isHighScore = useCallback(
    (score: number) => {
      if (highScores.length < MAX_SCORES) return true
      return score > highScores[highScores.length - 1].score
    },
    [highScores]
  )

  return {
    highScores,
    addScore,
    clearScores,
    isHighScore,
  }
}
