import { GameSession } from '@/domain'
import { ProblemGeneratorPort } from '@/application'

export class GenerateProblemUseCase {
  constructor(private readonly problemGenerator: ProblemGeneratorPort) {}

  execute(session: GameSession): GameSession {
    if (!session.needsProblem()) {
      return session
    }

    const problem = this.problemGenerator.generateProblem(
      session.getGameSettings()
    )

    return session.updateProblem(problem)
  }
}
