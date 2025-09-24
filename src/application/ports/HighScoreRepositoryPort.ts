import { GameMode } from '@/domain'

export interface HighScore {
  id: string
  score: number
  date: string
  level: number
  mode: GameMode
}

export interface HighScoreRepositoryPort {
  getHighScores(mode: GameMode): HighScore[]

  addScore(score: HighScore): void

  clearScores(mode: GameMode): void
}
