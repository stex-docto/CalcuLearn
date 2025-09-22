import { HStack, VStack, Text, Box, Badge } from '@chakra-ui/react'
import { GameState } from '@/types/game'

interface GameStatsProps {
  gameState: GameState
}

export default function GameStats({ gameState }: GameStatsProps) {
  return (
    <HStack spacing={6} justify="space-between" wrap="wrap">
      <VStack spacing={1} align="start">
        <Text fontSize="sm" color="gray.600">
          Score
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="blue.600">
          {gameState.score.toLocaleString()}
        </Text>
      </VStack>

      <VStack spacing={1} align="center">
        <Text fontSize="sm" color="gray.600">
          Level
        </Text>
        <Badge colorScheme="green" fontSize="lg" px={3} py={1}>
          {gameState.level}
        </Badge>
      </VStack>

      <VStack spacing={1} align="end">
        <Text fontSize="sm" color="gray.600">
          Lives
        </Text>
        <HStack>
          {Array.from({ length: 3 }).map((_, i) => (
            <Box
              key={i}
              width="20px"
              height="20px"
              borderRadius="full"
              bg={i < gameState.lives ? 'red.500' : 'gray.300'}
            />
          ))}
        </HStack>
      </VStack>
    </HStack>
  )
}
