import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import numeral from 'numeral'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Button, Container, Divider, Flex, Grid, Text } from '@chakra-ui/react'

import { useContract } from '../hooks/useContract'
import { BigNumberInBase, BigNumberInWei } from '@injectivelabs/utils'

const TokenCard = dynamic(import('../components/token-card'), { ssr: false })

enum Status {
  Upcoming,
  Live,
  Complete,
  Failed,
}

export default function Home() {
  const [status, setStatus] = useState(Status.Live)
  const [sales, setSales] = useState<any>([])
  const [price, setPrice] = useState<number>(0)

  const { getSales } = useContract()

  const querySales = useCallback(async () => {
    const { sales } = await getSales()
    setSales(sales)
  }, [getSales])

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

  const filteredSales = useMemo(() => {
    if (status === Status.Upcoming) {
      return sales?.filter(({ status }: any) => status === 'not_started')
    } else if (status === Status.Live) {
      return sales?.filter(({ status }: any) => status === 'ongoing')
    } else if (status === Status.Complete) {
      return sales?.filter(({ status }: any) => status === 'ended')
    } else if (status === Status.Failed) {
      return sales?.filter(({ status }: any) => status === 'failed')
    }
    return sales
  }, [status, sales])

  return (
    <Container maxW="container.xl" py={['44px', '88px']}>
      <Flex direction="column">
        <Flex
          direction={['column', 'row']}
          alignItems={[null, 'flex-end']}
          justifyContent="space-between"
          gap="24px"
        >
          <Flex direction="column" gap="8px">
            <Text fontSize="36px">Token launchpad</Text>
            <Text fontSize="24px" fontWeight="400">
              Explore&nbsp;
              <Text fontWeight="500" color="primary" as="span">
                {numeral(sales?.length).format('0,0')} projects
              </Text>
            </Text>
          </Flex>
          <Flex direction="row" p="8px" bg="rgba(255, 255, 255, 0.03)" rounded="2px">
            <Button
              variant={status === Status.Upcoming ? 'primary' : 'ghost'}
              onClick={() => setStatus(Status.Upcoming)}
            >
              Upcoming
            </Button>
            <Button
              variant={status === Status.Live ? 'primary' : 'ghost'}
              onClick={() => setStatus(Status.Live)}
            >
              Live tokens
            </Button>
            <Button
              variant={status === Status.Complete ? 'primary' : 'ghost'}
              onClick={() => setStatus(Status.Complete)}
            >
              Complete
            </Button>
            <Button
              variant={status === Status.Failed ? 'primary' : 'ghost'}
              onClick={() => setStatus(Status.Failed)}
            >
              Failed
            </Button>
          </Flex>
        </Flex>
        <Divider
          orientation="horizontal"
          my="32px"
          borderBottom="2px"
          borderColor="rgba(255, 255, 255, 0.05)"
        />
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
          gap="24px"
        >
          {filteredSales?.map(({ sale, progress, status }: any, idx: number) => {
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
                  numeral(
                    new BigNumberInWei(progress.cur_raised).toBase().toNumber()
                  )
                    .multiply(price)
                    .value()!
                }
                fundedMaxAmount={new BigNumberInWei(sale.hard_cap)
                  .toBase()
                  .toNumber()}
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
      </Flex>
    </Container>
  )
}
