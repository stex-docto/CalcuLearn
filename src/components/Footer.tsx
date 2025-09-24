import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { getLanguage, toggleLanguage } from '@/presentation/translations.ts'
import { ColorModeButton } from '@/presentation'

export default function Footer() {
  const [, forceUpdate] = useState({})

  const handleLanguageToggle = () => {
    toggleLanguage()
    forceUpdate({}) // Force re-render to update translations
  }

  const currentLang = getLanguage()

  return (
    <Box
      as="footer"
      mt="auto"
      py={{ base: 4, md: 6 }}
      px={{ base: 3, md: 4 }}
      bg="bg.subtle"
      borderTop="1px solid"
      borderColor="border.muted"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        gap={{ base: 3, md: 2 }}
        maxW="container.xl"
        mx="auto"
      >
        <VStack
          gap={1}
          align={{ base: 'center', md: 'flex-start' }}
          order={{ base: 2, md: 1 }}
        >
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="fg.muted"
            textAlign={{ base: 'center', md: 'left' }}
          >
            © 2025 CalcuLearn - Math Learning Game
          </Text>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="fg.subtle"
            textAlign={{ base: 'center', md: 'left' }}
          >
            Made with ❤️ for learning
          </Text>
        </VStack>

        <HStack gap={2} order={{ base: 1, md: 2 }}>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleLanguageToggle}
            colorScheme="gray"
            fontSize={{ base: 'md', md: 'lg' }}
            p={2}
            minW="auto"
            h="auto"
            title={
              currentLang === 'en' ? 'Switch to French' : 'Passer en anglais'
            }
          >
            {currentLang === 'en' ? '🇫🇷' : '🇺🇸'}
          </Button>

          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  )
}
