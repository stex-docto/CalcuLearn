import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Block } from '@/types/game'

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
  return (
    <Box position="relative" width="100%" height="100%">
      {/* Tower blocks */}
      {tower.map((block, index) => (
        <MotionBox
          key={block.id}
          position="absolute"
          width={`${BLOCK_WIDTH}px`}
          height={`${BLOCK_HEIGHT}px`}
          bg={block.color}
          border="2px solid"
          borderColor="gray.300"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="sm"
          fontWeight="bold"
          color="gray.700"
          bottom={`${index * BLOCK_HEIGHT + 10}px`}
          left="50%"
          transform="translateX(-50%)"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          {block.decay}
        </MotionBox>
      ))}

      {/* Falling blocks */}
      {fallingBlocks.map((block) => (
        <MotionBox
          key={`falling-${block.id}`}
          position="absolute"
          width={`${BLOCK_WIDTH}px`}
          height={`${BLOCK_HEIGHT}px`}
          bg={block.color}
          border="2px solid"
          borderColor="gray.300"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="sm"
          fontWeight="bold"
          color="gray.700"
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
        bg="gray.400"
      />

      {/* Tower height indicator */}
      {tower.length > 0 && (
        <Box
          position="absolute"
          right="10px"
          top="10px"
          bg="blue.100"
          px={3}
          py={2}
          borderRadius="md"
          fontSize="sm"
          fontWeight="bold"
          color="blue.700"
        >
          Height: {tower.length}
        </Box>
      )}
    </Box>
  )
}
