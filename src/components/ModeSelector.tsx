import { Box, Text, VStack } from '@chakra-ui/react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { GameMode } from '@/types/game'
import { t } from '@/utils/translations'

interface ModeSelectorProps {
  onStartGame: (mode: GameMode) => void
  isGameRunning: boolean
}

export default function ModeSelector({
  onStartGame,
  isGameRunning,
}: ModeSelectorProps) {
  if (isGameRunning) {
    return null
  }

  return (
    <VStack
      gap={{ base: 4, md: 6 }}
      align="center"
      p={{ base: 4, md: 8 }}
      bg="bg"
    >
      <Text
        fontSize={{ base: 'xl', md: '2xl' }}
        fontWeight="bold"
        color="fg.emphasized"
      >
        {t('modesChooseMode')}
      </Text>

      <VStack gap={{ base: 3, md: 4 }} align="stretch" width="100%">
        <Box
          p={{ base: 4, md: 6 }}
          bg={'bg.subtle'}
          border="2px solid"
          borderColor={'border.muted'}
          borderRadius="lg"
          cursor="pointer"
          onClick={() => onStartGame('addition')}
          transition="all 0.2s"
          _hover={{ transform: { base: 'scale(1.01)', md: 'scale(1.02)' } }}
          colorPalette="blue"
        >
          <VStack gap={{ base: 2, md: 3 }} align="center">
            <Box fontSize={{ base: '2xl', md: '3xl' }}>
              <FaPlus />
            </Box>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="bold"
              color="fg.emphasized"
              textAlign="center"
            >
              {t('modesAddition')}
            </Text>
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
              color="fg.muted"
              textAlign="center"
            >
              {t('modesAdditionDescription')}
            </Text>
          </VStack>
        </Box>

        <Box
          p={{ base: 4, md: 6 }}
          bg={'bg.subtle'}
          border="2px solid"
          borderColor={'border.muted'}
          borderRadius="lg"
          cursor="pointer"
          onClick={() => onStartGame('multiplication')}
          transition="all 0.2s"
          _hover={{ transform: { base: 'scale(1.01)', md: 'scale(1.02)' } }}
          colorPalette="purple"
        >
          <VStack gap={{ base: 2, md: 3 }} align="center">
            <Box fontSize={{ base: '2xl', md: '3xl' }}>
              <FaTimes />
            </Box>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="bold"
              color="fg.emphasized"
              textAlign="center"
            >
              {t('modesMultiplication')}
            </Text>
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
              color="fg.muted"
              textAlign="center"
            >
              {t('modesMultiplicationDescription')}
            </Text>
          </VStack>
        </Box>
      </VStack>
    </VStack>
  )
}
