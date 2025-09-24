export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function generateBlockColor(value: number): string {
  const colors = [
    'red.400', // Red
    'teal.400', // Teal
    'blue.400', // Blue
    'green.400', // Green
    'yellow.400', // Yellow
    'purple.400', // Purple
    'cyan.400', // Cyan
    'orange.400', // Orange
    'pink.400', // Pink
    'indigo.400', // Indigo
  ]

  return colors[value % colors.length]
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
