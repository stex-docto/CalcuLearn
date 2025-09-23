import { Badge, Box, HStack, Text, VStack } from '@chakra-ui/react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { GameState } from '@/types/game'
import { t } from '@/utils/translations'

interface GameStatsProps {
  gameState: GameState
}

export default function GameStats({ gameState }: GameStatsProps) {
  const modeColor = gameState.mode === 'addition' ? 'blue' : 'purple'

  return (
    <HStack gap={6} justify="space-between" wrap="wrap">
      <VStack gap={1} align="center">
        <Text fontSize="sm" color="gray.600">
          {t('statsModeAndLevel')}
        </Text>
        <HStack>
          <Badge colorScheme={modeColor} fontSize="sm" px={2} py={1}>
            {gameState.mode === 'addition' ? <FaPlus /> : <FaTimes />}
          </Badge>
          <Badge colorScheme="green" fontSize="lg" px={3} py={1}>
            {gameState.level}
          </Badge>
        </HStack>
      </VStack>

      <VStack gap={1} align="end">
        <Text fontSize="sm" color="gray.600">
          {t('statsLives')}
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
