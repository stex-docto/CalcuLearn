import { createContext } from 'react'
import { GameSession, GameSettings, GameEvent } from '@/domain'

export interface GameSessionContextValue {
  gameState: ReturnType<GameSession['toPlainObject']>
  currentGameScoreId: string | null
  startGame: (gameSettings: GameSettings) => void
  answerProblem: (selectedAnswer: number) => GameEvent[]
  stopGame: () => void
  hideLevelUp: () => void
  updateFallingBlocks: () => void
  updateGameSettings: (gameSettings: GameSettings) => void
}

export const GameSessionContext = createContext<
  GameSessionContextValue | undefined
>(undefined)
