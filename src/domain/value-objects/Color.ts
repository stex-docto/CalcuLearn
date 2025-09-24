export class Color {
  private static readonly COLORS = [
    'red.400',
    'teal.400',
    'blue.400',
    'green.400',
    'yellow.400',
    'purple.400',
    'cyan.400',
    'orange.400',
    'pink.400',
    'indigo.400',
  ]

  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Color cannot be empty')
    }
  }

  static fromValue(value: number): Color {
    const colorValue = Color.COLORS[value % Color.COLORS.length]
    return new Color(colorValue)
  }

  static fromString(value: string): Color {
    return new Color(value)
  }

  equals(other: Color): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
