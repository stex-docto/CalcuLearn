// Ports
export type {
  HighScoreRepositoryPort,
  HighScore,
  HighScoreChangeListener,
} from './ports/HighScoreRepositoryPort'

// Use Cases
export { StartGameUseCase } from './use-cases/StartGameUseCase'
export {
  AnswerProblemUseCase,
  type AnswerProblemResult,
} from './use-cases/AnswerProblemUseCase'
export { GenerateProblemUseCase } from './use-cases/GenerateProblemUseCase'
export { LevelUpUseCase } from './use-cases/LevelUpUseCase'
export { ManageHighScoresUseCase } from './use-cases/ManageHighScoresUseCase'
