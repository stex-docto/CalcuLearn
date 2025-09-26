import {
  Answer,
  GameMode,
  GameSettings,
  Operation,
  Options,
  ProblemId,
  Question,
  TableSelection,
} from '@/domain'

export class Problem {
  constructor(
    public readonly id: ProblemId,
    public readonly question: Question,
    public readonly answer: Answer,
    public readonly options: Options,
    public readonly tableSelection: TableSelection | null,
    public readonly operation: Operation
  ) {}

  static create(
    question: string,
    answer: number,
    options: number[],
    operation: 'addition' | 'multiplication',
    tableSelection?: TableSelection
  ): Problem {
    return new Problem(
      ProblemId.generate(),
      Question.create(question),
      Answer.create(answer),
      Options.create(options),
      tableSelection || null,
      Operation.create(operation)
    )
  }

  static empty(operation: 'addition' | 'multiplication'): Problem {
    return new Problem(
      ProblemId.empty(),
      Question.empty(),
      Answer.create(0),
      Options.empty(),
      null,
      Operation.create(operation)
    )
  }

  static generate(gameSettings: GameSettings): Problem {
    const mode = gameSettings.mode
    const tableSelection = gameSettings.tableSelection

    if (mode === GameMode.ADDITION) {
      return this.generateAddition(tableSelection)
    } else {
      return this.generateMultiplication(tableSelection)
    }
  }

  private static generateAddition(tableSelection: TableSelection): Problem {
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

  private static generateMultiplication(
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

  private static shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  isCorrectAnswer(selectedAnswer: number): boolean {
    return this.answer.equals(selectedAnswer)
  }

  isEmpty(): boolean {
    return this.id.isEmpty()
  }

  toPlainObject() {
    return {
      id: this.id.toString(),
      question: this.question.toString(),
      answer: this.answer.toNumber(),
      options: this.options.toArray(),
      tables: this.tableSelection?.toArray() || [],
      operation: this.operation.toString() as 'addition' | 'multiplication',
    }
  }
}
