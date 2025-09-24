import { Block } from './Block'
import { TowerHeight } from '../value-objects/TowerHeight'
import { Level } from '../value-objects/Level'

export class Tower {
  private static readonly MAX_HEIGHT = 10

  constructor(private readonly blocks: Block[]) {}

  static empty(): Tower {
    return new Tower([])
  }

  addBlock(block: Block): { tower: Tower; isComplete: boolean } {
    const newBlocks = [...this.blocks, block]
    const isComplete = newBlocks.length >= Tower.MAX_HEIGHT

    return {
      tower: new Tower(isComplete ? [] : newBlocks),
      isComplete,
    }
  }

  removeTopBlocks(count: number): { tower: Tower; removedBlocks: Block[] } {
    const blocksToRemove = Math.min(count, this.blocks.length)
    const removedBlocks = this.blocks.slice(-blocksToRemove)
    const remainingBlocks = this.blocks.slice(0, -blocksToRemove)

    return {
      tower: new Tower(remainingBlocks),
      removedBlocks,
    }
  }

  getHeight(): TowerHeight {
    return TowerHeight.create(this.blocks.length)
  }

  getBlocks(): Block[] {
    return [...this.blocks]
  }

  getVisibleBlocks(maxVisible: number): Block[] {
    return this.blocks.slice(-maxVisible)
  }

  isEmpty(): boolean {
    return this.blocks.length === 0
  }

  calculateScore(level: Level): number {
    return this.blocks.reduce((total, block) => {
      return total + block.value.toNumber() * level.toNumber()
    }, 0)
  }

  toPlainArray() {
    return this.blocks.map((block) => block.toPlainObject())
  }
}
