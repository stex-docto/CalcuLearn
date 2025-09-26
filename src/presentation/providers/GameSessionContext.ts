import { createContext } from 'react'
import { GameSession, GameSettings, GameEvent } from '@/domain'
import { HighScore } from '@/application'

export interface GameSessionContextValue {
  gameState: ReturnType<GameSession['toPlainObject']>
  startGame: (gameSettings: GameSettings) => void
  answerProblem: (selectedAnswer: number) => {
    events: GameEvent[]
    generateNextProblem: () => void
  }
  stopGame: () => void
  hideLevelUp: () => void
  updateFallingBlocks: () => void
  updateGameSettings: (gameSettings: GameSettings) => void
  asHighScore: HighScore
}

export const GameSessionContext = createContext<
  GameSessionContextValue | undefined
>(undefined)
