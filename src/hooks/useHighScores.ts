import { useCallback, useEffect, useState } from 'react'
import { GameMode, HighScore } from '@/types/game'

const STORAGE_KEY_PREFIX = 'calculearn-high-scores'
const MAX_SCORES = 10

const getStorageKey = (mode: GameMode) => `${STORAGE_KEY_PREFIX}-${mode}`

export function useHighScores(mode: GameMode = 'addition') {
  const [highScores, setHighScores] = useState<HighScore[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(mode))
    if (stored) {
      try {
        const scores = JSON.parse(stored)
        setHighScores(scores)
      } catch (error) {
        console.error('Error loading high scores:', error)
        setHighScores([])
      }
    } else {
      setHighScores([])
    }
  }, [mode])

  const saveScoresToStorage = useCallback(
    (scores: HighScore[]) => {
      try {
        localStorage.setItem(getStorageKey(mode), JSON.stringify(scores))
      } catch (error) {
        console.error('Error saving high scores:', error)
      }
    },
    [mode]
  )

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
    localStorage.removeItem(getStorageKey(mode))
  }, [mode])

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
