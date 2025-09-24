import { Box, Center, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { GameState } from '@/presentation/types/GameState'
import { t } from '@/utils/translations'
import { GrAchievement } from 'react-icons/gr'

type BlockData = GameState['tower'][0]

interface TowerDisplayProps {
  tower: BlockData[]
  fallingBlocks: BlockData[]
  showLevelUp?: boolean
  currentLevel?: number
}

const MotionBox = motion.create(Box)
const BLOCK_HEIGHT = 30
const BLOCK_WIDTH = 60
const CRANE_DROP_POSITION = 90 // Y position where crane drops blocks

export default function TowerDisplay({
  tower,
  fallingBlocks,
  showLevelUp = false,
  currentLevel = 1,
}: TowerDisplayProps) {
  return (
    <Box width="100%" height="100%" overflow="hidden" colorPalette="blue">
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
          </Box>
        )}
      </MotionBox>

      {/* Level Up Celebration */}
      {showLevelUp && (
        <Center minW="100%" minH="400px">
          <MotionBox
            position="absolute"
            bg="yellow.400"
            color="black"
            px={8}
            py={4}
            borderRadius="xl"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            border="3px solid"
            borderColor="yellow.600"
            initial={{
              scale: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1, 0.8],
              rotate: [0, 0, 0],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              times: [0, 0.3, 0.4, 0.8, 1],
              ease: 'easeOut',
            }}
          >
            <Center>
              <GrAchievement />
              <Text fontSize="lg" pl={2}>
                {t('statsLevel')} {currentLevel}
              </Text>
            </Center>
          </MotionBox>

          {Array.from({ length: 20 }).map((_, i) => (
            <MotionBox
              position="absolute"
              key={`confetti-${i}`}
              width="8px"
              height="8px"
              bg={
                [
                  'yellow.400',
                  'orange.400',
                  'red.400',
                  'blue.400',
                  'green.400',
                ][i % 5]
              }
              borderRadius="full"
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 300,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </Center>
      )}
    </Box>
  )
}
