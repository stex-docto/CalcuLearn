import { GameSession, Problem } from '@/domain'

export class LevelUpUseCase {
  execute(session: GameSession): GameSession {
    if (!session.showLevelUp) {
      return session
    }

    const problem = Problem.generate(session.gameSettings)
    return session.levelUp(problem)
  }
}
