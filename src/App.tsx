import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { GameState, Problem } from '@/types/game'
import GameBoard from '@/components/GameBoard'
import ProblemDisplay from '@/components/ProblemDisplay'
import HighScores from '@/components/HighScores'
import { useGameLogic } from '@/hooks/useGameLogic'
import { useProblemGenerator } from '@/hooks/useProblemGenerator'
import { useHighScores } from '@/hooks/useHighScores'

function App() {
  const {
    gameState,
    answerProblem,
    startGame,
    gameOver,
    updateCurrentProblem,
  } = useGameLogic()
  const { generateProblem } = useProblemGenerator()
  const { highScores, addScore, clearScores } = useHighScores()

  useEffect(() => {
    if (gameState.isGameRunning && !gameState.currentProblem.id) {
      const problem = generateProblem(gameState.level)
      updateCurrentProblem(problem)
    }
  }, [
    gameState.isGameRunning,
    gameState.currentProblem.id,
    gameState.level,
    generateProblem,
    updateCurrentProblem,
  ])

  useEffect(() => {
    if (gameState.isGameRunning && gameState.currentProblem.id) {
      const problem = generateProblem(gameState.level)
      updateCurrentProblem(problem)
    }
  }, [gameState.score])

  useEffect(() => {
    if (gameState.lives <= 0 && gameState.isGameRunning) {
      gameOver()
      if (gameState.score > 0) {
        addScore({
          id: Date.now().toString(),
          score: gameState.score,
          date: new Date().toISOString(),
          level: gameState.level,
        })
      }
    }
  }, [
    gameState.lives,
    gameState.isGameRunning,
    gameState.score,
    gameState.level,
    gameOver,
    addScore,
  ])

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" color="blue.500" mb={2}>
            CalcuLearn
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Build your tower by solving math problems!
          </Text>
        </Box>

        <Box
          display="flex"
          gap={8}
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Box flex="2">
            <GameBoard gameState={gameState} onStartGame={startGame} />
          </Box>

          <Box flex="1">
            <VStack spacing={6} align="stretch">
              <ProblemDisplay
                problem={gameState.currentProblem}
                onAnswer={answerProblem}
                isGameRunning={gameState.isGameRunning}
              />

              <HighScores scores={highScores} onClear={clearScores} />
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  )
}

export default App
