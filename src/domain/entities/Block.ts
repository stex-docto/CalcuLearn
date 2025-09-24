import { BlockId, Color, Position } from '@/domain'

export class Block {
  constructor(
    public readonly id: BlockId,
    public readonly position: Position,
    public readonly color: Color
  ) {}

  static create(): Block {
    return new Block(BlockId.generate(), Position.random(), Color.fromValue(0))
  }

  withPosition(position: Position): Block {
    return new Block(this.id, position, this.color)
  }

  toPlainObject() {
    return {
      id: this.id.toString(),
      x: this.position.x,
      y: this.position.y,
      color: this.color.toString(),
    }
  }
}
