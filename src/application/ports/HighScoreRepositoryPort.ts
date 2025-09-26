import { GameMode, GameSession } from '@/domain'

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

export function fromGameSession(session: GameSession) {
  return {
    id: session.id,
    score: session.score.toNumber(),
    date: new Date().toISOString(),
    level: session.level.toNumber(),
    mode: session.gameSettings.mode,
  }
}
