import { Box, Container, Flex, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import GameBoard from '@/components/GameBoard'
import ProblemDisplay from '@/components/ProblemDisplay'
import HighScores from '@/components/HighScores'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useGameLogic } from '@/hooks/useGameLogic'
import { useProblemGenerator } from '@/hooks/useProblemGenerator'
import { useHighScores } from '@/hooks/useHighScores'
import { UI_Provider } from './ui'

function App() {
  const {
    gameState,
    answerProblem,
    startGame,
    gameOver,
    updateCurrentProblem,
  } = useGameLogic()
  const { generateProblem } = useProblemGenerator()
  const { highScores, addScore, clearScores } = useHighScores(gameState.mode)

  useEffect(() => {
    if (gameState.isGameRunning && !gameState.currentProblem.id) {
      const problem = generateProblem(gameState.level, gameState.mode)
      updateCurrentProblem(problem)
    }
  }, [
    gameState.isGameRunning,
    gameState.currentProblem.id,
    gameState.level,
    gameState.mode,
    generateProblem,
    updateCurrentProblem,
  ])

  useEffect(() => {
    if (gameState.lives <= 0 && gameState.isGameRunning) {
      gameOver()
      if (gameState.score > 0) {
        addScore({
          id: Date.now().toString(),
          score: gameState.score,
          date: new Date().toISOString(),
          level: gameState.level,
          mode: gameState.mode,
        })
      }
    }
  }, [
    gameState.lives,
    gameState.isGameRunning,
    gameState.score,
    gameState.level,
    gameState.mode,
    gameOver,
    addScore,
  ])

  return (
    <UI_Provider>
      <Flex direction="column" minH="100vh">
        <Header gameState={gameState} onStartGame={startGame} />

        <Container maxW="container.xl" py={8} as="main" flex="1">
          <VStack gap={8} align="stretch">
            <Box
              display="flex"
              gap={8}
              flexDirection={{ base: 'column', lg: 'row' }}
            >
              <Box flex="2">
                <GameBoard gameState={gameState} onStartGame={startGame} />
              </Box>

              <Box flex="1">
                <VStack gap={6} align="stretch">
                  <ProblemDisplay
                    problem={gameState.currentProblem}
                    onAnswer={answerProblem}
                    isGameRunning={gameState.isGameRunning}
                  />

                  <HighScores
                    scores={highScores}
                    mode={gameState.mode}
                    onClear={clearScores}
                  />
                </VStack>
              </Box>
            </Box>
          </VStack>
        </Container>

        <Footer />
      </Flex>
    </UI_Provider>
  )
}

export default App
