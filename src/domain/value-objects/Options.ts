export class Options {
  constructor(private readonly values: number[]) {}

  static create(values: number[]): Options {
    return new Options([...values])
  }

  static empty(): Options {
    return new Options([])
  }

  toArray(): number[] {
    return [...this.values]
  }

  isEmpty(): boolean {
    return this.values.length === 0
  }
}
