import { Box, Timeline } from '@chakra-ui/react'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'
import { useHighScores } from '@/presentation/hooks/useHighScores.ts'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const getScoreBlock = (
  score: { id: string; score: number },
  rank: number,
  isCurrent: boolean
) => (
  <Timeline.Item key={score.id}>
    <Timeline.Connector>
      <Timeline.Separator />
      <Timeline.Indicator
        colorPalette={isCurrent ? 'blue' : rank === 1 ? 'yellow' : 'gray'}
      >
        {rank}
      </Timeline.Indicator>
    </Timeline.Connector>
    <Timeline.Content paddingBottom={4}>
      <Timeline.Title>
        {score.score.toLocaleString()}{' '}
        {isCurrent && <FaLongArrowAltLeft color="currentColor" />}
      </Timeline.Title>
    </Timeline.Content>
  </Timeline.Item>
)

export default function CompactHighScores() {
  const { gameState } = useGameSession()
  const { scores } = useHighScores(gameState.mode)

  // Add current game score if it's not already in the list and game is running
  const currentHighScore = scores.some((s) => s.id === gameState.id)

  // Sort all scores and take top 10, but mark which one is current
  return (
    <Box width="100px" p={4}>
      <Timeline.Root variant="subtle">
        {scores.map((score, index) =>
          getScoreBlock(score, index + 1, score.id == gameState.id)
        )}

        {!currentHighScore &&
          getScoreBlock(
            { id: gameState.id, score: gameState.score },
            scores.length + 1,
            true
          )}
      </Timeline.Root>
    </Box>
  )
}
