import { useCallback, useEffect, useState, useRef, ReactNode } from 'react'
import { GameSession, GameSettings, GameMode } from '@/domain'
import { diContainer } from '@/infrastructure'
import {
  GameSessionContext,
  GameSessionContextValue,
} from './GameSessionContext'

interface GameSessionProviderProps {
  children: ReactNode
}

export function GameSessionProvider({ children }: GameSessionProviderProps) {
  const [session, setSession] = useState<GameSession>(() =>
    GameSession.create(GameSettings.createWithAllTables(GameMode.ADDITION))
  )
  const currentScoreRef = useRef<string | null>(null)

  const gameService = diContainer.getGameApplicationService()
  const highScoreService = diContainer.getGameApplicationService()

  const startGame = useCallback(
    (gameSettings: GameSettings) => {
      const newSession = gameService.startGame(session, gameSettings)
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

  const updateGameSettings = useCallback(
    (gameSettings: GameSettings) => {
      const updatedSession = gameService.updateGameSettings(
        session,
        gameSettings
      )
      setSession(updatedSession)
    },
    [session, gameService]
  )

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

  // Live score saving - create/update high score entry as the game progresses
  useEffect(() => {
    const gameState = session.toPlainObject()

    if (gameState.isGameRunning && gameState.score > 0) {
      if (!currentScoreRef.current) {
        // Create new high score entry when game starts
        const scoreId = Date.now().toString()
        currentScoreRef.current = scoreId
        highScoreService.addHighScore({
          id: scoreId,
          score: gameState.score,
          date: new Date().toISOString(),
          level: gameState.level,
          mode: gameState.mode,
        })
      } else {
        // Update existing high score entry with new score
        highScoreService.addHighScore({
          id: currentScoreRef.current,
          score: gameState.score,
          date: new Date().toISOString(),
          level: gameState.level,
          mode: gameState.mode,
        })
      }
    }

    // Clear the reference when game stops
    if (!gameState.isGameRunning) {
      currentScoreRef.current = null
    }
  }, [session, highScoreService])

  const value: GameSessionContextValue = {
    gameState: session.toPlainObject(),
    currentGameScoreId: currentScoreRef.current,
    startGame,
    answerProblem,
    stopGame,
    hideLevelUp,
    updateFallingBlocks,
    updateGameSettings,
  }

  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  )
}
