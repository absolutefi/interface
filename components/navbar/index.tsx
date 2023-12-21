import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { MouseEventHandler } from 'react'
import { FiMenu } from 'react-icons/fi'

import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Link,
  useDisclosure,
} from '@chakra-ui/react'
import { WalletStatus } from '@cosmos-kit/core'
import { useChain } from '@cosmos-kit/react'

import { chainName } from '../../config'
import { shortenAddress } from '../../utils/format'
import {
  Connected,
  Connecting,
  Disconnected,
  Error,
  NotExist,
  Rejected,
  WalletConnectComponent,
} from '../react'
import { Logo } from './logo'

export const Navbar = () => {
  const { connect, openView, status, address } = useChain(chainName)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  // Events
  const onClickConnect: MouseEventHandler = async (e) => {
    e.preventDefault()
    await connect()
  }

  const onClickOpenView: MouseEventHandler = (e) => {
    e.preventDefault()
    openView()
  }

  const handleClickManage = () => {
    router.push('/manage')
  }

  return (
    <>
      <Box borderBottom="1px" borderColor="#282828">
        <Container maxW="container.xl" py="12px">
          <Grid
            templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']}
            alignItems="center"
            justifyContent="space-between"
          >
            <GridItem>
              <Logo />
            </GridItem>
            {router.route !== '/new' ? (
              <>
                <GridItem display={['none', 'flex']} gap="24px" justifySelf="center">
                  <NextLink href="/">
                    <Link color="#FFF">Explore</Link>
                  </NextLink>
                  <NextLink href={status === WalletStatus.Connected ? '/new' : '/#'}>
                    <Link
                      color="primary"
                      onClick={(e) => {
                        if (status !== WalletStatus.Connected) {
                          onClickConnect(e)
                        }
                      }}
                    >
                      Start new project
                    </Link>
                  </NextLink>
                </GridItem>
                <GridItem display="flex" gap="16px" justifySelf="flex-end">
                  {status === WalletStatus.Connected && (
                    <Button
                      variant="primary"
                      display={['none', 'block']}
                      onClick={handleClickManage}
                    >
                      Manage
                    </Button>
                  )}
                  <WalletConnectComponent
                    walletStatus={status}
                    disconnect={
                      <Disconnected
                        buttonText="Connect Wallet"
                        onClick={onClickConnect}
                      />
                    }
                    connecting={<Connecting />}
                    connected={
                      <Connected
                        buttonText={shortenAddress(address)}
                        onClick={onClickOpenView}
                      />
                    }
                    rejected={
                      <Rejected buttonText="Reconnect" onClick={onClickConnect} />
                    }
                    error={
                      <Error buttonText="Change Wallet" onClick={onClickOpenView} />
                    }
                    notExist={
                      <NotExist
                        buttonText="Install Wallet"
                        onClick={onClickOpenView}
                      />
                    }
                  />
                  <Button
                    variant="primary"
                    display={['block', 'none']}
                    onClick={onOpen}
                  >
                    <FiMenu />
                  </Button>
                </GridItem>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Container>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent minW="full">
          <DrawerCloseButton />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap="8px">
              {status === WalletStatus.Connected && (
                <Button variant="primary" w="full" onClick={handleClickManage}>
                  Manage
                </Button>
              )}
              <NextLink href="/">
                <Button w="full">Explore</Button>
              </NextLink>
              <NextLink href="/new">
                <Button w="full">Start new project</Button>
              </NextLink>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
