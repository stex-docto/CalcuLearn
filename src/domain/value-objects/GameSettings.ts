import { Operation, TableSelection } from '@/domain'

export class GameSettings {
  constructor(
    public readonly mode: Operation,
    public readonly tableSelection: TableSelection
  ) {}

  static create(mode: Operation, tables: number[]): GameSettings {
    return new GameSettings(mode, TableSelection.create(tables))
  }

  static createWithAllTables(mode: Operation): GameSettings {
    return new GameSettings(mode, TableSelection.all())
  }

  equals(other: GameSettings): boolean {
    return (
      this.mode === other.mode &&
      this.tableSelection.equals(other.tableSelection)
    )
  }

  toString(): string {
    return `${this.mode} - ${this.tableSelection.toString()}`
  }
}
