import { GameSession, Problem } from '@/domain'

export class GenerateProblemUseCase {
  execute(session: GameSession): GameSession {
    const problem = Problem.generate(session.gameSettings)
    return session.updateProblem(problem)
  }
}
