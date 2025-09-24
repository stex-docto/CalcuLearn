export class BlockValue {
  constructor(private readonly value: number) {
    if (value < 1) {
      throw new Error('BlockValue must be at least 1')
    }
  }

  static create(value: number): BlockValue {
    return new BlockValue(value)
  }

  equals(other: BlockValue): boolean {
    return this.value === other.value
  }

  toNumber(): number {
    return this.value
  }
}
