import {Badge, Box, Button, Center, SimpleGrid, Text, VStack} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'
import {GrAchievement} from "react-icons/gr";
import {t} from "@/presentation";

const MotionButton = motion.create(Button)
const MotionBox = motion.create(Box)

function levelUpCongrats(currentLevel: number) {
    return (
        <MotionBox
            position="absolute"
            bg="yellow.400"
            color="black"
            px={8}
            py={4}
            borderRadius="xl"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            border="3px solid"
            borderColor="yellow.600"
            initial={{
                scale: 0,
                rotate: 0,
                opacity: 0,
            }}
            animate={{
                scale: [0, 1, 0.8],
                rotate: [0, 0, 0],
                opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
                duration: 3,
                times: [0, 0.3, 0.4, 0.8, 1],
                ease: 'easeOut',
            }}
        >
            <Center>
                <GrAchievement/>
                <Text fontSize="lg" pl={2}>
                    {t('statsLevel')} {currentLevel}
                </Text>
                {Array.from({length: 20}).map((_, i) => (
                    <MotionBox
                        position="absolute"
                        key={`confetti-${i}`}
                        width="8px"
                        height="8px"
                        bg={
                            [
                                'yellow.400',
                                'orange.400',
                                'red.400',
                                'blue.400',
                                'green.400',
                            ][i % 5]
                        }
                        borderRadius="full"
                        initial={{
                            scale: 0,
                            x: 0,
                            y: 0,
                            opacity: 1,
                        }}
                        animate={{
                            scale: [0, 1, 0],
                            x: (Math.random() - 0.5) * 400,
                            y: (Math.random() - 0.5) * 300,
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random(),
                            delay: Math.random() * 0.5,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </Center>
        </MotionBox>
    )
}


export default function ProblemDisplay() {
  const { gameState, answerProblem,  } = useGameSession()
  const problem = gameState.currentProblem
  if (!gameState.isGameRunning || problem.isEmpty) {
    return <></>
  }

  const getModeColor = (operation: string) => {
    return operation === 'addition' ? 'blue' : 'purple'
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
        {gameState.showLevelUp? levelUpCongrats(gameState.level): (



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
            <MotionButton
              key={`${problem.id}-${option}-${index}`}
              size={{ base: 'md', md: 'lg' }}
              variant="outline"
              colorScheme="blue"
              fontSize={{ base: 'md', md: 'lg' }}
              py={{ base: 3, md: 4 }}
              onClick={() => answerProblem(option)}
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
        )}
    </MotionBox>
  )
}
