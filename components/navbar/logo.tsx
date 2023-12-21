import { Text, Image, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const Logo = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }

  return (
    <Flex alignItems="center" cursor="pointer" onClick={handleClick}>
      <Image src="icon.svg" alt="absolute.fi" w="36.499px" h="36.334" mr="8px" />
      <Text h="min-content" fontSize="22px" fontWeight="500" color="primary">
        Absolute.
        <Text as="span" color="#FFF">
          fi
        </Text>
      </Text>
    </Flex>
  )
}
