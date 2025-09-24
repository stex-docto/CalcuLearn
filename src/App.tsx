import { Box, Container, Flex, VStack } from '@chakra-ui/react'
import { useCallback } from 'react'
import { GameMode } from '@/domain'
import GameBoard from '@/components/GameBoard'
import ProblemDisplay from '@/components/ProblemDisplay'
import HighScores from '@/components/HighScores'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'
import { useHighScores } from '@/presentation/hooks/useHighScores.ts'
import { UI_Provider } from './ui'

function App() {
  const {
    gameState,
    answerProblem,
    startGame: originalStartGame,
  } = useGameSession()

  const { highScores, addScore, clearScores } = useHighScores(gameState.mode)

  const startGame = useCallback(
    (mode: GameMode) => {
      // Save previous game score if it exists and game was running
      if (gameState.isGameRunning && gameState.score > 0) {
        addScore({
          id: Date.now().toString(),
          score: gameState.score,
          date: new Date().toISOString(),
          level: gameState.level,
          mode: gameState.mode,
        })
      }
      originalStartGame(mode)
    },
    [
      gameState.isGameRunning,
      gameState.score,
      gameState.level,
      gameState.mode,
      addScore,
      originalStartGame,
    ]
  )

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
