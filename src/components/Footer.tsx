import { Box, Flex, Link, StackSeparator, Text } from '@chakra-ui/react'
import { VscGithub } from 'react-icons/vsc'

export default function Footer() {
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
        <Link
          href="https://github.com/stex-docto/CalcuLearn"
          target="_blank"
          rel="noopener noreferrer"
          display="flex"
          alignItems="center"
          gap={2}
          fontSize="sm"
          _hover={{ textDecoration: 'none' }}
          title="GitHub Repository"
        >
          <VscGithub />
        </Link>
        <Text
          fontSize={{ base: 'xs', md: 'sm' }}
          color="fg.muted"
          textAlign={{ base: 'center', md: 'left' }}
        >
          © 2025 CalcuLearn - Math Learning Game
        </Text>

        <StackSeparator flex={1} />

        <Text
          fontSize={{ base: 'xs', md: 'sm' }}
          color="fg.subtle"
          textAlign={{ base: 'center', md: 'left' }}
        >
          Made with ❤️ for learning
        </Text>
      </Flex>
    </Box>
  )
}
