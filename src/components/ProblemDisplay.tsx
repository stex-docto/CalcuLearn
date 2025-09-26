import {
  Badge,
  Box,
  Button,
  ButtonProps,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'

const MotionBox = motion.create(Box)

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

    // Show feedback immediately
    setFeedbackState({
      selectedAnswer: option,
      isCorrect,
      showFeedback: true,
    })

    // Wait a bit for visual feedback, then proceed with game logic
    setTimeout(() => {
      answerProblem(option)
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
    <MotionBox
      bg="bg"
      p={{ base: 4, md: 6 }}
      borderRadius="lg"
      border="2px solid"
      borderColor="border.emphasized"
      shadow="md"
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
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
    </MotionBox>
  )
}
