import { Tower } from './Tower'
import {
  GameMode,
  GameSettings,
  GameStatus,
  Level,
  Problem,
  Score,
} from '@/domain'
import { Block } from './Block'

export class GameSession {
  constructor(
    private readonly tower: Tower,
    private readonly currentProblem: Problem,
    private readonly score: Score,
    private readonly level: Level,
    private readonly status: GameStatus,
    private readonly fallingBlocks: Block[],
    private readonly gameSettings: GameSettings,
    private readonly showLevelUp: boolean
  ) {}

  static create(gameSettings: GameSettings): GameSession {
    return new GameSession(
      Tower.empty(),
      Problem.empty(gameSettings.getMode()),
      Score.zero(),
      Level.initial(),
      GameStatus.stopped(),
      [],
      gameSettings,
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
      this.gameSettings,
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
      this.gameSettings,
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
          tower,
          Problem.empty(this.gameSettings.getMode()),
          newScore,
          newLevel,
          this.status,
          this.fallingBlocks,
          this.gameSettings,
          showLevelUp
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
          tower,
          Problem.empty(this.gameSettings.getMode()),
          newScore,
          this.level,
          this.status,
          newFallingBlocks,
          this.gameSettings,
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
      this.gameSettings,
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
      this.gameSettings,
      false
    )
  }

  updateGameSettings(newGameSettings: GameSettings): GameSession {
    return new GameSession(
      this.tower,
      Problem.empty(newGameSettings.getMode()),
      this.score,
      this.level,
      this.status,
      this.fallingBlocks,
      newGameSettings,
      this.showLevelUp
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
      this.gameSettings,
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
    return this.gameSettings.getMode()
  }

  getGameSettings(): GameSettings {
    return this.gameSettings
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
      mode: this.gameSettings.getMode(),
      tables: this.gameSettings.getTables(),
      showLevelUp: this.showLevelUp,
    }
  }
}

export type GameEvent =
  | { type: 'CORRECT_ANSWER'; block: Block }
  | { type: 'WRONG_ANSWER'; removedBlocks: number; fallingBlock: Block }
  | { type: 'TOWER_COMPLETED'; level: number }
  | { type: 'LEVEL_UP'; level: number }
