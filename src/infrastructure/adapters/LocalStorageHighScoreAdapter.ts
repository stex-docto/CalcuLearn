import { HighScore, HighScoreRepositoryPort } from '@/application'
import { GameMode } from '@/domain'

export class LocalStorageHighScoreAdapter implements HighScoreRepositoryPort {
  getHighScores(mode: GameMode): HighScore[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey(mode))
      if (!stored) return []

      const rawScores = JSON.parse(stored) as any[]
      const scores: HighScore[] = rawScores.map((score) => ({
        ...score,
        mode:
          typeof score.mode === 'string'
            ? (score.mode as 'addition' | 'multiplication')
            : score.mode,
      }))
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
      const newScores = [...existingScores, score]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10) // Keep only top 10

      localStorage.setItem(this.getStorageKey(mode), JSON.stringify(newScores))
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
