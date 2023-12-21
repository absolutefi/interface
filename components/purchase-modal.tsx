import BigNumber from 'bignumber.js'
import { assets } from 'chain-registry'
import dayjs from 'dayjs'
import Image from 'next/image'
import numeral from 'numeral'
import React, { useCallback, useEffect, useState } from 'react'

import { Asset, AssetList } from '@chain-registry/types'
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useChain } from '@cosmos-kit/react'

import { chainName } from '../config'
import { shortenAddress } from '../utils/format'
import { useContract } from '../hooks/useContract'
import { isTxNotFoundError } from '@injectivelabs/sdk-ts'

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
  image: string
  addr: string
  name: string
  symbol: string
  info: string
  fundedSymbol: string
  startDate: number
  endDate: number
  softCap: number
  hardCap: number
  ownerSupply: number
  presaleAmount: number
}

const chainassets: AssetList = assets.find(
  (chain) => chain.chain_name === chainName
) as AssetList

const coin: Asset = chainassets.assets.find((asset) => asset.base === 'inj') as Asset

const PurchaseModal = ({
  isOpen,
  onClose,
  id,
  image,
  addr,
  name,
  symbol,
  info,
  fundedSymbol,
  startDate,
  endDate,
  softCap,
  hardCap,
  ownerSupply,
  presaleAmount,
}: PurchaseModalProps) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const [spendAmount, setSpendAmount] = useState(0)

  const { address, getRpcEndpoint, getStargateClient } = useChain(chainName)

  const { participate } = useContract()

  const getBalance = useCallback(async () => {
    if (!address) {
      setBalance(new BigNumber(0))
      return
    }

    let rpcEndpoint = await getRpcEndpoint()

    if (!rpcEndpoint) {
      console.info('no rpc endpoint — using a fallback')
      rpcEndpoint = `https://rpc.cosmos.directory/${chainName}`
    }

    const stargateClient = await getStargateClient()

    const balance = await stargateClient.getBalance(address, coin.base)

    const exp = coin.denom_units.find((unit) => unit.denom === coin.display)
      ?.exponent as number

    const a = new BigNumber(balance.amount || 0)
    const amount = a.multipliedBy(10 ** -exp)
    setBalance(amount)
  }, [address, getRpcEndpoint, getStargateClient])

  const handleClickSpend = (percent: number) => {
    return () => {
      console.log(percent)
    }
  }

  const handleClickPurchase = async () => {
    const tx = await participate(id, { amount: spendAmount }, true)
    onClose()
  }

  useEffect(() => {
    getBalance()
  }, [getBalance])

  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p="0">
          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}>
            <Flex direction="column" p="64px" gap="32px">
              <Flex direction="column" gap="16px" alignItems="center">
                <Box w="160px" h="160px">
                  <Image src={image} alt={name} width={160} height={160} />
                </Box>
                <Flex direction="column" alignItems="center">
                  <Text
                    fontSize="16px"
                    fontWeight="500"
                    color="rgba(255, 255, 255, 0.50)"
                  >
                    {symbol}
                  </Text>
                  <Text fontSize="24px" fontWeight="500" color="#FFF">
                    {name}
                  </Text>
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    color="rgba(255, 255, 255, 0.61)"
                    textAlign="center"
                  >
                    {info}
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap="24px">
                <Flex justifyContent="space-between">
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    color="rgba(255, 255, 255, 0.61)"
                  >
                    Max supply
                  </Text>
                  <Flex>
                    <Text fontSize="14px" fontWeight="700" color="#FFF" mr="4px">
                      {numeral(presaleAmount + ownerSupply).format('0,0.00')}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight="400"
                      color="rgba(255, 255, 255, 0.61)"
                    >
                      {symbol}
                    </Text>
                  </Flex>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    color="rgba(255, 255, 255, 0.61)"
                  >
                    Owner supply
                  </Text>
                  <Flex>
                    <Text
                      fontSize="14px"
                      fontWeight="500"
                      color="rgba(255, 255, 255, 0.60)"
                      mr="8px"
                    >
                      (
                      {numeral(ownerSupply)
                        .divide(presaleAmount + ownerSupply)
                        .format('0.00%')}
                      )
                    </Text>
                    <Text fontSize="14px" fontWeight="700" color="#FFF" mr="4px">
                      {numeral(ownerSupply).format('0,0.00')}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight="400"
                      color="rgba(255, 255, 255, 0.61)"
                    >
                      {symbol}
                    </Text>
                  </Flex>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    color="rgba(255, 255, 255, 0.61)"
                  >
                    Pre-sale supply
                  </Text>
                  <Flex>
                    <Text
                      fontSize="14px"
                      fontWeight="500"
                      color="rgba(255, 255, 255, 0.60)"
                      mr="8px"
                    >
                      (
                      {numeral(presaleAmount)
                        .divide(presaleAmount + ownerSupply)
                        .format('0.00%')}
                      )
                    </Text>
                    <Text fontSize="14px" fontWeight="700" color="#FFF" mr="4px">
                      {numeral(presaleAmount).format('0,0.00')}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight="400"
                      color="rgba(255, 255, 255, 0.61)"
                    >
                      {symbol}
                    </Text>
                  </Flex>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    color="rgba(255, 255, 255, 0.61)"
                  >
                    Raised cap
                  </Text>
                  <Flex>
                    <Text fontSize="14px" fontWeight="700" color="#FFF" mr="4px">
                      {numeral(softCap).format('0,0.00')}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight="400"
                      color="rgba(255, 255, 255, 0.61)"
                    >
                      {fundedSymbol}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight="400"
                      color="rgba(255, 255, 255, 0.61)"
                      mx="4px"
                    >
                      ~
                    </Text>
                    <Text fontSize="14px" fontWeight="700" color="#FFF" mr="4px">
                      {numeral(hardCap).format('0,0.00')}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight="400"
                      color="rgba(255, 255, 255, 0.61)"
                    >
                      {fundedSymbol}
                    </Text>
                  </Flex>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    color="rgba(255, 255, 255, 0.61)"
                  >
                    Pre-sale launch duration
                  </Text>
                  <Flex>
                    <Text fontSize="14px" fontWeight="700" color="#FFF">
                      {dayjs(dayjs.unix(startDate)).format('DD MMM YYYY hh:mm')}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight="400"
                      color="rgba(255, 255, 255, 0.61)"
                      mx="4px"
                    >
                      ~
                    </Text>
                    <Text fontSize="14px" fontWeight="700" color="#FFF">
                      {dayjs(dayjs.unix(endDate)).format('DD MMM YYYY hh:mm')}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              justifyContent="space-between"
              gap="8px"
              p="64px"
              bg="#161616"
            >
              <Flex direction="column" gap="32px">
                <Flex gap="4px">
                  <Text
                    fontSize="24px"
                    fontWeight="400"
                    color="rgba(255, 255, 255, 0.61)"
                  >
                    Your account
                  </Text>
                  <Text fontSize="24px" fontWeight="700" color="#FFF">
                    {shortenAddress(address)}
                  </Text>
                </Flex>
                <Flex direction="column" gap="12px">
                  <Flex justifyContent="space-between">
                    <Text fontSize="16px" fontWeight="500" color="#FFF">
                      Spend how much {fundedSymbol}?
                    </Text>
                    <Flex gap="4px">
                      <Text
                        fontSize="14px"
                        fontWeight="400"
                        color="rgba(255, 255, 255, 0.61)"
                      >
                        Balance
                      </Text>
                      <Text fontSize="14px" fontWeight="700" color="#FFF">
                        {balance.toString()}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex gap="12px">
                    <Input
                      color="white"
                      bg="#ffffff0d"
                      border="1px"
                      borderColor="#ffffff33"
                      borderRadius="0px"
                      placeholder="10 INJ ~ 100 INJ"
                      fontSize="14px"
                      id="amount"
                      name="amount"
                      type="text"
                      onChange={(e) => setSpendAmount(Number(e.target.value))}
                    />
                    <Button
                      color="#1B1B1B"
                      bg="rgba(80, 255, 160, 0.80)"
                      onClick={handleClickSpend(100)}
                    >
                      Max
                    </Button>
                  </Flex>
                  <Grid templateColumns="repeat(4, 1fr)" gap="12px">
                    <Button
                      border="1px"
                      borderColor="rgba(255, 255, 255, 0.27)"
                      bg="rgba(241, 241, 241, 0.30)"
                      onClick={handleClickSpend(25)}
                    >
                      25%
                    </Button>
                    <Button
                      border="1px"
                      borderColor="rgba(255, 255, 255, 0.27)"
                      bg="rgba(241, 241, 241, 0.30)"
                      onClick={handleClickSpend(50)}
                    >
                      50%
                    </Button>
                    <Button
                      border="1px"
                      borderColor="rgba(255, 255, 255, 0.27)"
                      bg="rgba(241, 241, 241, 0.30)"
                      onClick={handleClickSpend(75)}
                    >
                      75%
                    </Button>
                    <Button
                      border="1px"
                      borderColor="rgba(255, 255, 255, 0.27)"
                      bg="rgba(241, 241, 241, 0.30)"
                      onClick={handleClickSpend(100)}
                    >
                      100%
                    </Button>
                  </Grid>
                </Flex>
              </Flex>
              <Flex direction="column" gap="8px">
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  color="rgba(255, 255, 255, 0.30)"
                  textAlign="center"
                >
                  Any excess INJ above your allowance is immediately refunded
                </Text>
                <Button variant="primary" onClick={handleClickPurchase}>
                  Purchase
                </Button>
                <Button onClick={onClose}>Close</Button>
              </Flex>
            </Flex>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PurchaseModal
