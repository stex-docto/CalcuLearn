import { Tower } from './Tower'
import {
  GameSettings,
  GameStatus,
  Level,
  Problem,
  ProblemSet,
  Score,
} from '@/domain'
import { Block } from './Block'

export class GameSession {
  constructor(
    public readonly id: string,
    public readonly tower: Tower,
    public readonly currentProblem: Problem,
    public readonly problemSet: ProblemSet,
    public readonly score: Score,
    public readonly level: Level,
    public readonly status: GameStatus,
    public readonly fallingBlocks: Block[],
    public readonly gameSettings: GameSettings,
    public readonly showLevelUp: boolean,
    public readonly givenAnswer: number | null
  ) {}

  static create(gameSettings: GameSettings): GameSession {
    const problemSet = ProblemSet.generate(gameSettings)
    return new GameSession(
      crypto.randomUUID(),
      Tower.empty(),
      Problem.empty(gameSettings.mode),
      problemSet,
      Score.zero(),
      Level.initial(),
      GameStatus.STOPPED,
      [],
      gameSettings,
      false,
      null
    )
  }

  start(): GameSession {
    return new GameSession(
      crypto.randomUUID(),
      this.tower,
      this.currentProblem,
      this.problemSet,
      this.score,
      this.level,
      GameStatus.RUNNING,
      this.fallingBlocks,
      this.gameSettings,
      false,
      null
    )
  }

  stop(): GameSession {
    return new GameSession(
      this.id,
      this.tower,
      Problem.empty(this.gameSettings.mode),
      this.problemSet,
      this.score,
      this.level,
      GameStatus.STOPPED,
      this.fallingBlocks,
      this.gameSettings,
      false,
      null
    )
  }

  answerProblem(selectedAnswer: number): GameSession {
    if (
      this.status !== GameStatus.RUNNING ||
      this.givenAnswer !== null ||
      this.showLevelUp
    ) {
      return this
    }

    const isCorrect = this.currentProblem.isCorrectAnswer(selectedAnswer)

    if (isCorrect) {
      const currentTowerHeight = this.tower.getHeight().toNumber()
      const newBlock = Block.create(currentTowerHeight) // 0-9 for l1-l10 images
      const { tower, isComplete } = this.tower.addBlock(newBlock)

      let newScore = this.score.add(1)
      let newLevel = this.level
      let showLevelUp = false

      if (isComplete) {
        newScore = newScore.bank()
        newLevel = this.level.increment()
        showLevelUp = true
      }

      // Update problem stats and get updated problemSet
      const updatedProblemSet = this.problemSet.updateProblemStats(
        this.currentProblem.id.toString(),
        true
      )

      return new GameSession(
        this.id,
        tower,
        this.currentProblem,
        updatedProblemSet,
        newScore,
        newLevel,
        this.status,
        this.fallingBlocks,
        this.gameSettings,
        showLevelUp,
        selectedAnswer
      )
    } else {
      const penaltyBlocks = Math.max(0, this.level.toNumber() - 1)
      const { tower, removedBlocks } = this.tower.removeTopBlocks(penaltyBlocks)

      const fallingBlock = Block.create()
      const newFallingBlocks = [
        ...this.fallingBlocks,
        ...removedBlocks,
        fallingBlock,
      ]

      const newScore = this.score.subtract(penaltyBlocks)

      // Update problem stats for wrong answer
      const updatedProblemSet = this.problemSet.updateProblemStats(
        this.currentProblem.id.toString(),
        false
      )

      return new GameSession(
        this.id,
        tower,
        this.currentProblem,
        updatedProblemSet,
        newScore,
        this.level,
        this.status,
        newFallingBlocks,
        this.gameSettings,
        false,
        selectedAnswer
      )
    }
  }

  updateProblem(problem: Problem): GameSession {
    return new GameSession(
      this.id,
      this.tower,
      problem,
      this.problemSet,
      this.score,
      this.level,
      this.status,
      this.fallingBlocks,
      this.gameSettings,
      this.showLevelUp,
      null
    )
  }

  levelUp(problem: Problem): GameSession {
    return new GameSession(
      this.id,
      Tower.empty(),
      problem,
      this.problemSet,
      this.score,
      this.level,
      this.status,
      this.fallingBlocks,
      this.gameSettings,
      false,
      null
    )
  }

  getNextProblem(): Problem | null {
    return this.problemSet.getRandomProblem()
  }

  updateGameSettings(newGameSettings: GameSettings): GameSession {
    const newProblemSet = ProblemSet.generate(newGameSettings)
    return new GameSession(
      this.id,
      this.tower,
      Problem.empty(newGameSettings.mode),
      newProblemSet,
      this.score,
      this.level,
      this.status,
      this.fallingBlocks,
      newGameSettings,
      this.showLevelUp,
      this.givenAnswer
    )
  }

  cleanupFallingBlocks(): GameSession {
    const cleanedBlocks = this.fallingBlocks.filter(
      (block) => block.position.y > -500
    )
    return new GameSession(
      this.id,
      this.tower,
      this.currentProblem,
      this.problemSet,
      this.score,
      this.level,
      this.status,
      cleanedBlocks,
      this.gameSettings,
      this.showLevelUp,
      this.givenAnswer
    )
  }

  toPlainObject() {
    return {
      id: this.id,
      tower: this.tower.toPlainArray(),
      currentProblem: {
        ...this.currentProblem.toPlainObject(),
        isEmpty: this.currentProblem.isEmpty(),
      },
      score: this.score.toNumber(),
      level: this.level.toNumber(),
      isGameRunning: this.status === GameStatus.RUNNING,
      fallingBlocks: this.fallingBlocks.map((block) => block.toPlainObject()),
      mode: this.gameSettings.mode,
      tables: this.gameSettings.tableSelection.getTables(),
      showLevelUp: this.showLevelUp,
    }
  }
}

export type GameEvent =
  | { type: 'CORRECT_ANSWER'; block: Block }
  | { type: 'WRONG_ANSWER'; removedBlocks: number; fallingBlock: Block }
