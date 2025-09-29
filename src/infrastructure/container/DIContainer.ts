import { LocalStorageHighScoreAdapter } from '@/infrastructure'
import {
  AnswerProblemUseCase,
  GenerateProblemUseCase,
  LevelUpUseCase,
  ManageHighScoresUseCase,
  StartGameUseCase,
} from '@/application'

class DIContainer {
  private static instance: DIContainer
  private useCases: {
    startGameUseCase: StartGameUseCase
    answerProblemUseCase: AnswerProblemUseCase
    generateProblemUseCase: GenerateProblemUseCase
    levelUpUseCase: LevelUpUseCase
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
    levelUpUseCase: LevelUpUseCase
    manageHighScoresUseCase: ManageHighScoresUseCase
  } {
    if (!this.useCases) {
      // Create adapters
      const highScoreRepositoryAdapter = new LocalStorageHighScoreAdapter()

      // Create use cases
      const startGameUseCase = new StartGameUseCase()
      const generateProblemUseCase = new GenerateProblemUseCase()
      const levelUpUseCase = new LevelUpUseCase()
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
        levelUpUseCase,
        manageHighScoresUseCase,
      }
    }

    return this.useCases
  }
}

export const diContainer = DIContainer.getInstance()
