export enum GameMode {
  ADDITION = 'addition',
  MULTIPLICATION = 'multiplication',
}

// Helper function to get all values
export function getAllGameModes(): GameMode[] {
  return Object.values(GameMode)
}
