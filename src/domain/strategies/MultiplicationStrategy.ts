import { BaseProblemGenerationStrategy, Operation } from '@/domain'

export class MultiplicationStrategy extends BaseProblemGenerationStrategy {
  getOperationSymbol(): string {
    return '×'
  }

  getOperationName(): Operation {
    return Operation.MULTIPLICATION
  }

  calculate(num1: number, num2: number): number {
    return num1 * num2
  }

  generateWrongAnswers(correctAnswer: number): number[] {
    return [
      correctAnswer + Math.floor(Math.random() * 15) + 1,
      correctAnswer - Math.floor(Math.random() * 15) - 1,
      correctAnswer + Math.floor(Math.random() * 25) + 5,
    ]
  }
}
