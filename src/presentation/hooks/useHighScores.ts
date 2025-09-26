import { useCallback, useEffect, useState } from 'react'
import { GameMode } from '@/domain'
import { HighScore } from '@/application'
import { diContainer } from '@/infrastructure'

export function useHighScores(mode: GameMode) {
  const [scores, setScores] = useState<HighScore[]>([])
  const { manageHighScoresUseCase } = diContainer.getUseCases()

  const loadScores = useCallback(() => {
    const highScores = manageHighScoresUseCase.getHighScores(mode)
    setScores(highScores)
  }, [manageHighScoresUseCase, mode])

  const addScore = useCallback(
    (score: HighScore) => {
      manageHighScoresUseCase.addScore(score)
      loadScores()
    },
    [manageHighScoresUseCase, loadScores]
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
