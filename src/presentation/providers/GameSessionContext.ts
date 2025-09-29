import { createContext } from 'react'
import { GameSession, GameSettings } from '@/domain'

export interface GameSessionContextValue {
  gameState: ReturnType<GameSession['toPlainObject']>
  startGame: (gameSettings: GameSettings) => void
  answerProblem: (selectedAnswer: number) => {
    generateNextProblem: () => void
  }
  stopGame: () => void
  levelUp: () => void
  updateFallingBlocks: () => void
  updateGameSettings: (gameSettings: GameSettings) => void
}

export const GameSessionContext = createContext<
  GameSessionContextValue | undefined
>(undefined)
