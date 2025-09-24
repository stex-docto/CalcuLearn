export class Score {
  constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('Score cannot be negative')
    }
  }

  static create(value: number): Score {
    return new Score(Math.max(0, value))
  }

  static zero(): Score {
    return new Score(0)
  }

  add(points: number): Score {
    return new Score(this.value + points)
  }

  subtract(points: number): Score {
    return new Score(Math.max(0, this.value - points))
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
