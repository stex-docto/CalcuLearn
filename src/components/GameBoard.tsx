import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import TowerDisplay from './TowerDisplay'
import ModeSelector from './ModeSelector'
import { t } from '@/presentation/translations.ts'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'

const MotionBox = motion.create(Box)

export default function GameBoard() {
  const { gameState, startGame, updateGameSettings } = useGameSession()

  if (!gameState.isGameRunning && gameState.tower.length === 0) {
    return (
      <VStack
        gap={{ base: 4, md: 6 }}
        align="center"
        minH={{ base: '300px', md: '400px' }}
        justify="center"
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          width="100%"
        >
          <Heading
            as="h1"
            size={{ base: 'xl', md: '2xl' }}
            textAlign="center"
            colorPalette="blue"
            color="colorPalette.500"
            mb={2}
          >
            {t('appTitle')}
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            textAlign="center"
            color="fg.muted"
            mb={{ base: 4, md: 6 }}
          >
            {t('appSubtitle')}
          </Text>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            textAlign="center"
            color="fg.subtle"
            mb={{ base: 6, md: 8 }}
          >
            ✅ {t('instructionsCorrect')}
            <br />❌ {t('instructionsWrong')}
            <br />
            🏗️ {t('instructionsGoal')}
          </Text>

          <ModeSelector
            onStartGame={startGame}
            isGameRunning={gameState.isGameRunning}
            onUpdateGameSettings={updateGameSettings}
          />
        </MotionBox>
      </VStack>
    )
  }

  return (
    <VStack gap={{ base: 3, md: 4 }} align="stretch">
      <Box
        bg="bg.subtle"
        borderRadius="lg"
        border="2px solid"
        borderColor="border.muted"
        overflow="hidden"
      >
        <Box
          position="relative"
          minH={{ base: '400px', md: '500px' }}
          p={{ base: 4, md: 6 }}
        >
          <TowerDisplay
            tower={gameState.tower}
            fallingBlocks={gameState.fallingBlocks}
          />
        </Box>
      </Box>
    </VStack>
  )
}
