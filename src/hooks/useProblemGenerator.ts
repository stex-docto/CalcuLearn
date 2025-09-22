import { useCallback } from 'react'
import { Problem } from '@/types/game'
import { generateId, shuffleArray } from '@/utils/helpers'

export function useProblemGenerator() {
  const generateAdditionProblem = useCallback(
    (difficulty: Problem['difficulty']): Problem => {
      let num1: number, num2: number

      switch (difficulty) {
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
      }

      const answer = num1 + num2
      const wrongAnswers = [
        answer + Math.floor(Math.random() * 5) + 1,
        answer - Math.floor(Math.random() * 5) - 1,
        answer + Math.floor(Math.random() * 10) + 5,
      ]

      return {
        id: generateId(),
        question: `${num1} + ${num2} = ?`,
        answer,
        options: shuffleArray([answer, ...wrongAnswers]),
        difficulty,
        operation: 'addition',
      }
    },
    []
  )

  const generateMultiplicationProblem = useCallback(
    (difficulty: Problem['difficulty']): Problem => {
      let num1: number, num2: number

      switch (difficulty) {
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
      }

      const answer = num1 * num2
      const wrongAnswers = [
        answer + Math.floor(Math.random() * 10) + 1,
        answer - Math.floor(Math.random() * 10) - 1,
        answer + Math.floor(Math.random() * 20) + 5,
      ]

      return {
        id: generateId(),
        question: `${num1} × ${num2} = ?`,
        answer,
        options: shuffleArray([answer, ...wrongAnswers]),
        difficulty,
        operation: 'multiplication',
      }
    },
    []
  )

  const generateProblem = useCallback(
    (level: number): Problem => {
      const operations: Problem['operation'][] =
        level < 3 ? ['addition'] : ['addition', 'multiplication']
      const operation =
        operations[Math.floor(Math.random() * operations.length)]

      let difficulty: Problem['difficulty'] = 'easy'
      if (level >= 5) difficulty = 'medium'
      if (level >= 10) difficulty = 'hard'

      if (operation === 'addition') {
        return generateAdditionProblem(difficulty)
      } else {
        return generateMultiplicationProblem(difficulty)
      }
    },
    [generateAdditionProblem, generateMultiplicationProblem]
  )

  return {
    generateProblem,
    generateAdditionProblem,
    generateMultiplicationProblem,
  }
}
