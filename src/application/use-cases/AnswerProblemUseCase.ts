import { GameEvent, GameSession } from '@/domain'

export interface AnswerProblemResult {
  session: GameSession
  events: GameEvent[]
}

export class AnswerProblemUseCase {
  execute(session: GameSession, selectedAnswer: number): AnswerProblemResult {
    return session.answerProblem(selectedAnswer)
  }
}
