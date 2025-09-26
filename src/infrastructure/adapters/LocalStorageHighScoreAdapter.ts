import {
  HighScore,
  HighScoreChangeListener,
  HighScoreRepositoryPort,
} from '@/application'
import { GameMode } from '@/domain'
import { ScoreNotification } from '@/application/ports/HighScoreRepositoryPort.ts'

export class LocalStorageHighScoreAdapter implements HighScoreRepositoryPort {
  private listeners: Set<HighScoreChangeListener> = new Set()

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

      const existingScores = new Map<HighScore['id'], HighScore>()
      this.getHighScores(mode).forEach((s) => existingScores.set(s.id, s))

      existingScores.set(score.id, score)

      // Sort by score descending and keep only top 10
      const topScores = [...existingScores.values()]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)

      localStorage.setItem(this.getStorageKey(mode), JSON.stringify(topScores))
      this.notifyListeners(mode, topScores)
    } catch (error) {
      console.error('Error saving high score:', error)
    }
  }

  subscribe(listener: HighScoreChangeListener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners(mode: GameMode, scores: ScoreNotification): void {
    this.listeners.forEach((listener) => listener(mode, scores))
  }

  private getStorageKey(mode: GameMode): string {
    return `calculearn-scores-${mode}`
  }
}
