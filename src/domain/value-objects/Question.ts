export class Question {
  constructor(private readonly value: string) {}

  static create(value: string): Question {
    return new Question(value)
  }

  static empty(): Question {
    return new Question('')
  }

  isEmpty(): boolean {
    return this.value.trim().length === 0
  }

  equals(other: Question): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
