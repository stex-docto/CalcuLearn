import { Operation } from '@/domain'
import {
  HighScore,
  HighScoreRepositoryPort,
  HighScoreChangeListener,
} from '@/application'

export class ManageHighScoresUseCase {
  constructor(private readonly repository: HighScoreRepositoryPort) {}

  getHighScores(mode: Operation): HighScore[] {
    return this.repository.getHighScores(mode)
  }

  subscribe(listener: HighScoreChangeListener): () => void {
    return this.repository.subscribe(listener)
  }
}
