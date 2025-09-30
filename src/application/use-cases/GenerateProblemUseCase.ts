import { GameSession, Problem } from '@/domain'

export class GenerateProblemUseCase {
  execute(session: GameSession): GameSession {
    // Use weighted selection from the problem set
    const problem = session.getNextProblem()

    // Fallback to old random generation if no problem found
    if (!problem) {
      const fallbackProblem = Problem.generate(session.gameSettings)
      return session.updateProblem(fallbackProblem)
    }

    return session.updateProblem(problem)
  }
}
