import {
  AdditionStrategy,
  Answer,
  Operation,
  GameSettings,
  MultiplicationStrategy,
  Options,
  ProblemGenerationStrategy,
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
    operation: Operation,
    tableSelection?: TableSelection
  ): Problem {
    return new Problem(
      ProblemId.generate(),
      Question.create(question),
      Answer.create(answer),
      Options.create(options),
      tableSelection || null,
      operation
    )
  }

  static empty(operation: Operation): Problem {
    return new Problem(
      ProblemId.empty(),
      Question.empty(),
      Answer.create(0),
      Options.empty(),
      null,
      operation
    )
  }

  static generate(gameSettings: GameSettings): Problem {
    const strategy = this.getStrategy(gameSettings.mode)
    return strategy.generate(gameSettings.tableSelection)
  }

  private static getStrategy(mode: Operation): ProblemGenerationStrategy {
    if (mode === Operation.ADDITION) {
      return new AdditionStrategy()
    } else {
      return new MultiplicationStrategy()
    }
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
      operation: this.operation.toString(),
    }
  }
}
