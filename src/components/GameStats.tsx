import { Badge, HStack, Text, VStack } from '@chakra-ui/react'
import { GameMode } from '@/domain'
import { GameState } from '@/presentation/types/GameState'
import { t } from '@/utils/translations'

interface GameStatsProps {
  gameState: GameState
}

export default function GameStats({ gameState }: GameStatsProps) {
  const modeColor = gameState.mode === GameMode.ADDITION ? 'blue' : 'purple'

  return (
    <HStack gap={6} justify="space-between" wrap="wrap">
      <VStack gap={1} align="start">
        <Text fontSize="sm" color="gray.600">
          {t('statsScore')}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color={`${modeColor}.600`}>
          {gameState.score.toLocaleString()}
        </Text>
      </VStack>

      <VStack gap={1} align="center">
        <Text fontSize="sm" color="gray.600">
          {t('statsLevel')}
        </Text>
        <HStack>
          <Badge colorScheme="green" fontSize="lg" px={3} py={1}>
            {gameState.level}
          </Badge>
        </HStack>
      </VStack>
    </HStack>
  )
}
