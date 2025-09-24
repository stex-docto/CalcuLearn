export class MultiplicationTable {
  constructor(private readonly value: number) {
    if (value < 1 || value > 10 || !Number.isInteger(value)) {
      throw new Error(
        'Multiplication table must be an integer between 1 and 10'
      )
    }
  }

  static create(value: number): MultiplicationTable {
    return new MultiplicationTable(value)
  }

  toNumber(): number {
    return this.value
  }

  equals(other: MultiplicationTable): boolean {
    return this.value === other.toNumber()
  }

  toString(): string {
    return this.value.toString()
  }
}
