import { Badge, Box, HStack, Separator, Text, VStack } from '@chakra-ui/react'
import { FaPlus, FaTimes, FaTrophy } from 'react-icons/fa'
import { Operation } from '@/domain'
import { useTranslation } from 'react-i18next'
import { useHighScores } from '@/presentation/hooks/useHighScores.ts'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface HighScoresProps {
  mode: Operation
}

export default function HighScores({ mode }: HighScoresProps) {
  const { t } = useTranslation()
  const ModeIcon = mode === Operation.ADDITION ? FaPlus : FaTimes
  const modeName = mode === Operation.ADDITION ? 'Addition' : 'Multiplication'

  const { scores } = useHighScores(mode)

  const getColor = (rank: number) => {
    if (rank == 1) return 'yellow'
    return 'bg.subtle'
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
      {scores.length === 0 && (
        <Text color="fg.subtle" fontSize={{ base: 'sm', md: 'md' }}>
          {t('highScoresNoScores', { mode: modeName.toLowerCase() })}
        </Text>
      )}
      {scores.length > 0 && (
        <VStack gap={{ base: 2, md: 3 }} align="stretch">
          {scores.map((score, index) => (
            <Box key={score.id}>
              <HStack justify="start" align="center" gap={4}>
                <Badge
                  colorPalette={getColor(index + 1)}
                  variant={index < 1 ? 'solid' : 'outline'}
                  fontSize="xs"
                >
                  #{index + 1}
                </Badge>

                <Text fontWeight="bold" fontSize="md">
                  {score.score.toLocaleString()}
                </Text>
                <Text fontSize="xs" color="fg.subtle">
                  {t('statsLevel')} {score.level} • {formatDate(score.date)}
                </Text>
              </HStack>
              {index < scores.length - 1 && <Separator mt={2} />}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
}
