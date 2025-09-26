import { LocalStorageHighScoreAdapter } from '@/infrastructure'
import {
  AnswerProblemUseCase,
  GenerateProblemUseCase,
  ManageHighScoresUseCase,
  StartGameUseCase,
} from '@/application'

class DIContainer {
  private static instance: DIContainer
  private useCases: {
    startGameUseCase: StartGameUseCase
    answerProblemUseCase: AnswerProblemUseCase
    generateProblemUseCase: GenerateProblemUseCase
    manageHighScoresUseCase: ManageHighScoresUseCase
  } | null = null

  private constructor() {}

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer()
    }
    return DIContainer.instance
  }

  getUseCases(): {
    startGameUseCase: StartGameUseCase
    answerProblemUseCase: AnswerProblemUseCase
    generateProblemUseCase: GenerateProblemUseCase
    manageHighScoresUseCase: ManageHighScoresUseCase
  } {
    if (!this.useCases) {
      // Create adapters
      const highScoreRepositoryAdapter = new LocalStorageHighScoreAdapter()

      // Create use cases
      const startGameUseCase = new StartGameUseCase()
      const generateProblemUseCase = new GenerateProblemUseCase()
      const manageHighScoresUseCase = new ManageHighScoresUseCase(
        highScoreRepositoryAdapter
      )
      const answerProblemUseCase = new AnswerProblemUseCase(
        highScoreRepositoryAdapter
      )

      this.useCases = {
        startGameUseCase,
        answerProblemUseCase,
        generateProblemUseCase,
        manageHighScoresUseCase,
      }
    }

    return this.useCases
  }
}

export const diContainer = DIContainer.getInstance()
