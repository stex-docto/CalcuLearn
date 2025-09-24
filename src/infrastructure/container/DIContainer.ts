// Infrastructure adapters
import { ProblemGeneratorAdapter } from '../adapters/ProblemGeneratorAdapter'
import { LocalStorageHighScoreAdapter } from '../adapters/LocalStorageHighScoreAdapter'

// Use cases
import { StartGameUseCase } from '../../application/use-cases/StartGameUseCase'
import { AnswerProblemUseCase } from '../../application/use-cases/AnswerProblemUseCase'
import { GenerateProblemUseCase } from '../../application/use-cases/GenerateProblemUseCase'
import { ManageHighScoresUseCase } from '../../application/use-cases/ManageHighScoresUseCase'

// Application service
import { GameApplicationService } from '../../application/services/GameApplicationService'

class DIContainer {
  private static instance: DIContainer
  private gameApplicationService: GameApplicationService | null = null

  private constructor() {}

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer()
    }
    return DIContainer.instance
  }

  getGameApplicationService(): GameApplicationService {
    if (!this.gameApplicationService) {
      // Create adapters
      const problemGeneratorAdapter = new ProblemGeneratorAdapter()
      const highScoreRepositoryAdapter = new LocalStorageHighScoreAdapter()

      // Create use cases
      const startGameUseCase = new StartGameUseCase(highScoreRepositoryAdapter)
      const answerProblemUseCase = new AnswerProblemUseCase()
      const generateProblemUseCase = new GenerateProblemUseCase(
        problemGeneratorAdapter
      )
      const manageHighScoresUseCase = new ManageHighScoresUseCase(
        highScoreRepositoryAdapter
      )

      // Create application service
      this.gameApplicationService = new GameApplicationService(
        startGameUseCase,
        answerProblemUseCase,
        generateProblemUseCase,
        manageHighScoresUseCase
      )
    }

    return this.gameApplicationService
  }
}

export const diContainer = DIContainer.getInstance()
