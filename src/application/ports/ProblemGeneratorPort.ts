import { GameMode, Level, Problem } from '@/domain'

export interface ProblemGeneratorPort {
  generateProblem(level: Level, mode: GameMode): Problem
}
