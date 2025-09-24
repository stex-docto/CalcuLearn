import { Box, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { GameMode, GameSettings } from '@/domain'
import { useTranslation } from 'react-i18next'

interface TableSelectorProps {
  mode: GameMode
  onStartGame: (gameSettings: GameSettings) => void
  isGameRunning: boolean
}

export default function TableSelector({
  mode,
  onStartGame,
  isGameRunning,
}: TableSelectorProps) {
  const { t } = useTranslation()
  const [selectedTables, setSelectedTables] = useState<number[]>([])

  const toggleTable = (table: number) => {
    setSelectedTables((prev) =>
      prev.includes(table)
        ? prev.filter((t) => t !== table)
        : [...prev, table].sort()
    )
  }

  const selectAllTables = () => {
    setSelectedTables([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  }

  const clearSelection = () => {
    setSelectedTables([])
  }

  const handleStartGame = () => {
    if (selectedTables.length === 0) {
      // If no tables selected, select all tables
      const gameSettings = GameSettings.createWithAllTables(mode)
      onStartGame(gameSettings)
    } else {
      const gameSettings = GameSettings.create(mode, selectedTables)
      onStartGame(gameSettings)
    }
  }

  const modeColor = mode === GameMode.ADDITION ? 'blue' : 'purple'

  return (
    <VStack gap={6} align="stretch" width="100%">
      <Box textAlign="center">
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {mode === GameMode.ADDITION
            ? t('tablesAddition')
            : t('tablesMultiplication')}
        </Text>
        <Text fontSize="sm" color="fg.muted">
          {t('tablesSelectInstructions')}
        </Text>
      </Box>

      {/* Table selection buttons */}
      <SimpleGrid columns={5} gap={3}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => (
          <Button
            key={table}
            variant={selectedTables.includes(table) ? 'solid' : 'outline'}
            colorPalette={modeColor}
            size="lg"
            onClick={() => toggleTable(table)}
            disabled={isGameRunning}
          >
            {table}
          </Button>
        ))}
      </SimpleGrid>

      {/* Control buttons */}
      <Box display="flex" gap={3} justifyContent="center" flexWrap="wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={selectAllTables}
          disabled={isGameRunning}
        >
          {t('tablesSelectAll')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearSelection}
          disabled={isGameRunning}
        >
          {t('tablesClear')}
        </Button>
      </Box>

      {/* Selected tables display */}
      {selectedTables.length > 0 && (
        <Text fontSize="sm" textAlign="center" color="fg.muted">
          {t('tablesSelected')}: {selectedTables.join(', ')}
        </Text>
      )}

      {/* Start game button */}
      <Button
        colorPalette={modeColor}
        size="lg"
        onClick={handleStartGame}
        disabled={isGameRunning}
      >
        {t('gameStart')}{' '}
        {mode === GameMode.ADDITION
          ? t('modesAddition')
          : t('modesMultiplication')}
        {selectedTables.length === 0 && ` (${t('tablesAll')})`}
      </Button>
    </VStack>
  )
}
