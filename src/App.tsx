import { Box, Container, Flex, VStack } from '@chakra-ui/react'
import GameBoard from '@/components/GameBoard'
import ProblemDisplay from '@/components/ProblemDisplay'
import HighScores from '@/components/HighScores'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'
import { UI_Provider } from '@/presentation'
import { GameSessionProvider } from '@/presentation/providers/GameSessionProvider'
import '@/i18n'

function AppContent() {
  const { gameState, stopGame } = useGameSession()

  return (
    <Flex direction="column" minH="100vh">
      <Header onGoHome={stopGame} />

      <Container maxW="container.xl" py={8} as="main" flex="1">
        <VStack gap={8} align="stretch">
          {gameState.isGameRunning ? (
            // During gameplay: compact layout with side high scores
            <>
              <Box flex="1">
                <GameBoard />
              </Box>

              <Box minW="300px">
                <ProblemDisplay />
              </Box>
            </>
          ) : (
            // Menu/home view: standard layout
            <Box
              display="flex"
              gap={8}
              flexDirection={{ base: 'column', lg: 'row' }}
            >
              <Box flex="2">
                <GameBoard />
              </Box>

              <Box flex="1">
                <VStack gap={6} align="stretch">
                  <ProblemDisplay />
                  <HighScores mode={gameState.mode} />
                </VStack>
              </Box>
            </Box>
          )}
        </VStack>
      </Container>
      <Footer />
    </Flex>
  )
}

function App() {
  return (
    <UI_Provider>
      <GameSessionProvider>
        <AppContent />
      </GameSessionProvider>
    </UI_Provider>
  )
}

export default App
