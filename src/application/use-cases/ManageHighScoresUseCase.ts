import { GameMode } from '@/domain'
import { HighScore, HighScoreRepositoryPort } from '@/application'

export class ManageHighScoresUseCase {
  constructor(private readonly repository: HighScoreRepositoryPort) {}

  getHighScores(mode: GameMode): HighScore[] {
    return this.repository.getHighScores(mode)
  }

  addScore(score: HighScore): void {
    this.repository.addScore(score)
  }

  clearScores(mode: GameMode): void {
    this.repository.clearScores(mode)
  }
}
