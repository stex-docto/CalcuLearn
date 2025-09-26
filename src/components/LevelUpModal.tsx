import { Box, Button, Center, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { GrAchievement } from 'react-icons/gr'
import { useTranslation } from 'react-i18next'
import { useGameSession } from '@/presentation/hooks/useGameSession.ts'

const MotionBox = motion.create(Box)

export default function LevelUpModal() {
  const { t } = useTranslation()
  const { gameState, hideLevelUp } = useGameSession()

  return (
    <Center>
      <Box
        maxW="lg"
        colorPalette="yellow"
        border="none"
        borderRadius="2xl"
        shadow="2xl"
        position="relative"
        overflow="hidden"
      >
        {/* Animated background effects */}
        {Array.from({ length: 15 }).map((_, i) => (
          <MotionBox
            position="absolute"
            key={`bg-effect-${i}`}
            width={`${20 + Math.random() * 40}px`}
            height={`${20 + Math.random() * 40}px`}
            bg="whiteAlpha.200"
            borderRadius="full"
            initial={{
              scale: 0,
              x: Math.random() * 400,
              y: Math.random() * 300,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <VStack gap={6} textAlign="center" py={8}>
          <MotionBox
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            <Box
              fontSize="6xl"
              bg="whiteAlpha.300"
              borderRadius="full"
              p={4}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              border="4px solid"
              borderColor="whiteAlpha.400"
            >
              <GrAchievement />
            </Box>
          </MotionBox>

          <VStack gap={2}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              textShadow="1px 1px 2px rgba(0,0,0,0.3)"
            >
              {t('levelUpCongratulations')} 🏆
            </Text>
            <Text fontSize="xl" textShadow="1px 1px 2px rgba(0,0,0,0.3)">
              {t('statsLevel')}{' '}
              {t('levelUpAchieved', { level: gameState.level })}
            </Text>
            <Text
              fontSize="md"
              opacity={0.9}
              textShadow="1px 1px 2px rgba(0,0,0,0.3)"
            >
              {t('levelUpKeepBuilding')} 🏗️
            </Text>
          </VStack>
          <Button onClick={hideLevelUp}>{t('levelUpContinue')} 🚀</Button>
        </VStack>
      </Box>
    </Center>
  )
}
