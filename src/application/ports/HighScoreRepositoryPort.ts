import { Operation } from '@/domain'

export interface HighScore {
  id: string
  score: number
  date: string
  level: number
  mode: Operation
}

export type ScoreNotification = HighScore[]

export type HighScoreChangeListener = (
  mode: Operation,
  scores: ScoreNotification
) => void

export interface HighScoreRepositoryPort {
  getHighScores(mode: Operation): HighScore[]

  addScore(score: HighScore): void

  subscribe(listener: HighScoreChangeListener): () => void
}
