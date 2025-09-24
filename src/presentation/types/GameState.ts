import { GameMode } from '@/domain'

export interface GameState {
  tower: Array<{
    id: string
    x: number
    y: number
    color: string
  }>
  currentProblem: {
    id: string
    question: string
    answer: number
    options: number[]
    tables: number[]
    operation: string
    isEmpty: boolean
  }
  score: number
  level: number
  isGameRunning: boolean
  fallingBlocks: Array<{
    id: string
    x: number
    y: number
    color: string
  }>
  mode: GameMode
  showLevelUp: boolean
}
