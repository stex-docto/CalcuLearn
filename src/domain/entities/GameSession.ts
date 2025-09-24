import { Tower } from './Tower'
import { Problem } from './Problem'
import { Block } from './Block'
import { Score } from '../value-objects/Score'
import { Level } from '../value-objects/Level'
import { GameMode } from '../enums/GameMode'
import { GameStatus } from '../value-objects/GameStatus'

export class GameSession {
  constructor(
    private readonly tower: Tower,
    private readonly currentProblem: Problem,
    private readonly score: Score,
    private readonly level: Level,
    private readonly status: GameStatus,
    private readonly fallingBlocks: Block[],
    private readonly mode: GameMode,
    private readonly showLevelUp: boolean
  ) {}

  static create(mode: GameMode): GameSession {
    return new GameSession(
      Tower.empty(),
      Problem.empty(mode),
      Score.zero(),
      Level.initial(),
      GameStatus.stopped(),
      [],
      mode,
      false
    )
  }

  start(): GameSession {
    return new GameSession(
      this.tower,
      this.currentProblem,
      this.score,
      this.level,
      GameStatus.running(),
      this.fallingBlocks,
      this.mode,
      false
    )
  }

  stop(): GameSession {
    return new GameSession(
      this.tower,
      this.currentProblem,
      this.score,
      this.level,
      GameStatus.stopped(),
      this.fallingBlocks,
      this.mode,
      false
    )
  }

  answerProblem(selectedAnswer: number): {
    session: GameSession
    events: GameEvent[]
  } {
    if (!this.status.isRunning()) {
      return { session: this, events: [] }
    }

    const events: GameEvent[] = []
    const isCorrect = this.currentProblem.isCorrectAnswer(selectedAnswer)

    if (isCorrect) {
      const blockValue = 1
      const newBlock = Block.create(blockValue)
      const { tower, isComplete } = this.tower.addBlock(newBlock)

      const newScore = this.score.add(blockValue * this.level.toNumber())
      let newLevel = this.level
      let showLevelUp = false

      if (isComplete) {
        newLevel = this.level.increment()
        showLevelUp = true
        events.push({ type: 'TOWER_COMPLETED', level: newLevel.toNumber() })
        events.push({ type: 'LEVEL_UP', level: newLevel.toNumber() })
      }

      events.push({ type: 'CORRECT_ANSWER', block: newBlock })

      return {
        session: new GameSession(
          tower,
          Problem.empty(this.mode),
          newScore,
          newLevel,
          this.status,
          this.fallingBlocks,
          this.mode,
          showLevelUp
        ),
        events,
      }
    } else {
      const penaltyBlocks = Math.max(0, this.level.toNumber() - 1)
      const { tower, removedBlocks } = this.tower.removeTopBlocks(penaltyBlocks)

      const blockValue = 1
      const fallingBlock = Block.create(blockValue)
      const newFallingBlocks = [
        ...this.fallingBlocks,
        ...removedBlocks,
        fallingBlock,
      ]

      const newScore = this.score.subtract(penaltyBlocks * 10)

      events.push({
        type: 'WRONG_ANSWER',
        removedBlocks: removedBlocks.length,
        fallingBlock,
      })

      return {
        session: new GameSession(
          tower,
          Problem.empty(this.mode),
          newScore,
          this.level,
          this.status,
          newFallingBlocks,
          this.mode,
          false
        ),
        events,
      }
    }
  }

  updateProblem(problem: Problem): GameSession {
    return new GameSession(
      this.tower,
      problem,
      this.score,
      this.level,
      this.status,
      this.fallingBlocks,
      this.mode,
      this.showLevelUp
    )
  }

  hideLevelUp(): GameSession {
    return new GameSession(
      this.tower,
      this.currentProblem,
      this.score,
      this.level,
      this.status,
      this.fallingBlocks,
      this.mode,
      false
    )
  }

  cleanupFallingBlocks(): GameSession {
    const cleanedBlocks = this.fallingBlocks.filter(
      (block) => block.position.y > -500
    )
    return new GameSession(
      this.tower,
      this.currentProblem,
      this.score,
      this.level,
      this.status,
      cleanedBlocks,
      this.mode,
      this.showLevelUp
    )
  }

  needsProblem(): boolean {
    return this.status.isRunning() && this.currentProblem.isEmpty()
  }

  // Getters
  getTower(): Tower {
    return this.tower
  }

  getCurrentProblem(): Problem {
    return this.currentProblem
  }

  getScore(): Score {
    return this.score
  }

  getLevel(): Level {
    return this.level
  }

  getStatus(): GameStatus {
    return this.status
  }

  getFallingBlocks(): Block[] {
    return [...this.fallingBlocks]
  }

  getMode(): GameMode {
    return this.mode
  }

  getShowLevelUp(): boolean {
    return this.showLevelUp
  }

  toPlainObject() {
    return {
      tower: this.tower.toPlainArray(),
      currentProblem: {
        ...this.currentProblem.toPlainObject(),
        isEmpty: this.currentProblem.isEmpty(),
      },
      score: this.score.toNumber(),
      level: this.level.toNumber(),
      isGameRunning: this.status.isRunning(),
      fallingBlocks: this.fallingBlocks.map((block) => block.toPlainObject()),
      mode: this.mode,
      showLevelUp: this.showLevelUp,
    }
  }
}

export type GameEvent =
  | { type: 'CORRECT_ANSWER'; block: Block }
  | { type: 'WRONG_ANSWER'; removedBlocks: number; fallingBlock: Block }
  | { type: 'TOWER_COMPLETED'; level: number }
  | { type: 'LEVEL_UP'; level: number }
