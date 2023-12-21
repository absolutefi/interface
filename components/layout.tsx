import Image from 'next/image'
import { PropsWithChildren } from 'react'

import { Box } from '@chakra-ui/react'

import { Navbar } from './navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box position="relative" zIndex={1} minHeight="100vh">
      <Box position="relative" zIndex={1}>
        <Navbar />
        {children}
      </Box>
      <Image
        src="/ellipse.webp"
        alt="ellipse"
        layout="fill"
        style={{ transform: 'translateY(50%)', zIndex: -1 }}
      />
      <Image
        src="/ellipse.webp"
        alt="ellipse"
        layout="fill"
        style={{
          transform: 'translateY(50%)',
          transformOrigin: 'bottom center',
          zIndex: -1,
          animation: 'ellipse 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        }}
      />
    </Box>
  )
}
