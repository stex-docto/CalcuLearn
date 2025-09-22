import { Box, Button, Flex, Text, VStack, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { GameState } from '@/types/game'
import TowerDisplay from './TowerDisplay'
import GameStats from './GameStats'

interface GameBoardProps {
  gameState: GameState
  onStartGame: () => void
}

const MotionBox = motion.create(Box)

export default function GameBoard({ gameState, onStartGame }: GameBoardProps) {
  if (!gameState.isGameRunning && gameState.tower.length === 0) {
    return (
      <VStack spacing={6} align="center" minH="400px" justify="center">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize="xl" textAlign="center" color="gray.600" mb={4}>
            Build your math tower by solving problems correctly!
          </Text>
          <Text fontSize="md" textAlign="center" color="gray.500" mb={6}>
            ✅ Correct answers add blocks to your tower
            <br />
            ❌ Wrong answers make blocks fall down
            <br />
            🏗️ Build the highest tower possible!
          </Text>
          <Button
            size="lg"
            colorScheme="blue"
            onClick={onStartGame}
            px={8}
            py={6}
            fontSize="lg"
          >
            Start Game
          </Button>
        </MotionBox>
      </VStack>
    )
  }

  return (
    <VStack spacing={4} align="stretch">
      <GameStats gameState={gameState} />

      <Box
        bg="gray.50"
        borderRadius="lg"
        p={6}
        minH="500px"
        position="relative"
        overflow="hidden"
        border="2px solid"
        borderColor="gray.200"
      >
        <TowerDisplay
          tower={gameState.tower}
          fallingBlocks={gameState.fallingBlocks}
        />

        {!gameState.isGameRunning && (
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0,0,0,0.8)"
            align="center"
            justify="center"
            flexDirection="column"
            gap={4}
          >
            <Text fontSize="2xl" color="white" fontWeight="bold">
              Game Over!
            </Text>
            <Text fontSize="lg" color="white">
              Final Score: {gameState.score}
            </Text>
            <Button colorScheme="blue" size="lg" onClick={onStartGame}>
              Play Again
            </Button>
          </Flex>
        )}
      </Box>
    </VStack>
  )
}
