import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { GameState } from '@/presentation/types/GameState'

type BlockData = GameState['tower'][0]

interface TowerDisplayProps {
  tower: BlockData[]
  fallingBlocks: BlockData[]
}

const MotionBox = motion.create(Box)
const BLOCK_HEIGHT = 30
const BLOCK_WIDTH = 60
const CRANE_DROP_POSITION = 90 // Y position where crane drops blocks

export default function TowerDisplay({
  tower,
  fallingBlocks,
}: TowerDisplayProps) {
  return (
    <Box
      width={{ base: '400px', md: '500px' }}
      height={{ base: '400px', md: '500px' }}
      overflow="hidden"
      colorPalette="blue"
      backgroundImage="url('/background.jpg')"
      backgroundSize={{ base: '400px 400px', md: '500px 500px' }}
    >
      <MotionBox
        width="100%"
        height="100%"
        transformOrigin="center bottom"
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 20,
          duration: 1.2,
        }}
      >
        {/* Tower blocks */}
        {tower.map((block, visibleIndex) => {
          const finalBottomPosition = visibleIndex * BLOCK_HEIGHT + 10
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
              bottom={`${finalBottomPosition}px`}
              left="50%"
              transform="translateX(-50%)"
              initial={{
                y: -(finalBottomPosition + CRANE_DROP_POSITION),
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.8,
                delay: visibleIndex * 0.1,
              }}
              whileHover={{ scale: 1.05 }}
            />
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
            top={`${CRANE_DROP_POSITION}px`}
            left="50%"
            transform="translateX(-50%)"
            initial={{
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 0.8,
            }}
            animate={{
              y: 500,
              opacity: 0,
              rotate: 360,
              scale: 0.5,
            }}
            transition={{
              duration: 2.5,
              ease: 'easeIn',
              times: [0, 0.3, 1],
            }}
          />
        ))}
      </MotionBox>
    </Box>
  )
}
