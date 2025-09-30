import { ReactNode, useCallback, useState } from 'react'
import { Operation, GameSession, GameSettings } from '@/domain'
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
    GameSession.create(GameSettings.createWithAllTables(Operation.ADDITION))
  )

  const {
    startGameUseCase,
    answerProblemUseCase,
    generateProblemUseCase,
    levelUpUseCase,
  } = diContainer.getUseCases()

  const startGame = useCallback(
    (gameSettings: GameSettings) => {
      const newSession = startGameUseCase.execute(gameSettings)
      const sessionWithProblem = generateProblemUseCase.execute(newSession)
      setSession(sessionWithProblem)
    },
    [startGameUseCase, generateProblemUseCase]
  )

  const answerProblem = useCallback(
    (selectedAnswer: number) => {
      const newSession = answerProblemUseCase.execute(session, selectedAnswer)
      setSession(newSession)
      return {
        generateNextProblem: () => {
          const sessionWithProblem = generateProblemUseCase.execute(newSession)
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

  const levelUp = useCallback(() => {
    const updatedSession = levelUpUseCase.execute(session)
    setSession(updatedSession)
  }, [session, levelUpUseCase])

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

  const value: GameSessionContextValue = {
    gameState: session.toPlainObject(),
    startGame,
    answerProblem,
    stopGame,
    levelUp,
    updateFallingBlocks,
    updateGameSettings,
  }

  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  )
}
