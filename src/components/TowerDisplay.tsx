import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Block } from '@/types/game'
import { t } from '@/utils/translations'

interface TowerDisplayProps {
  tower: Block[]
  fallingBlocks: Block[]
}

const MotionBox = motion.create(Box)
const BLOCK_HEIGHT = 30
const BLOCK_WIDTH = 60

export default function TowerDisplay({
  tower,
  fallingBlocks,
}: TowerDisplayProps) {
  const containerHeight = 460 // Fixed height for the container
  const maxVisibleBlocks = Math.floor((containerHeight - 20) / BLOCK_HEIGHT)
  const visibleTower = tower.slice(-maxVisibleBlocks) // Show only the top blocks
  const startIndex = Math.max(0, tower.length - maxVisibleBlocks)

  return (
    <Box
      width="100%"
      height="100%"
      overflow="hidden"
      colorPalette="blue"
    >
      {/* Tower blocks */}
      {visibleTower.map((block, visibleIndex) => {
        const actualIndex = startIndex + visibleIndex
        return (
          <MotionBox
            key={block.id}
            position="absolute"
            width={`${BLOCK_WIDTH}px`}
            height={`${BLOCK_HEIGHT}px`}
            bg={block.color}
            border="2px solid"
            borderColor="border.muted"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="sm"
            fontWeight="bold"
            color="fg.emphasized"
            bottom={`${visibleIndex * BLOCK_HEIGHT + 10}px`}
            left="50%"
            transform="translateX(-50%)"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: visibleIndex * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            {block.decay}
          </MotionBox>
        )
      })}

      {/* Falling blocks */}
      {fallingBlocks.map((block) => (
        <MotionBox
          key={`falling-${block.id}`}
          position="absolute"
          width={`${BLOCK_WIDTH}px`}
          height={`${BLOCK_HEIGHT}px`}
          bg={block.color}
          border="2px solid"
          borderColor="border.muted"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="sm"
          fontWeight="bold"
          color="fg.emphasized"
          left="50%"
          transform="translateX(-50%)"
          animate={{
            y: [0, 500],
            opacity: [1, 0],
            rotate: [0, 180],
          }}
          transition={{ duration: 2, ease: 'easeIn' }}
        >
          {block.decay}
        </MotionBox>
      ))}

      {/* Ground line */}
      <Box
        position="absolute"
        bottom="10px"
        left="0"
        right="0"
        height="2px"
        bg="border.emphasized"
      />

      {/* Tower height indicator */}
      {tower.length > 0 && (
        <Box
          position="absolute"
          right="10px"
          top="10px"
          bg="bg"
          border="1px solid"
          borderColor="border.muted"
          px={3}
          py={2}
          borderRadius="md"
          fontSize="sm"
          fontWeight="bold"
          color="fg.emphasized"
          shadow="sm"
        >
          {t('towerHeight')}: {tower.length}
          {tower.length > maxVisibleBlocks && (
            <Box fontSize="xs" color="fg.muted" mt={1}>
              ({tower.length - maxVisibleBlocks} {t('towerBlocksBelow')})
            </Box>
          )}
        </Box>
      )}

      {/* Bottom indicator for hidden blocks */}
      {tower.length > maxVisibleBlocks && (
        <Box
          position="absolute"
          bottom="10px"
          left="50%"
          transform="translateX(-50%)"
          bg="bg.muted"
          px={2}
          py={1}
          borderRadius="md"
          fontSize="xs"
          color="fg.muted"
          border="1px dashed"
          borderColor="border.muted"
        >
          ↓ {tower.length - maxVisibleBlocks} {t('towerMoreBlocksBelow')}
        </Box>
      )}
    </Box>
  )
}
