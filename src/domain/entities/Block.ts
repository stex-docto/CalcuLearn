import { BlockId } from '../value-objects/BlockId'
import { BlockValue } from '../value-objects/BlockValue'
import { Position } from '../value-objects/Position'
import { Color } from '../value-objects/Color'

export class Block {
  constructor(
    public readonly id: BlockId,
    public readonly value: BlockValue,
    public readonly decay: BlockValue,
    public readonly position: Position,
    public readonly color: Color
  ) {}

  static create(value: number): Block {
    return new Block(
      BlockId.generate(),
      BlockValue.create(value),
      BlockValue.create(value),
      Position.random(),
      Color.fromValue(value)
    )
  }

  withPosition(position: Position): Block {
    return new Block(this.id, this.value, this.decay, position, this.color)
  }

  toPlainObject() {
    return {
      id: this.id.toString(),
      value: this.value.toNumber(),
      decay: this.decay.toNumber(),
      x: this.position.x,
      y: this.position.y,
      color: this.color.toString(),
    }
  }
}
