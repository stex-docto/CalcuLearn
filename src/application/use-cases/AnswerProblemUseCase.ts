import { GameSession } from '@/domain'
import { HighScoreRepositoryPort } from '@/application'

export interface AnswerProblemResult {
  session: GameSession
}

export class AnswerProblemUseCase {
  constructor(protected highScoreRepository: HighScoreRepositoryPort) {}

  execute(session: GameSession, selectedAnswer: number): GameSession {
    const newSession = session.answerProblem(selectedAnswer)

    if (newSession.score.toNumber() > 0) {
      this.highScoreRepository.addScore({
        id: newSession.id,
        score: newSession.score.toNumber(),
        date: new Date().toISOString(),
        level: newSession.level.toNumber(),
        mode: newSession.gameSettings.mode,
      })
    }

    return newSession
  }
}
