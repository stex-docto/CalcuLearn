import {
  Answer,
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
