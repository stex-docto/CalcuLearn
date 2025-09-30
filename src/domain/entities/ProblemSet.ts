import { GameSettings } from '@/domain'
import { Problem } from '@/domain'

export interface ProblemStats {
  attempts: number
  correct: number
  weight: number
}

export interface WeightedProblem {
  problem: Problem
  stats: ProblemStats
}

export class ProblemSet {
  private problems: Map<string, WeightedProblem>

  constructor(problems: WeightedProblem[]) {
    this.problems = new Map(
      problems.map((wp) => [wp.problem.id.toString(), wp])
    )
  }

  static generate(gameSettings: GameSettings): ProblemSet {
    const strategy = Problem['getStrategy'](gameSettings.mode)
    const allProblems = strategy.generateAllProblems(
      gameSettings.tableSelection
    )

    const weightedProblems: WeightedProblem[] = allProblems.map((problem) => ({
      problem,
      stats: {
        attempts: 0,
        correct: 0,
        weight: 5, // Start with higher weight for unanswered problems
      },
    }))

    return new ProblemSet(weightedProblems)
  }

  getRandomProblem(): Problem | null {
    const problemsArray = Array.from(this.problems.values())

    if (problemsArray.length === 0) {
      return null
    }

    // Calculate total weight
    const totalWeight = problemsArray.reduce(
      (sum, wp) => sum + wp.stats.weight,
      0
    )

    if (totalWeight === 0) {
      return null
    }

    // Pick a random value between 0 and totalWeight
    let random = Math.random() * totalWeight

    // Find the problem based on weighted selection
    for (const weightedProblem of problemsArray) {
      random -= weightedProblem.stats.weight
      if (random <= 0) {
        return weightedProblem.problem
      }
    }

    // Fallback (shouldn't happen)
    return problemsArray[problemsArray.length - 1].problem
  }

  updateProblemStats(problemId: string, isCorrect: boolean): ProblemSet {
    const newProblems = Array.from(this.problems.values()).map((wp) => {
      if (wp.problem.id.toString() === problemId) {
        const newAttempts = wp.stats.attempts + 1
        const newCorrect = wp.stats.correct + (isCorrect ? 1 : 0)

        // Weight calculation:
        // - Base weight of 1
        // - Add 2 for each incorrect answer
        // - Multiply by 2 if never answered correctly
        const incorrectAnswers = newAttempts - newCorrect
        const hasNeverBeenCorrect = newCorrect === 0 && newAttempts > 0

        let newWeight = 1 + incorrectAnswers * 2
        if (hasNeverBeenCorrect) {
          newWeight *= 2
        }

        return {
          ...wp,
          stats: {
            attempts: newAttempts,
            correct: newCorrect,
            weight: Math.max(1, newWeight), // Minimum weight of 1
          },
        }
      }
      return wp
    })

    return new ProblemSet(newProblems)
  }

  // Get overall performance stats
  getOverallStats() {
    const problems = Array.from(this.problems.values())
    const totalProblems = problems.length
    const answeredProblems = problems.filter(
      (wp) => wp.stats.attempts > 0
    ).length
    const correctProblems = problems.filter((wp) => wp.stats.correct > 0).length
    const totalAttempts = problems.reduce(
      (sum, wp) => sum + wp.stats.attempts,
      0
    )
    const totalCorrect = problems.reduce((sum, wp) => sum + wp.stats.correct, 0)

    return {
      totalProblems,
      answeredProblems,
      correctProblems,
      totalAttempts,
      totalCorrect,
      accuracy: totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0,
      completion:
        totalProblems > 0 ? (correctProblems / totalProblems) * 100 : 0,
    }
  }
}
