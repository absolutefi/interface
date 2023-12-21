import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import numeral from 'numeral'
import { useCallback, useMemo } from 'react'
import Tilt from 'react-parallax-tilt'

import { Box, Button, Flex, Progress, Text, useDisclosure } from '@chakra-ui/react'
import { WalletStatus } from '@cosmos-kit/core'
import { useChain } from '@cosmos-kit/react'

import { chainName } from '../config'
import PurchaseModal from './purchase-modal'
import { useContract } from '../hooks/useContract'

dayjs.extend(relativeTime)

enum Status {
  Upcoming,
  Live,
  Success,
  Failed,
}

interface TokenCardProps {
  id: number
  image: string
  addr: string
  name: string
  symbol: string
  info: string
  fundedSymbol: string
  fundedAmount: number
  fundedValue: number
  fundedMaxAmount: number
  startDate: number
  endDate: number
  softCap: number
  hardCap: number
  ownerSupply: number
  presaleAmount: number
}

const TokenCard = ({
  id,
  image,
  addr,
  name,
  symbol,
  info,
  fundedSymbol,
  fundedAmount,
  fundedValue,
  fundedMaxAmount,
  startDate,
  endDate,
  softCap,
  hardCap,
  ownerSupply,
  presaleAmount,
}: TokenCardProps) => {
  const progress = (fundedAmount / fundedMaxAmount) * 100

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { connect, status: walletStatus } = useChain(chainName)
  const { claim, refund } = useContract()

  const handleClaim = useCallback(async () => {
    try {
      const res = await claim(id)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }, [claim, id])

  const handleRefund = useCallback(async () => {
    try {
      const res = await refund(id)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }, [refund, id])

  const upcoming = useMemo(() => {
    return (
      <>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="primary">
              {numeral(fundedAmount).format('0,0')} {fundedSymbol}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              / {numeral(fundedMaxAmount).format('0,0')} {fundedSymbol}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="500" color="rgba(255, 255, 255, 0.80)">
              Presale start in
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              {dayjs(dayjs.unix(startDate)).toNow(true)}
            </Text>
          </Flex>
        </Flex>
        <Progress size="xs" colorScheme="purple" value={progress} />
      </>
    )
  }, [fundedAmount, fundedMaxAmount, fundedSymbol, progress, startDate])

  const live = useMemo(() => {
    return (
      <>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="primary">
              {numeral(fundedAmount).format('0,0.00')} {fundedSymbol}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              / {numeral(fundedMaxAmount).format('0,0.00')} {fundedSymbol}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="#FFF">
              ${numeral(fundedValue).format('0,0.00a')}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              backed
            </Text>
          </Flex>
        </Flex>
        <Progress size="xs" colorScheme="purple" value={progress} />
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="500" color="rgba(255, 255, 255, 0.80)">
              {numeral(fundedAmount / fundedMaxAmount).format('0.00%')}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              funded
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="500" color="rgba(255, 255, 255, 0.80)">
              {dayjs(dayjs.unix(endDate)).toNow(true)}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              to go
            </Text>
          </Flex>
        </Flex>
      </>
    )
  }, [endDate, fundedAmount, fundedMaxAmount, fundedSymbol, fundedValue, progress])

  const success = useMemo(() => {
    return (
      <>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              Ended :
            </Text>
            <Text fontSize="14px" fontWeight="700" color="rgba(80, 255, 160, 0.80)">
              Success
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="primary">
              {numeral(fundedAmount).format('0,0.00')} {fundedSymbol}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              backed
            </Text>
          </Flex>
        </Flex>
        <Progress size="xs" colorScheme="green" value={progress} />
        <Button variant="primary" mt="8px" onClick={handleClaim}>
          Claim
        </Button>
      </>
    )
  }, [fundedAmount, fundedSymbol, handleClaim, progress])

  const failed = useMemo(() => {
    return (
      <>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              Ended :
            </Text>
            <Text fontSize="14px" fontWeight="700" color="rgba(255, 141, 141, 0.80)">
              Failed
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="primary">
              {numeral(fundedAmount).format('0,0.00')} {fundedSymbol}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              backed
            </Text>
          </Flex>
        </Flex>
        <Progress size="xs" colorScheme="red" value={progress} />
        <Button variant="primary" mt="8px" onClick={handleRefund}>
          Refund
        </Button>
      </>
    )
  }, [fundedAmount, fundedSymbol, handleRefund, progress])

  const status = useMemo(() => {
    const now = dayjs().unix()
    const start = dayjs.unix(startDate).unix()
    const end = dayjs.unix(endDate).unix()

    if (now > end && fundedAmount < softCap) return Status.Failed
    if (now >= start && now <= end) return Status.Live
    if (fundedAmount >= softCap) return Status.Success
    return Status.Upcoming
  }, [endDate, fundedAmount, softCap, startDate])

  const content = useMemo(() => {
    switch (status) {
      case Status.Upcoming:
        return upcoming
      case Status.Live:
        return live
      case Status.Success:
        return success
      case Status.Failed:
        return failed
    }
  }, [failed, live, status, success, upcoming])

  return (
    <Tilt
      tiltEnable={false}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="#D4B3FF"
      glareBorderRadius="2px"
      glarePosition="all"
    >
      <Flex
        direction="column"
        p="24px"
        gap="32px"
        rounded="2px"
        bg="rgba(255, 255, 255, 0.03)"
        justifyContent="space-between"
        cursor={status === Status.Live ? 'pointer' : undefined}
        onClick={
          status === Status.Live
            ? walletStatus !== WalletStatus.Connected
              ? connect
              : onOpen
            : undefined
        }
        h="330px"
      >
        <Flex direction="column" gap="16px">
          <Box w="64px" h="64px">
            <Image src={image} alt={name} width={64} height={64} />
          </Box>
          <Flex direction="column">
            <Text fontSize="24px" fontWeight="500" color="#FFF">
              {name}
            </Text>
            <Text
              fontSize="14px"
              fontWeight="400"
              color="rgba(255, 255, 255, 0.61)"
              noOfLines={2}
            >
              {info}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" gap="8px">
          {content}
        </Flex>
      </Flex>
      <PurchaseModal
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        addr={addr}
        image={image}
        name={name}
        symbol={symbol}
        info={info}
        fundedSymbol={fundedSymbol}
        startDate={startDate}
        endDate={endDate}
        softCap={softCap}
        hardCap={hardCap}
        ownerSupply={ownerSupply}
        presaleAmount={presaleAmount}
      />
    </Tilt>
  )
}

export default TokenCard
