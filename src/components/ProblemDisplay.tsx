import {
  Badge,
  Box,
  Button,
  ButtonProps,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'

export default function ProblemDisplay() {
  const { gameState, answerProblem } = useGameSession()
  const problem = gameState.currentProblem
  const [feedbackState, setFeedbackState] = useState<{
    selectedAnswer: number | null
    isCorrect: boolean | null
    showFeedback: boolean
  }>({
    selectedAnswer: null,
    isCorrect: null,
    showFeedback: false,
  })

  // Reset feedback when problem changes
  useEffect(() => {
    setFeedbackState({
      selectedAnswer: null,
      isCorrect: null,
      showFeedback: false,
    })
  }, [problem.id])

  if (!gameState.isGameRunning || problem.isEmpty) {
    return <></>
  }

  const getModeColor = (operation: string) => {
    return operation === 'addition' ? 'blue' : 'purple'
  }

  const handleAnswerClick = async (option: number) => {
    if (feedbackState.showFeedback) return

    const isCorrect = option === problem.answer

    // Process answer immediately to update blocks/score
    const { generateNextProblem } = answerProblem(option)

    // Show feedback immediately
    setFeedbackState({
      selectedAnswer: option,
      isCorrect,
      showFeedback: true,
    })

    // Wait for visual feedback, then generate next problem
    setTimeout(() => {
      generateNextProblem()
    }, 800)
  }

  const getButtonStyles = (option: number): Partial<ButtonProps> => {
    if (!feedbackState.showFeedback) {
      return {
        variant: 'outline',
      }
    }
    if (option === feedbackState.selectedAnswer) {
      return {
        colorPalette: feedbackState.isCorrect ? 'green' : 'red',
        variant: 'solid',
        borderWidth: '4px',
      }
    }

    if (option === problem.answer && !feedbackState.isCorrect) {
      return {
        colorPalette: 'green',
        variant: 'solid',
        borderWidth: '4px',
      }
    }

    // Wrong answers (not selected and not the correct answer)
    return {
      variant: 'ghost',
    }
  }

  return (
    <VStack gap={{ base: 3, md: 4 }}>
      <Box textAlign="center">
        <Badge
          colorScheme={getModeColor(problem.operation)}
          mb={{ base: 1, md: 2 }}
          textTransform="capitalize"
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          {problem.operation} - Tables {problem.tables.join(', ')}
        </Badge>
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="bold"
          color="fg.emphasized"
        >
          {problem.question}
        </Text>
      </Box>

      <SimpleGrid columns={2} gap={{ base: 2, md: 3 }} width="100%">
        {problem.options.map((option: number, index: number) => (
          <Button
            key={`${problem.id}-${option}-${index}`}
            size="2xl"
            fontSize="2xl"
            fontWeight={800}
            colorPalette="gray"
            py={{ base: 3, md: 4 }}
            onClick={() =>
              !feedbackState.showFeedback && handleAnswerClick(option)
            }
            {...getButtonStyles(option)}
          >
            {option}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
