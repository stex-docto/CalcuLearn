import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Divider,
} from '@chakra-ui/react'
import { HighScore } from '@/types/game'
import { formatDate } from '@/utils/helpers'

interface HighScoresProps {
  scores: HighScore[]
  onClear?: () => void
}

export default function HighScores({ scores, onClear }: HighScoresProps) {
  if (scores.length === 0) {
    return (
      <Box bg="gray.50" p={6} borderRadius="lg" textAlign="center">
        <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.700">
          🏆 High Scores
        </Text>
        <Text color="gray.500">
          No high scores yet. Start playing to set records!
        </Text>
      </Box>
    )
  }

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      shadow="sm"
    >
      <HStack justify="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="bold" color="gray.700">
          🏆 High Scores
        </Text>
        {onClear && scores.length > 0 && (
          <Button size="sm" variant="ghost" colorScheme="red" onClick={onClear}>
            Clear
          </Button>
        )}
      </HStack>

      <VStack spacing={3} align="stretch">
        {scores.map((score, index) => (
          <Box key={score.id}>
            <HStack justify="space-between" align="center">
              <HStack>
                <Badge
                  colorScheme={index < 3 ? 'gold' : 'gray'}
                  variant={index < 3 ? 'solid' : 'outline'}
                  fontSize="xs"
                >
                  #{index + 1}
                </Badge>
                <VStack spacing={0} align="start">
                  <Text fontWeight="bold" fontSize="md">
                    {score.score.toLocaleString()}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Level {score.level} • {formatDate(score.date)}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
            {index < scores.length - 1 && <Divider mt={2} />}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}
