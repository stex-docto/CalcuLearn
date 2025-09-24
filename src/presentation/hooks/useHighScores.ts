import { useCallback, useEffect, useState } from 'react'
import { GameMode } from '@/domain'
import { HighScore } from '@/application'
import { diContainer } from '@/infrastructure'

export function useHighScores(mode: GameMode) {
  const [scores, setScores] = useState<HighScore[]>([])
  const gameService = diContainer.getGameApplicationService()

  const loadScores = useCallback(() => {
    const highScores = gameService.getHighScores(mode)
    setScores(highScores)
  }, [gameService, mode])

  const addScore = useCallback(
    (score: HighScore) => {
      gameService.addHighScore(score)
      loadScores()
    },
    [gameService, loadScores]
  )

  // Load scores when mode changes
  useEffect(() => {
    loadScores()
  }, [loadScores])

  return {
    scores,
    addScore,
  }
}
