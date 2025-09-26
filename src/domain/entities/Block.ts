import { BlockId, Color, Position } from '@/domain'

export class Block {
  constructor(
    public readonly id: BlockId,
    public readonly position: Position,
    public readonly color: Color,
    public readonly blockIndex: number = 0 // 0-9 for the 10 blocks in a level
  ) {}

  static create(blockIndex: number = 0): Block {
    return new Block(
      BlockId.generate(),
      Position.random(),
      Color.fromValue(blockIndex),
      blockIndex
    )
  }

  withPosition(position: Position): Block {
    return new Block(this.id, position, this.color, this.blockIndex)
  }

  toPlainObject() {
    return {
      id: this.id.toString(),
      x: this.position.x,
      y: this.position.y,
      color: this.color.toString(),
      blockIndex: this.blockIndex,
    }
  }
}
