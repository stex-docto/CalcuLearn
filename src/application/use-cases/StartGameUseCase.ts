import { GameSession, GameSettings, GameStatus } from '@/domain'
import { HighScore, HighScoreRepositoryPort } from '@/application'

export class StartGameUseCase {
  constructor(private readonly highScoreRepository: HighScoreRepositoryPort) {}

  execute(
    currentSession: GameSession,
    gameSettings: GameSettings
  ): GameSession {
    // Save current session score if it's running and has a score
    if (
      currentSession.status === GameStatus.RUNNING &&
      !currentSession.score.isZero()
    ) {
      const score: HighScore = {
        id: currentSession.id,
        score: currentSession.score.toNumber(),
        date: new Date().toISOString(),
        level: currentSession.level.toNumber(),
        mode: currentSession.gameSettings.mode,
      }
      this.highScoreRepository.addScore(score)
    }

    // Start new game session
    return GameSession.create(gameSettings).start()
  }
}
