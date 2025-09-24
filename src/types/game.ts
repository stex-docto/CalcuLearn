export interface Block {
  id: string
  value: number
  decay: number
  x: number
  y: number
  color: string
}

export type GameMode = 'addition' | 'multiplication'

export interface GameState {
  tower: Block[]
  currentProblem: Problem
  score: number
  level: number
  isGameRunning: boolean
  fallingBlocks: Block[]
  mode: GameMode
  showLevelUp: boolean
}

export interface Problem {
  id: string
  question: string
  answer: number
  options: number[]
  difficulty: 'easy' | 'medium' | 'hard'
  operation: 'addition' | 'multiplication'
}

export interface HighScore {
  id: string
  score: number
  date: string
  level: number
  mode: GameMode
}
