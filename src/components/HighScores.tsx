import {
  Badge,
  Box,
  Button,
  HStack,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FaPlus, FaTimes, FaTrophy } from 'react-icons/fa'
import { GameMode } from '@/domain'
import { HighScore } from '@/types/game'
import { formatDate } from '@/utils/helpers'
import { t } from '@/utils/translations'

interface HighScoresProps {
  scores: HighScore[]
  mode: GameMode
  onClear?: () => void
}

export default function HighScores({ scores, mode, onClear }: HighScoresProps) {
  const ModeIcon = mode === GameMode.ADDITION ? FaPlus : FaTimes
  const modeName = mode === GameMode.ADDITION ? 'Addition' : 'Multiplication'
  if (scores.length === 0) {
    return (
      <Box
        bg="bg.muted"
        p={{ base: 4, md: 6 }}
        borderRadius="lg"
        textAlign="center"
      >
        <HStack
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight="bold"
          gap={2}
          color="fg.emphasized"
          justifyContent="center"
          alignItems="center"
        >
          <FaTrophy />
          <ModeIcon />
          <Text>
            {t('highScoresTitle')} {modeName}
          </Text>
        </HStack>
        <Text color="fg.subtle" fontSize={{ base: 'sm', md: 'md' }}>
          {t('highScoresNoScores', { mode: modeName.toLowerCase() })}
        </Text>
      </Box>
    )
  }

  return (
    <Box
      bg="bg"
      p={{ base: 4, md: 6 }}
      borderRadius="lg"
      border="1px solid"
      borderColor="border.muted"
      shadow="sm"
    >
      <HStack justify="space-between" mb={{ base: 3, md: 4 }}>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight="bold"
          color="fg.emphasized"
        >
          🏆 <ModeIcon /> {t('highScoresTitle')} {modeName}
        </Text>
        {onClear && scores.length > 0 && (
          <Button
            size={{ base: 'xs', md: 'sm' }}
            variant="ghost"
            colorScheme="red"
            onClick={onClear}
          >
            {t('highScoresClear')}
          </Button>
        )}
      </HStack>

      <VStack gap={{ base: 2, md: 3 }} align="stretch">
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
                <VStack gap={0} align="start">
                  <Text fontWeight="bold" fontSize="md">
                    {score.score.toLocaleString()}
                  </Text>
                  <Text fontSize="xs" color="fg.subtle">
                    {t('statsLevel')} {score.level} • {formatDate(score.date)}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
            {index < scores.length - 1 && <Separator mt={2} />}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}
