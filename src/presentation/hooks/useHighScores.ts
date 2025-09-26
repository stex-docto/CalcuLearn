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

  // Load scores when mode changes and subscribe to updates
  useEffect(() => {
    loadScores()

    return manageHighScoresUseCase.subscribe((changedMode, newScores) => {
      if (changedMode === mode) {
        setScores(newScores)
      }
    })
  }, [loadScores, manageHighScoresUseCase, mode])

  return { scores }
}
