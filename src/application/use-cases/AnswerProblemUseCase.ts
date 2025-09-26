import { GameEvent, GameSession } from '@/domain'
import { HighScoreRepositoryPort } from '@/application'

export interface AnswerProblemResult {
  session: GameSession
  events: GameEvent[]
}

export class AnswerProblemUseCase {
  constructor(protected highScoreRepository: HighScoreRepositoryPort) {}

  execute(session: GameSession, selectedAnswer: number): AnswerProblemResult {
    const result = session.answerProblem(selectedAnswer)

    if (result.session.score.toNumber() > 0) {
      this.highScoreRepository.addScore({
        id: result.session.id,
        score: result.session.score.toNumber(),
        date: new Date().toISOString(),
        level: result.session.level.toNumber(),
        mode: result.session.gameSettings.mode,
      })
    }

    return result
  }
}
