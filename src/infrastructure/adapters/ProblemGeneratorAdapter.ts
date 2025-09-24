import { ProblemGeneratorPort } from '@/application'
import { GameMode, GameSettings, Problem, TableSelection } from '@/domain'

export class ProblemGeneratorAdapter implements ProblemGeneratorPort {
  generateProblem(gameSettings: GameSettings): Problem {
    const mode = gameSettings.getMode()
    const tableSelection = gameSettings.getTableSelection()

    if (mode === GameMode.ADDITION) {
      return this.generateAdditionProblem(tableSelection)
    } else {
      return this.generateMultiplicationProblem(tableSelection)
    }
  }

  private generateAdditionProblem(tableSelection: TableSelection): Problem {
    const num1 = tableSelection.getRandomTable()
    const num2 = Math.floor(Math.random() * 9) + 1

    const answer = num1 + num2
    const wrongAnswers = [
      answer + Math.floor(Math.random() * 10) + 1,
      answer - Math.floor(Math.random() * 10) - 1,
      answer + Math.floor(Math.random() * 20) + 5,
    ]

    const options = this.shuffleArray([answer, ...wrongAnswers])

    return Problem.create(
      `${num1} + ${num2} = ?`,
      answer,
      options,
      'addition',
      tableSelection
    )
  }

  private generateMultiplicationProblem(
    tableSelection: TableSelection
  ): Problem {
    const num1 = tableSelection.getRandomTable()
    const num2 = Math.floor(Math.random() * 9) + 1

    const answer = num1 * num2
    const wrongAnswers = [
      answer + Math.floor(Math.random() * 15) + 1,
      answer - Math.floor(Math.random() * 15) - 1,
      answer + Math.floor(Math.random() * 25) + 5,
    ]

    const options = this.shuffleArray([answer, ...wrongAnswers])

    return Problem.create(
      `${num1} × ${num2} = ?`,
      answer,
      options,
      'multiplication',
      tableSelection
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
