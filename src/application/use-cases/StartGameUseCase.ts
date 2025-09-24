import { GameMode, GameSession } from '@/domain'
import { HighScore, HighScoreRepositoryPort } from '@/application'

export class StartGameUseCase {
  constructor(private readonly highScoreRepository: HighScoreRepositoryPort) {}

  execute(currentSession: GameSession, mode: GameMode): GameSession {
    // Save current session score if it's running and has a score
    if (
      currentSession.getStatus().isRunning() &&
      !currentSession.getScore().isZero()
    ) {
      const score: HighScore = {
        id: Date.now().toString(),
        score: currentSession.getScore().toNumber(),
        date: new Date().toISOString(),
        level: currentSession.getLevel().toNumber(),
        mode: currentSession.getMode(),
      }
      this.highScoreRepository.addScore(score)
    }

    // Start new game session
    return GameSession.create(mode).start()
  }
}
