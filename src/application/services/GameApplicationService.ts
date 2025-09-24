import { GameSession, GameSettings, GameMode } from '@/domain'
import {
  AnswerProblemResult,
  AnswerProblemUseCase,
  GenerateProblemUseCase,
  HighScore,
  ManageHighScoresUseCase,
  StartGameUseCase,
} from '@/application'

export class GameApplicationService {
  constructor(
    private readonly startGameUseCase: StartGameUseCase,
    private readonly answerProblemUseCase: AnswerProblemUseCase,
    private readonly generateProblemUseCase: GenerateProblemUseCase,
    private readonly manageHighScoresUseCase: ManageHighScoresUseCase
  ) {}

  startGame(
    currentSession: GameSession,
    gameSettings: GameSettings
  ): GameSession {
    const newSession = this.startGameUseCase.execute(
      currentSession,
      gameSettings
    )
    return this.generateProblemUseCase.execute(newSession)
  }

  answerProblem(
    session: GameSession,
    selectedAnswer: number
  ): AnswerProblemResult {
    const result = this.answerProblemUseCase.execute(session, selectedAnswer)
    // Generate new problem after answering
    const sessionWithProblem = this.generateProblemUseCase.execute(
      result.session
    )
    return {
      session: sessionWithProblem,
      events: result.events,
    }
  }

  ensureProblemExists(session: GameSession): GameSession {
    return this.generateProblemUseCase.execute(session)
  }

  getHighScores(mode: GameMode): HighScore[] {
    return this.manageHighScoresUseCase.getHighScores(mode)
  }

  addHighScore(score: HighScore): void {
    this.manageHighScoresUseCase.addScore(score)
  }

  clearHighScores(mode: GameMode): void {
    this.manageHighScoresUseCase.clearScores(mode)
  }

  stopGame(session: GameSession): GameSession {
    return session.stop()
  }

  hideLevelUp(session: GameSession): GameSession {
    return session.hideLevelUp()
  }

  cleanupFallingBlocks(session: GameSession): GameSession {
    return session.cleanupFallingBlocks()
  }

  updateGameSettings(
    session: GameSession,
    gameSettings: GameSettings
  ): GameSession {
    return session.updateGameSettings(gameSettings)
  }
}
