export class TableSelection {
  constructor(private readonly tables: Set<number>) {
    if (tables.size === 0) {
      throw new Error('At least one table must be selected')
    }

    for (const table of tables) {
      if (table < 1 || table > 10 || !Number.isInteger(table)) {
        throw new Error('Table numbers must be integers between 1 and 10')
      }
    }
  }

  static create(tables: number[]): TableSelection {
    return new TableSelection(new Set(tables))
  }

  static single(table: number): TableSelection {
    return new TableSelection(new Set([table]))
  }

  static all(): TableSelection {
    return new TableSelection(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
  }

  getTables(): number[] {
    return Array.from(this.tables).sort()
  }

  includes(table: number): boolean {
    return this.tables.has(table)
  }

  getRandomTable(): number {
    const tablesArray = this.getTables()
    return tablesArray[Math.floor(Math.random() * tablesArray.length)]
  }

  equals(other: TableSelection): boolean {
    const thisTables = this.getTables()
    const otherTables = other.getTables()

    return (
      thisTables.length === otherTables.length &&
      thisTables.every((table, index) => table === otherTables[index])
    )
  }

  toString(): string {
    const tables = this.getTables()
    if (tables.length === 1) {
      return `Table ${tables[0]}`
    }
    return `Tables ${tables.join(', ')}`
  }

  toArray(): number[] {
    return this.getTables()
  }
}
