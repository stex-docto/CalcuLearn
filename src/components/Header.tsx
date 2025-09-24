import { Box, Button, Container, HStack } from '@chakra-ui/react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { t } from '@/utils/translations'
import { GameMode } from '@/domain'
import type { GameState } from '@/presentation/types/GameState'

interface HeaderProps {
  gameState: GameState
  onStartGame: (mode: GameMode) => void
}

export default function Header({ gameState, onStartGame }: HeaderProps) {
  return (
    <Box
      as="header"
      bg="bg"
      borderBottom="1px solid"
      borderColor="border.muted"
      py={{ base: 3, md: 4 }}
      px={{ base: 3, md: 4 }}
    >
      <Container maxW="container.xl">
        <Box
          bg="bg.subtle"
          p={{ base: 2, md: 3 }}
          borderRadius="lg"
          border="1px solid"
          borderColor="border.muted"
        >
          <HStack
            justify="center"
            align="center"
            gap={{ base: 2, md: 3 }}
            wrap="wrap"
          >
            <Button
              size={{ base: 'xs', md: 'sm' }}
              colorPalette="blue"
              onClick={() => onStartGame(GameMode.ADDITION)}
              variant={
                gameState.mode === GameMode.ADDITION && gameState.isGameRunning
                  ? 'solid'
                  : 'outline'
              }
              minW={{ base: '80px', md: 'auto' }}
            >
              <FaPlus />
              {t('modesAddition')}
            </Button>
            <Button
              size={{ base: 'xs', md: 'sm' }}
              colorPalette="purple"
              onClick={() => onStartGame(GameMode.MULTIPLICATION)}
              variant={
                gameState.mode === GameMode.MULTIPLICATION &&
                gameState.isGameRunning
                  ? 'solid'
                  : 'outline'
              }
              minW={{ base: '80px', md: 'auto' }}
            >
              <FaTimes />
              {t('modesMultiplication')}
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}
