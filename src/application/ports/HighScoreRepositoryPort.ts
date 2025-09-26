import { GameMode } from '@/domain'

export interface HighScore {
  id: string
  score: number
  date: string
  level: number
  mode: GameMode
}

export type ScoreNotification = HighScore[]

export type HighScoreChangeListener = (
  mode: GameMode,
  scores: ScoreNotification
) => void

export interface HighScoreRepositoryPort {
  getHighScores(mode: GameMode): HighScore[]

  addScore(score: HighScore): void

  subscribe(listener: HighScoreChangeListener): () => void
}
