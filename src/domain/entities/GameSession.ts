import { Tower } from './Tower'
import { GameSettings, GameStatus, Level, Problem, Score } from '@/domain'
import { Block } from './Block'

export class GameSession {
  constructor(
    public readonly id: string,
    public readonly tower: Tower,
    public readonly currentProblem: Problem,
    public readonly score: Score,
    public readonly level: Level,
    public readonly status: GameStatus,
    public readonly fallingBlocks: Block[],
    public readonly gameSettings: GameSettings,
    public readonly showLevelUp: boolean,
    public readonly givenAnswer: number | null
  ) {}

  static create(gameSettings: GameSettings): GameSession {
    return new GameSession(
      crypto.randomUUID(),
      Tower.empty(),
      Problem.empty(gameSettings.mode),
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
      this.score,
      this.level,
      GameStatus.STOPPED,
      this.fallingBlocks,
      this.gameSettings,
      false,
      null
    )
  }

  answerProblem(selectedAnswer: number): {
    session: GameSession
    events: GameEvent[]
  } {
    if (this.status !== GameStatus.RUNNING || this.givenAnswer !== null) {
      return { session: this, events: [] }
    }

    const events: GameEvent[] = []
    const isCorrect = this.currentProblem.isCorrectAnswer(selectedAnswer)

    if (isCorrect) {
      const newBlock = Block.create()
      const { tower, isComplete } = this.tower.addBlock(newBlock)

      let newScore = this.score.add(1)
      let newLevel = this.level
      let showLevelUp = false

      if (isComplete) {
        newScore = newScore.bank()
        newLevel = this.level.increment()
        showLevelUp = true
        events.push({ type: 'TOWER_COMPLETED', level: newLevel.toNumber() })
        events.push({ type: 'LEVEL_UP', level: newLevel.toNumber() })
      }

      events.push({ type: 'CORRECT_ANSWER', block: newBlock })

      return {
        session: new GameSession(
          this.id,
          tower,
          this.currentProblem,
          newScore,
          newLevel,
          this.status,
          this.fallingBlocks,
          this.gameSettings,
          showLevelUp,
          selectedAnswer
        ),
        events,
      }
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

      events.push({
        type: 'WRONG_ANSWER',
        removedBlocks: removedBlocks.length,
        fallingBlock,
      })

      return {
        session: new GameSession(
          this.id,
          tower,
          this.currentProblem,
          newScore,
          this.level,
          this.status,
          newFallingBlocks,
          this.gameSettings,
          false,
          selectedAnswer
        ),
        events,
      }
    }
  }

  updateProblem(problem: Problem): GameSession {
    return new GameSession(
      this.id,
      this.tower,
      problem,
      this.score,
      this.level,
      this.status,
      this.fallingBlocks,
      this.gameSettings,
      this.showLevelUp,
      null
    )
  }

  hideLevelUp(): GameSession {
    return new GameSession(
      this.id,
      this.tower,
      this.currentProblem,
      this.score,
      this.level,
      this.status,
      this.fallingBlocks,
      this.gameSettings,
      false,
      this.givenAnswer
    )
  }

  updateGameSettings(newGameSettings: GameSettings): GameSession {
    return new GameSession(
      this.id,
      this.tower,
      Problem.empty(newGameSettings.mode),
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
  | { type: 'TOWER_COMPLETED'; level: number }
  | { type: 'LEVEL_UP'; level: number }
