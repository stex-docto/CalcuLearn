import { Box, Button, Container, HStack } from '@chakra-ui/react'
import { FaHome } from 'react-icons/fa'
import { t } from '@/presentation/translations.ts'

interface HeaderProps {
  onGoHome: () => void
}

export default function Header({ onGoHome }: HeaderProps) {
  return (
    <Box
      as="header"
      bg="bg"
      borderBottom="1px solid"
      borderColor="border.muted"
      py={{ base: 3, md: 4 }}
      px={{ base: 3, md: 4 }}
    >
      <Container maxW="container.xl">
        <Box
          bg="bg.subtle"
          p={{ base: 2, md: 3 }}
          borderRadius="lg"
          border="1px solid"
          borderColor="border.muted"
        >
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
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}
