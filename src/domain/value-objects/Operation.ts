export type OperationType = 'addition' | 'multiplication'

export class Operation {
  constructor(private readonly value: OperationType) {}

  static create(value: OperationType): Operation {
    return new Operation(value)
  }

  equals(other: Operation): boolean {
    return this.value === other.value
  }

  toString(): OperationType {
    return this.value
  }

  isAddition(): boolean {
    return this.value === 'addition'
  }

  isMultiplication(): boolean {
    return this.value === 'multiplication'
  }
}
