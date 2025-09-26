import { GameMode, TableSelection } from '@/domain'

export class GameSettings {
  constructor(
    public readonly mode: GameMode,
    public readonly tableSelection: TableSelection
  ) {}

  static create(mode: GameMode, tables: number[]): GameSettings {
    return new GameSettings(mode, TableSelection.create(tables))
  }

  static createWithAllTables(mode: GameMode): GameSettings {
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
