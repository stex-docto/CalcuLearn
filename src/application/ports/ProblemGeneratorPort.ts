import { Problem, GameSettings } from '@/domain'

export interface ProblemGeneratorPort {
  generateProblem(gameSettings: GameSettings): Problem
}
