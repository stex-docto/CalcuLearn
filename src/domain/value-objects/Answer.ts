export class Answer {
  constructor(private readonly value: number) {}

  static create(value: number): Answer {
    return new Answer(value)
  }

  equals(value: number): boolean {
    return this.value === value
  }

  toNumber(): number {
    return this.value
  }
}
