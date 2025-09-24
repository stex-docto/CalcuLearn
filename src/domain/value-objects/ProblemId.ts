export class ProblemId {
  constructor(private readonly value: string) {}

  static generate(): ProblemId {
    return new ProblemId(Math.random().toString(36).substr(2, 9))
  }

  static empty(): ProblemId {
    return new ProblemId('')
  }

  static fromString(value: string): ProblemId {
    return new ProblemId(value)
  }

  isEmpty(): boolean {
    return this.value.trim().length === 0
  }

  equals(other: ProblemId): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
