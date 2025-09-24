import { HighScore, HighScoreRepositoryPort } from '@/application'
import { GameMode } from '@/domain'

export class LocalStorageHighScoreAdapter implements HighScoreRepositoryPort {
  getHighScores(mode: GameMode): HighScore[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey(mode))
      if (!stored) return []

      const rawScores = JSON.parse(stored) as unknown[]
      const scores: HighScore[] = rawScores.map((rawScore) => {
        const score = rawScore as Record<string, unknown>
        return {
          ...score,
          mode:
            typeof score.mode === 'string'
              ? (score.mode as 'addition' | 'multiplication')
              : score.mode,
        } as HighScore
      })
      return scores.sort((a, b) => b.score - a.score).slice(0, 10) // Keep only top 10
    } catch (error) {
      console.error('Error loading high scores:', error)
      return []
    }
  }

  addScore(score: HighScore): void {
    try {
      const mode = score.mode
      const existingScores = this.getHighScores(mode)

      // Check if this score ID already exists (for live updates)
      const existingIndex = existingScores.findIndex((s) => s.id === score.id)

      let newScores: HighScore[]
      if (existingIndex >= 0) {
        // Update existing score
        newScores = [...existingScores]
        newScores[existingIndex] = score
      } else {
        // Add new score
        newScores = [...existingScores, score]
      }

      // Sort by score descending and keep only top 10
      const topScores = newScores.sort((a, b) => b.score - a.score).slice(0, 10)

      localStorage.setItem(this.getStorageKey(mode), JSON.stringify(topScores))
    } catch (error) {
      console.error('Error saving high score:', error)
    }
  }

  clearScores(mode: GameMode): void {
    try {
      localStorage.removeItem(this.getStorageKey(mode))
    } catch (error) {
      console.error('Error clearing high scores:', error)
    }
  }

  private getStorageKey(mode: GameMode): string {
    return `calculearn-scores-${mode}`
  }
}
