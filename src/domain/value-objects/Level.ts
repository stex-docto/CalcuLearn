export class Level {
  constructor(private readonly value: number) {
    if (value < 1) {
      throw new Error('Level must be at least 1')
    }
  }

  static create(value: number): Level {
    return new Level(Math.max(1, value))
  }

  static initial(): Level {
    return new Level(1)
  }

  increment(): Level {
    return new Level(this.value + 1)
  }

  equals(other: Level): boolean {
    return this.value === other.value
  }

  toNumber(): number {
    return this.value
  }

  isInitial(): boolean {
    return this.value === 1
  }
}
