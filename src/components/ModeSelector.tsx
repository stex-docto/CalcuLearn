import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { useCallback, useState } from 'react'
import { Operation, GameSettings } from '@/domain'
import TableSelector from './TableSelector'
import { useTranslation } from 'react-i18next'

interface ModeSelectorProps {
  onStartGame: (gameSettings: GameSettings) => void
  isGameRunning: boolean
  onUpdateGameSettings?: (gameSettings: GameSettings) => void
}

export default function ModeSelector({
  onStartGame,
  isGameRunning,
  onUpdateGameSettings,
}: ModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<Operation>(
    Operation.ADDITION
  )
  const { t } = useTranslation()
  const handleModeChange = useCallback(
    (newMode: Operation) => {
      setSelectedMode(newMode)
      // Update game settings with new mode to reflect in high scores
      if (onUpdateGameSettings) {
        const newSettings = GameSettings.createWithAllTables(newMode)
        onUpdateGameSettings(newSettings)
      }
    },
    [onUpdateGameSettings]
  )

  if (isGameRunning) {
    return null
  }

  return (
    <Box width="100%" maxW="600px">
      {/* Mode Toggle Buttons */}
      <HStack gap={4} justify="center" mb={6}>
        <Button
          size="lg"
          colorPalette="blue"
          variant={selectedMode === Operation.ADDITION ? 'solid' : 'outline'}
          onClick={() => handleModeChange(Operation.ADDITION)}
        >
          <FaPlus />
          {t('modesAddition')}
        </Button>
        <Button
          size="lg"
          colorPalette="purple"
          variant={
            selectedMode === Operation.MULTIPLICATION ? 'solid' : 'outline'
          }
          onClick={() => handleModeChange(Operation.MULTIPLICATION)}
        >
          <FaTimes />
          {t('modesMultiplication')}
        </Button>
      </HStack>

      {/* Table Selector */}
      <VStack gap={6} align="stretch">
        <TableSelector
          mode={selectedMode}
          onStartGame={onStartGame}
          isGameRunning={isGameRunning}
        />
      </VStack>
    </Box>
  )
}
