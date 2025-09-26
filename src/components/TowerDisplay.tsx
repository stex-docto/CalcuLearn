import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { GameState } from '@/presentation/types/GameState'
import TowerBlock from './TowerBlock'

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
  const baseUrl = import.meta.env.BASE_URL || '/'
  const backgroundUrl = `url('${baseUrl}background.jpg')`

  return (
    <Box
      width="100%"
      minWidth="200px"
      flex={1}
      height="500px"
      colorPalette="blue"
      backgroundImage={backgroundUrl}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="500px 500px"
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
            >
              <TowerBlock
                blockIndex={block.blockIndex}
                width={BLOCK_WIDTH}
                height={BLOCK_HEIGHT}
              />
            </MotionBox>
          )
        })}

        {/* Falling blocks */}
        {fallingBlocks.map((block) => (
          <MotionBox
            key={`falling-${block.id}`}
            position="absolute"
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
          >
            <TowerBlock
              blockIndex={block.blockIndex}
              width={BLOCK_WIDTH}
              height={BLOCK_HEIGHT}
            />
          </MotionBox>
        ))}
      </MotionBox>
    </Box>
  )
}
