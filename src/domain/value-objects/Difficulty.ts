export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export class Difficulty {
  constructor(private readonly value: DifficultyLevel) {}

  static create(value: DifficultyLevel): Difficulty {
    return new Difficulty(value)
  }

  static fromLevel(level: number): Difficulty {
    if (level >= 10) return new Difficulty('hard')
    if (level >= 5) return new Difficulty('medium')
    return new Difficulty('easy')
  }

  equals(other: Difficulty): boolean {
    return this.value === other.value
  }

  toString(): DifficultyLevel {
    return this.value
  }
}
