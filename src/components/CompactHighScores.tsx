import { Badge, HStack, Text, VStack } from '@chakra-ui/react'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'
import { useHighScores } from '@/presentation/hooks/useHighScores.ts'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const getScoreBlock = (
  score: { id: string; score: number },
  rank: number,
  isCurrent: boolean
) => (
  <HStack key={score.id}>
    <Badge
      width="30px"
      colorPalette={isCurrent ? 'blue' : rank === 1 ? 'yellow' : 'gray'}
    >
      #{rank}
    </Badge>
    <Text> {score.score.toLocaleString()}</Text>
    {isCurrent && <FaLongArrowAltLeft color="currentColor" />}
  </HStack>
)

export default function CompactHighScores() {
  const { gameState } = useGameSession()
  const { scores } = useHighScores(gameState.mode)

  // Add current game score if it's not already in the list and game is running
  const currentHighScore = scores.some((s) => s.id === gameState.id)

  // Sort all scores and take top 10, but mark which one is current
  return (
    <VStack gap={2} p={2} align="start">
      {scores.map((score, index) =>
        getScoreBlock(score, index + 1, score.id == gameState.id)
      )}

      {!currentHighScore &&
        getScoreBlock(
          { id: gameState.id, score: gameState.score },
          scores.length + 1,
          true
        )}
    </VStack>
  )
}
