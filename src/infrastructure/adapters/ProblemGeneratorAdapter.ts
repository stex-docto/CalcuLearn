import { ProblemGeneratorPort } from '@/application'
import { Difficulty, GameMode, Level, Problem } from '@/domain'

export class ProblemGeneratorAdapter implements ProblemGeneratorPort {
  generateProblem(level: Level, mode: GameMode): Problem {
    const difficulty = Difficulty.fromLevel(level.toNumber())

    if (mode === GameMode.ADDITION) {
      return this.generateAdditionProblem(difficulty)
    } else {
      return this.generateMultiplicationProblem(difficulty)
    }
  }

  private generateAdditionProblem(difficulty: Difficulty): Problem {
    let num1: number, num2: number

    switch (difficulty.toString()) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        break
      case 'medium':
        num1 = Math.floor(Math.random() * 50) + 10
        num2 = Math.floor(Math.random() * 50) + 10
        break
      case 'hard':
        num1 = Math.floor(Math.random() * 100) + 50
        num2 = Math.floor(Math.random() * 100) + 50
        break
      default:
        num1 = 1
        num2 = 1
    }

    const answer = num1 + num2
    const wrongAnswers = [
      answer + Math.floor(Math.random() * 5) + 1,
      answer - Math.floor(Math.random() * 5) - 1,
      answer + Math.floor(Math.random() * 10) + 5,
    ]

    const options = this.shuffleArray([answer, ...wrongAnswers])

    return Problem.create(
      `${num1} + ${num2} = ?`,
      answer,
      options,
      difficulty.toString(),
      'addition'
    )
  }

  private generateMultiplicationProblem(difficulty: Difficulty): Problem {
    let num1: number, num2: number

    switch (difficulty.toString()) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        break
      case 'medium':
        num1 = Math.floor(Math.random() * 12) + 1
        num2 = Math.floor(Math.random() * 12) + 1
        break
      case 'hard':
        num1 = Math.floor(Math.random() * 15) + 5
        num2 = Math.floor(Math.random() * 15) + 5
        break
      default:
        num1 = 1
        num2 = 1
    }

    const answer = num1 * num2
    const wrongAnswers = [
      answer + Math.floor(Math.random() * 10) + 1,
      answer - Math.floor(Math.random() * 10) - 1,
      answer + Math.floor(Math.random() * 20) + 5,
    ]

    const options = this.shuffleArray([answer, ...wrongAnswers])

    return Problem.create(
      `${num1} × ${num2} = ?`,
      answer,
      options,
      difficulty.toString(),
      'multiplication'
    )
  }

  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }
}
