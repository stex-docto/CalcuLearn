import {
  Box,
  Button,
  Container,
  HStack,
  StackSeparator,
} from '@chakra-ui/react'
import { FaHome } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { ColorModeButton } from '@/presentation'

interface HeaderProps {
  onGoHome: () => void
}

export default function Header({ onGoHome }: HeaderProps) {
  const { t, i18n } = useTranslation()

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en'
    i18n.changeLanguage(newLang)
  }

  const currentLang = i18n.language

  return (
    <Box
      as="header"
      bg="bg.subtle"
      borderBottom="1px solid"
      borderColor="border.muted"
    >
      <Container maxW="container.xl">
        <HStack
          justify="center"
          align="center"
          gap={{ base: 2, md: 3 }}
          wrap="wrap"
        >
          <Button
            size={{ base: 'sm', md: 'md' }}
            colorPalette="gray"
            variant="outline"
            onClick={onGoHome}
            minW={{ base: '100px', md: 'auto' }}
          >
            <FaHome />
            {t('headerHome')}
          </Button>
          <StackSeparator flex={1} />
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
      </Container>
    </Box>
  )
}
