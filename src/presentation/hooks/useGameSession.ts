import { useCallback, useEffect, useState } from 'react'
import { GameSession, GameMode } from '@/domain'
import { diContainer } from '@/infrastructure'

export function useGameSession() {
  const [session, setSession] = useState<GameSession>(() =>
    GameSession.create(GameMode.ADDITION)
  )

  const gameService = diContainer.getGameApplicationService()

  const startGame = useCallback(
    (mode: GameMode) => {
      const newSession = gameService.startGame(session, mode)
      setSession(newSession)
    },
    [session, gameService]
  )

  const answerProblem = useCallback(
    (selectedAnswer: number) => {
      const result = gameService.answerProblem(session, selectedAnswer)
      setSession(result.session)
      return result.events
    },
    [session, gameService]
  )

  const stopGame = useCallback(() => {
    const stoppedSession = gameService.stopGame(session)
    setSession(stoppedSession)
  }, [session, gameService])

  const hideLevelUp = useCallback(() => {
    const updatedSession = gameService.hideLevelUp(session)
    setSession(updatedSession)
  }, [session, gameService])

  const updateFallingBlocks = useCallback(() => {
    const cleanedSession = gameService.cleanupFallingBlocks(session)
    setSession(cleanedSession)
  }, [session, gameService])

  // Auto-generate problems when needed
  useEffect(() => {
    if (session.needsProblem()) {
      const sessionWithProblem = gameService.ensureProblemExists(session)
      setSession(sessionWithProblem)
    }
  }, [session, gameService])

  // Auto-hide level up animation after 3 seconds
  useEffect(() => {
    if (session.getShowLevelUp()) {
      const timer = setTimeout(() => {
        hideLevelUp()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [session, hideLevelUp])

  return {
    gameState: session.toPlainObject(),
    startGame,
    answerProblem,
    stopGame,
    hideLevelUp,
    updateFallingBlocks,
    // Additional methods for compatibility
    gameOver: stopGame,
    updateCurrentProblem: () => {}, // Not needed in hexagonal architecture
  }
}
