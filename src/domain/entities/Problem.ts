import { ProblemId } from '../value-objects/ProblemId'
import { Question } from '../value-objects/Question'
import { Answer } from '../value-objects/Answer'
import { Difficulty } from '../value-objects/Difficulty'
import { Operation } from '../value-objects/Operation'
import { Options } from '../value-objects/Options'

export class Problem {
  constructor(
    public readonly id: ProblemId,
    public readonly question: Question,
    public readonly answer: Answer,
    public readonly options: Options,
    public readonly difficulty: Difficulty,
    public readonly operation: Operation
  ) {}

  static create(
    question: string,
    answer: number,
    options: number[],
    difficulty: 'easy' | 'medium' | 'hard',
    operation: 'addition' | 'multiplication'
  ): Problem {
    return new Problem(
      ProblemId.generate(),
      Question.create(question),
      Answer.create(answer),
      Options.create(options),
      Difficulty.create(difficulty),
      Operation.create(operation)
    )
  }

  static empty(operation: 'addition' | 'multiplication'): Problem {
    return new Problem(
      ProblemId.empty(),
      Question.empty(),
      Answer.create(0),
      Options.empty(),
      Difficulty.create('easy'),
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
      difficulty: this.difficulty.toString() as 'easy' | 'medium' | 'hard',
      operation: this.operation.toString() as 'addition' | 'multiplication',
    }
  }
}
