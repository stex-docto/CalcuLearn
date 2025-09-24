import { GameMode } from '../enums/GameMode'
import { TableSelection } from './TableSelection'

export class GameSettings {
  constructor(
    private readonly mode: GameMode,
    private readonly tableSelection: TableSelection
  ) {}

  static create(mode: GameMode, tables: number[]): GameSettings {
    return new GameSettings(mode, TableSelection.create(tables))
  }

  static createWithSingleTable(mode: GameMode, table: number): GameSettings {
    return new GameSettings(mode, TableSelection.single(table))
  }

  static createWithAllTables(mode: GameMode): GameSettings {
    return new GameSettings(mode, TableSelection.all())
  }

  getMode(): GameMode {
    return this.mode
  }

  getTableSelection(): TableSelection {
    return this.tableSelection
  }

  getTables(): number[] {
    return this.tableSelection.getTables()
  }

  getRandomTable(): number {
    return this.tableSelection.getRandomTable()
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

  toPlainObject() {
    return {
      mode: this.mode,
      tables: this.tableSelection.toArray(),
    }
  }
}
