import { Badge, Box, HStack, Text, VStack } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { useHighScores } from '@/presentation/hooks/useHighScores.ts'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'

export default function CompactHighScores() {
  const { gameState, currentGameScoreId } = useGameSession()
  const { scores } = useHighScores(gameState.mode)

  // Create a combined list with the current game score positioned correctly
  const allScores = [...scores]

  // Add current game score if it's not already in the list
  const currentGameExists =
    currentGameScoreId && scores.some((s) => s.id === currentGameScoreId)
  if (!currentGameExists && gameState.score > 0) {
    allScores.push({
      id: 'current-temp',
      score: gameState.score,
      level: gameState.level,
      mode: gameState.mode,
      date: new Date().toISOString(),
    })
  }

  // Sort all scores and take top 10, but mark which one is current
  const sortedScores = allScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((score, index) => ({
      ...score,
      rank: index + 1,
      isCurrent: score.id === currentGameScoreId || score.id === 'current-temp',
    }))

  return (
    <Box
      bg="bg.subtle"
      p={3}
      borderRadius="md"
      border="1px solid"
      borderColor="border.muted"
      minH="300px"
      maxH="400px"
      overflow="hidden"
    >
      <VStack gap={1} align="start">
        {sortedScores.map((score) => (
          <HStack
            key={score.id}
            justify="space-between"
            py={1}
            px={2}
            borderRadius="sm"
            bg={score.isCurrent ? 'colorPalette.100' : 'transparent'}
            border={score.isCurrent ? '2px solid' : '1px solid transparent'}
            borderColor={score.isCurrent ? 'colorPalette.400' : 'transparent'}
            transition="all 0.2s"
          >
            <HStack gap={2}>
              {score.isCurrent && <FaPlay size={8} color="currentColor" />}
              <Badge
                colorPalette={score.rank === 1 ? 'yellow' : 'gray'}
                variant={score.rank <= 3 ? 'solid' : 'outline'}
                fontSize="xs"
                px={1}
              >
                #{score.rank}
              </Badge>
            </HStack>

            <Text
              fontSize="sm"
              fontWeight={score.isCurrent ? 'bold' : 'normal'}
            >
              {score.score.toLocaleString()}
            </Text>
          </HStack>
        ))}
      </VStack>

      {gameState.score === 0 && (
        <Text color="fg.subtle" fontSize="xs" textAlign="center" mt={4}>
          Start playing to see your score!
        </Text>
      )}
    </Box>
  )
}
