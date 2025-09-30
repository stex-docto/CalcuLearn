import { Operation, TableSelection } from '@/domain'
import { Problem } from '@/domain/entities/Problem'

export interface ProblemGenerationStrategy {
  generate(tableSelection: TableSelection): Problem

  generateAllProblems(tableSelection: TableSelection): Problem[]

  getOperationSymbol(): string

  getOperationName(): Operation

  calculate(num1: number, num2: number): number

  generateWrongAnswers(correctAnswer: number): number[]
}

export abstract class BaseProblemGenerationStrategy
  implements ProblemGenerationStrategy
{
  abstract getOperationSymbol(): string

  abstract getOperationName(): Operation

  abstract calculate(num1: number, num2: number): number

  abstract generateWrongAnswers(correctAnswer: number): number[]

  generate(tableSelection: TableSelection): Problem {
    const num1 = tableSelection.getRandomTable()
    const num2 = Math.floor(Math.random() * 10) + 1

    const answer = this.calculate(num1, num2)
    const wrongAnswers = this.generateWrongAnswers(answer)
    const options = this.shuffleArray([answer, ...wrongAnswers])

    return Problem.create(
      `${num1} ${this.getOperationSymbol()} ${num2} = ?`,
      answer,
      options,
      this.getOperationName(),
      tableSelection
    )
  }

  generateAllProblems(tableSelection: TableSelection): Problem[] {
    const problems: Problem[] = []
    const tables = tableSelection.getTables()

    for (const table of tables) {
      for (let num2 = 1; num2 <= 10; num2++) {
        const answer = this.calculate(table, num2)
        const wrongAnswers = this.generateWrongAnswers(answer)
        const options = this.shuffleArray([answer, ...wrongAnswers])

        const problem = Problem.create(
          `${table} ${this.getOperationSymbol()} ${num2} = ?`,
          answer,
          options,
          this.getOperationName(),
          tableSelection
        )

        problems.push(problem)
      }
    }

    return problems
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
