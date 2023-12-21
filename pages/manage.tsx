import dynamic from 'next/dynamic'
import { Box, Container, Divider, Flex, Grid, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useChain } from '@cosmos-kit/react'
import dayjs from 'dayjs'

import { chainName } from '../config'
import { shortenAddress } from '../utils/format'
import { useContract } from '../hooks/useContract'
import { BigNumberInWei } from '@injectivelabs/utils'
import numeral from 'numeral'

const Switch = dynamic(import('../components/switch'), { ssr: false })
const TokenCard = dynamic(import('../components/token-card'), { ssr: false })

export enum ManagePageTabs {
  YourProject = 'Your project',
  RaisedProject = 'Raised project',
}

const ManagePage = () => {
  const [activeSwitch, setActiveSwitch] = useState(ManagePageTabs.YourProject)
  const { status, address } = useChain(chainName)

  const [sales, setSales] = useState<any>([])
  const [price, setPrice] = useState<number>(0)

  const { getSalesOwner } = useContract()

  const querySales = useCallback(async () => {
    if (!address) {
      return
    }
    const { sales } = await getSalesOwner(address)
    setSales(sales)
  }, [address, getSalesOwner])

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=injective-protocol&vs_currencies=usd'
      )
      const data = await res.json()
      setPrice(data['injective-protocol'].usd)
    }

    fetchPrice()

    const interval = setInterval(() => {
      querySales()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container maxW="container.xl" py="12px" mt="51px">
      <Flex justifyContent="space-between" mb="32px" alignItems="flex-end">
        <Box>
          <Text as="div" textColor="white" fontWeight="400" opacity="0.7">
            Your account
          </Text>
          <Text as="div" fontSize="36px" textColor="white" fontWeight="500">
            {status === 'Connected' ? shortenAddress(address) : 'Not connected'}
          </Text>
        </Box>
        <Switch
          titleA={ManagePageTabs.YourProject}
          titleB={ManagePageTabs.RaisedProject}
          active={activeSwitch}
          onChange={(state) => setActiveSwitch(state)}
        />
      </Flex>
      <Divider color="white" opacity="0.1" my="32px" />
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap="24px"
      >
        {sales?.map(({ sale, progress, status }: any, idx: number) => {
          return (
            <TokenCard
              key={idx}
              id={sale.id}
              image={sale.token_logo}
              addr={sale.token_addr}
              name={sale.token_name}
              symbol={sale.token_symbol}
              info={sale.token_description}
              fundedSymbol="INJ"
              fundedAmount={new BigNumberInWei(progress.cur_raised)
                .toBase()
                .toNumber()}
              fundedValue={
                numeral(new BigNumberInWei(progress.cur_raised).toBase().toNumber())
                  .multiply(price)
                  .value()!
              }
              fundedMaxAmount={new BigNumberInWei(sale.hard_cap).toBase().toNumber()}
              startDate={dayjs.unix(sale.start).unix()}
              endDate={dayjs.unix(sale.end).unix()}
              ownerSupply={new BigNumberInWei(sale.owner_allocation)
                .toBase(6)
                .toNumber()}
              softCap={new BigNumberInWei(sale.soft_cap).toBase().toNumber()}
              hardCap={new BigNumberInWei(sale.hard_cap).toBase().toNumber()}
              presaleAmount={new BigNumberInWei(sale.token_sale_amt)
                .toBase(6)
                .toNumber()}
            />
          )
        })}
      </Grid>
    </Container>
  )
}

export default ManagePage
