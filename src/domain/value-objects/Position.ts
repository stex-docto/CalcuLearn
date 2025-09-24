export class Position {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}

  static create(x: number, y: number): Position {
    return new Position(x, y)
  }

  static random(): Position {
    return new Position(Math.random() * 400, 0)
  }

  static origin(): Position {
    return new Position(0, 0)
  }

  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y
  }

  withY(y: number): Position {
    return new Position(this.x, y)
  }

  withX(x: number): Position {
    return new Position(x, this.y)
  }
}
