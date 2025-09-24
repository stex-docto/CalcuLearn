export class TowerHeight {
  constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('Tower height cannot be negative')
    }
  }

  static create(value: number): TowerHeight {
    return new TowerHeight(Math.max(0, value))
  }

  static zero(): TowerHeight {
    return new TowerHeight(0)
  }

  equals(other: TowerHeight): boolean {
    return this.value === other.value
  }

  toNumber(): number {
    return this.value
  }

  isEmpty(): boolean {
    return this.value === 0
  }

  exceedsMaxVisible(maxVisible: number): boolean {
    return this.value > maxVisible
  }

  getHiddenCount(maxVisible: number): number {
    return Math.max(0, this.value - maxVisible)
  }
}
