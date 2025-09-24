import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaPlus, FaTimes } from 'react-icons/fa'
import TowerDisplay from './TowerDisplay'
import GameStats from './GameStats'
import ModeSelector from './ModeSelector'
import { t } from '@/utils/translations'
import { GameMode } from '@/domain'
import type { GameState } from '@/presentation/types/GameState'

interface GameBoardProps {
  gameState: GameState
  onStartGame: (mode: GameMode) => void
}

const MotionBox = motion.create(Box)

export default function GameBoard({ gameState, onStartGame }: GameBoardProps) {
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
            onStartGame={onStartGame}
            isGameRunning={gameState.isGameRunning}
          />
        </MotionBox>
      </VStack>
    )
  }

  return (
    <VStack gap={{ base: 3, md: 4 }} align="stretch">
      <GameStats gameState={gameState} />

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
            showLevelUp={gameState.showLevelUp}
            currentLevel={gameState.level}
          />
        </Box>

        {!gameState.isGameRunning && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.800"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={{ base: 3, md: 4 }}
            p={{ base: 4, md: 6 }}
          >
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="white"
              fontWeight="bold"
              textAlign="center"
            >
              {t('gameOverTitle')}
            </Text>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="white"
              textAlign="center"
            >
              {t('gameOverFinalScore')}: {gameState.score}
            </Text>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color="whiteAlpha.800"
              textAlign="center"
            >
              {gameState.mode === GameMode.ADDITION ? <FaPlus /> : <FaTimes />}{' '}
              {t('gameOverMode')}{' '}
              {gameState.mode === GameMode.ADDITION
                ? t('modesAddition')
                : t('modesMultiplication')}
            </Text>
            <Button
              colorScheme={
                gameState.mode === GameMode.ADDITION ? 'blue' : 'purple'
              }
              size={{ base: 'md', md: 'lg' }}
              onClick={() => onStartGame(gameState.mode)}
            >
              {t('gameOverPlayAgain')} (
              {gameState.mode === GameMode.ADDITION
                ? t('modesAddition')
                : t('modesMultiplication')}
              )
            </Button>
          </Box>
        )}
      </Box>
    </VStack>
  )
}
