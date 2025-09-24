// Ports
export type { ProblemGeneratorPort } from './ports/ProblemGeneratorPort'
export type {
  HighScoreRepositoryPort,
  HighScore,
} from './ports/HighScoreRepositoryPort'

// Use Cases
export { StartGameUseCase } from './use-cases/StartGameUseCase'
export {
  AnswerProblemUseCase,
  type AnswerProblemResult,
} from './use-cases/AnswerProblemUseCase'
export { GenerateProblemUseCase } from './use-cases/GenerateProblemUseCase'
export { ManageHighScoresUseCase } from './use-cases/ManageHighScoresUseCase'

// Services
export { GameApplicationService } from './services/GameApplicationService'
