import { BaseProblemGenerationStrategy, Operation } from '@/domain'

export class AdditionStrategy extends BaseProblemGenerationStrategy {
  getOperationSymbol(): string {
    return '+'
  }

  getOperationName(): Operation {
    return Operation.ADDITION
  }

  calculate(num1: number, num2: number): number {
    return num1 + num2
  }

  generateWrongAnswers(correctAnswer: number): number[] {
    return [
      correctAnswer + Math.floor(Math.random() * 10) + 1,
      correctAnswer - Math.floor(Math.random() * 10) - 1,
      correctAnswer + Math.floor(Math.random() * 20) + 5,
    ]
  }
}
