import { Badge, Box, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react'
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
    return <></>
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
      bg="bg"
      p={{ base: 4, md: 6 }}
      borderRadius="lg"
      border="2px solid"
      borderColor="border.emphasized"
      shadow="md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <VStack gap={{ base: 3, md: 4 }}>
        <Box textAlign="center">
          <Badge
            colorScheme={getDifficultyColor(problem.difficulty)}
            mb={{ base: 1, md: 2 }}
            textTransform="capitalize"
            fontSize={{ base: 'xs', md: 'sm' }}
          >
            {problem.difficulty} {problem.operation}
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
          {problem.options.map((option, index) => (
            <MotionButton
              key={`${problem.id}-${option}-${index}`}
              size={{ base: 'md', md: 'lg' }}
              variant="outline"
              colorScheme="blue"
              fontSize={{ base: 'md', md: 'lg' }}
              py={{ base: 3, md: 4 }}
              onClick={() => onAnswer(option)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              _hover={{
                bg: 'colorPalette.50',
                borderColor: 'colorPalette.400',
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
