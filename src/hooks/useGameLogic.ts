import { useState, useCallback } from 'react'
import { GameState, Block } from '@/types/game'
import { generateId, generateBlockColor } from '@/utils/helpers'

const initialGameState: GameState = {
  tower: [],
  currentProblem: {
    id: '',
    question: '',
    answer: 0,
    options: [],
    difficulty: 'easy',
    operation: 'addition',
  },
  score: 0,
  level: 1,
  lives: 3,
  isGameRunning: false,
  fallingBlocks: [],
}

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  const startGame = useCallback(() => {
    setGameState({
      ...initialGameState,
      isGameRunning: true,
      lives: 3,
    })
  }, [])

  const gameOver = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameRunning: false,
    }))
  }, [])

  const addBlockToTower = useCallback((value: number) => {
    const newBlock: Block = {
      id: generateId(),
      value,
      decay: value,
      x: Math.random() * 400,
      y: 0,
      color: generateBlockColor(value),
    }

    setGameState((prev) => ({
      ...prev,
      tower: [...prev.tower, newBlock],
      score: prev.score + value * prev.level,
    }))
  }, [])

  const removeBlocksFromTower = useCallback((count: number) => {
    setGameState((prev) => {
      const blocksToRemove = Math.min(count, prev.tower.length)
      const newFallingBlocks = prev.tower
        .slice(-blocksToRemove)
        .map((block) => ({
          ...block,
          y: -block.y,
        }))

      return {
        ...prev,
        tower: prev.tower.slice(0, -blocksToRemove),
        fallingBlocks: [...prev.fallingBlocks, ...newFallingBlocks],
        score: Math.max(0, prev.score - count * 10),
      }
    })
  }, [])

  const answerProblem = useCallback(
    (selectedAnswer: number) => {
      if (!gameState.isGameRunning) return

      const isCorrect = selectedAnswer === gameState.currentProblem.answer

      if (isCorrect) {
        const blockValue = Math.max(
          1,
          Math.floor(gameState.currentProblem.answer / 10)
        )
        addBlockToTower(blockValue)

        setGameState((prev) => ({
          ...prev,
          level: Math.floor(prev.score / 100) + 1,
        }))
      } else {
        removeBlocksFromTower(2)
        setGameState((prev) => ({
          ...prev,
          lives: prev.lives - 1,
        }))
      }
    },
    [
      gameState.isGameRunning,
      gameState.currentProblem.answer,
      addBlockToTower,
      removeBlocksFromTower,
    ]
  )

  const updateCurrentProblem = useCallback(
    (problem: GameState['currentProblem']) => {
      setGameState((prev) => ({
        ...prev,
        currentProblem: problem,
      }))
    },
    []
  )

  const updateFallingBlocks = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      fallingBlocks: prev.fallingBlocks.filter((block) => block.y > -500),
    }))
  }, [])

  return {
    gameState,
    startGame,
    gameOver,
    answerProblem,
    updateCurrentProblem,
    updateFallingBlocks,
  }
}
