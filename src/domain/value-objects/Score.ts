export class Score {
  constructor(
    private readonly value: number,
    private readonly floorValue: number
  ) {
    if (value < 0) {
      throw new Error('Score cannot be negative')
    }
  }

  static create(value: number, floorValue = 0): Score {
    return new Score(Math.max(0, value), floorValue)
  }

  static zero(): Score {
    return new Score(0, 0)
  }

  add(points: number): Score {
    return new Score(this.value + points, this.floorValue)
  }

  bank(): Score {
    const max = Math.max(this.value, this.floorValue)
    return new Score(max, max)
  }

  subtract(points: number): Score {
    const value = this.value - points
    const max = Math.max(value, this.floorValue)
    return new Score(max, this.floorValue)
  }

  equals(other: Score): boolean {
    return this.value === other.value
  }

  toNumber(): number {
    return this.value
  }

  isZero(): boolean {
    return this.value === 0
  }
}
