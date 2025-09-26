import { useCallback, useEffect, useState, useRef, ReactNode } from 'react'
import { GameSession, GameSettings, GameMode } from '@/domain'
import { diContainer } from '@/infrastructure'
import {
  GameSessionContext,
  GameSessionContextValue,
} from './GameSessionContext'
import { fromGameSession } from '@/application/ports/HighScoreRepositoryPort.ts'

interface GameSessionProviderProps {
  children: ReactNode
}

export function GameSessionProvider({ children }: GameSessionProviderProps) {
  const [session, setSession] = useState<GameSession>(() =>
    GameSession.create(GameSettings.createWithAllTables(GameMode.ADDITION))
  )
  const currentScoreRef = useRef<string | null>(null)

  const {
    startGameUseCase,
    answerProblemUseCase,
    generateProblemUseCase,
    manageHighScoresUseCase,
  } = diContainer.getUseCases()

  const startGame = useCallback(
    (gameSettings: GameSettings) => {
      const newSession = startGameUseCase.execute(session, gameSettings)
      const sessionWithProblem = generateProblemUseCase.execute(newSession)
      setSession(sessionWithProblem)
    },
    [session, startGameUseCase, generateProblemUseCase]
  )

  const answerProblem = useCallback(
    (selectedAnswer: number) => {
      const result = answerProblemUseCase.execute(session, selectedAnswer)
      setSession(result.session)

      return {
        events: result.events,
        generateNextProblem: () => {
          const sessionWithProblem = generateProblemUseCase.execute(
            result.session
          )
          setSession(sessionWithProblem)
        },
      }
    },
    [session, answerProblemUseCase, generateProblemUseCase]
  )

  const stopGame = useCallback(() => {
    const stoppedSession = session.stop()
    setSession(stoppedSession)
  }, [session])

  const hideLevelUp = useCallback(() => {
    const updatedSession = session.hideLevelUp()
    setSession(updatedSession)
  }, [session])

  const updateFallingBlocks = useCallback(() => {
    const cleanedSession = session.cleanupFallingBlocks()
    setSession(cleanedSession)
  }, [session])

  const updateGameSettings = useCallback(
    (gameSettings: GameSettings) => {
      const updatedSession = session.updateGameSettings(gameSettings)
      setSession(updatedSession)
    },
    [session]
  )

  // Auto-hide level up animation after 3 seconds
  useEffect(() => {
    if (session.showLevelUp) {
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
      manageHighScoresUseCase.addScore(fromGameSession(session))
    }

    // Clear the reference when game stops
    if (!gameState.isGameRunning) {
      currentScoreRef.current = null
    }
  }, [session, manageHighScoresUseCase])

  const value: GameSessionContextValue = {
    gameState: session.toPlainObject(),
    startGame,
    answerProblem,
    stopGame,
    hideLevelUp,
    updateFallingBlocks,
    updateGameSettings,
    asHighScore: fromGameSession(session),
  }

  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  )
}
