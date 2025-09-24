export class BlockId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('BlockId cannot be empty')
    }
  }

  static generate(): BlockId {
    return new BlockId(Math.random().toString(36).substr(2, 9))
  }

  static fromString(value: string): BlockId {
    return new BlockId(value)
  }

  equals(other: BlockId): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
