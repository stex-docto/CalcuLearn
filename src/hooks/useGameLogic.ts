import { useCallback, useState } from 'react'
import { Block, GameMode, GameState } from '@/types/game'
import { generateBlockColor, generateId } from '@/utils/helpers'

const createInitialGameState = (mode: GameMode): GameState => ({
  tower: [],
  currentProblem: {
    id: '',
    question: '',
    answer: 0,
    options: [],
    difficulty: 'easy',
    operation: mode,
  },
  score: 0,
  level: 1,
  lives: 3,
  isGameRunning: false,
  fallingBlocks: [],
  mode,
})

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(
    createInitialGameState('addition')
  )

  const startGame = useCallback((mode: GameMode = 'addition') => {
    setGameState({
      ...createInitialGameState(mode),
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

  const changeMode = useCallback((newMode: GameMode) => {
    setGameState((prev) => ({
      ...prev,
      mode: newMode,
      currentProblem: {
        id: '',
        question: '',
        answer: 0,
        options: [],
        difficulty: 'easy',
        operation: newMode,
      },
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
          level: Math.floor((prev.score + blockValue * prev.level) / 100) + 1,
          currentProblem: {
            id: '',
            question: '',
            answer: 0,
            options: [],
            difficulty: 'easy',
            operation: prev.mode,
          },
        }))
      } else {
        // Create a falling block for wrong answers (doesn't add to tower)
        const blockValue = Math.max(
          1,
          Math.floor(gameState.currentProblem.answer / 10)
        )
        const fallingBlock: Block = {
          id: generateId(),
          value: blockValue,
          decay: blockValue,
          x: Math.random() * 400,
          y: 0,
          color: generateBlockColor(blockValue),
        }

        setGameState((prev) => ({
          ...prev,
          lives: prev.lives - 1,
          fallingBlocks: [...prev.fallingBlocks, fallingBlock],
          currentProblem: {
            id: '',
            question: '',
            answer: 0,
            options: [],
            difficulty: 'easy',
            operation: prev.mode,
          },
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
    changeMode,
    answerProblem,
    updateCurrentProblem,
    updateFallingBlocks,
  }
}
