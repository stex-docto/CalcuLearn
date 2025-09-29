import { Block } from './Block'
import { TowerHeight } from '@/domain'

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
      tower: new Tower(newBlocks),
      isComplete,
    }
  }

  removeTopBlocks(count: number): { tower: Tower; removedBlocks: Block[] } {
    const blocksToRemove = Math.min(count, this.blocks.length)

    if (blocksToRemove === 0) {
      return {
        tower: new Tower(this.blocks),
        removedBlocks: [],
      }
    }

    const removedBlocks = this.blocks.slice(-blocksToRemove)
    const remainingBlocks =
      blocksToRemove === this.blocks.length
        ? []
        : this.blocks.slice(0, -blocksToRemove)

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

  toPlainArray() {
    return this.blocks.map((block) => block.toPlainObject())
  }
}
