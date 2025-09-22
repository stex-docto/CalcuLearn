import { Box, Button, Text, VStack, SimpleGrid, Badge } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Problem } from '@/types/game'

interface ProblemDisplayProps {
  problem: Problem
  onAnswer: (answer: number) => void
  isGameRunning: boolean
}

const MotionButton = motion.create(Button)
const MotionBox = motion.create(Box)

export default function ProblemDisplay({
  problem,
  onAnswer,
  isGameRunning,
}: ProblemDisplayProps) {
  if (!isGameRunning || !problem.id) {
    return (
      <Box bg="gray.100" p={6} borderRadius="lg" textAlign="center">
        <Text color="gray.500">Start the game to see problems!</Text>
      </Box>
    )
  }

  const getDifficultyColor = (difficulty: Problem['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'green'
      case 'medium':
        return 'orange'
      case 'hard':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <MotionBox
      bg="white"
      p={6}
      borderRadius="lg"
      border="2px solid"
      borderColor="blue.200"
      shadow="md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <VStack spacing={4}>
        <Box textAlign="center">
          <Badge
            colorScheme={getDifficultyColor(problem.difficulty)}
            mb={2}
            textTransform="capitalize"
          >
            {problem.difficulty} {problem.operation}
          </Badge>
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            {problem.question}
          </Text>
        </Box>

        <SimpleGrid columns={2} spacing={3} width="100%">
          {problem.options.map((option, index) => (
            <MotionButton
              key={`${problem.id}-${option}-${index}`}
              size="lg"
              variant="outline"
              colorScheme="blue"
              onClick={() => onAnswer(option)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              _hover={{
                bg: 'blue.50',
                borderColor: 'blue.400',
              }}
            >
              {option}
            </MotionButton>
          ))}
        </SimpleGrid>
      </VStack>
    </MotionBox>
  )
}
