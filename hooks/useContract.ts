import { StdFee } from '@cosmjs/stargate'
import { useChainWallet } from '@cosmos-kit/react'
import { Network } from '@injectivelabs/networks'
import { MsgExecuteContractCompat } from '@injectivelabs/sdk-ts'
import { ChainId } from '@injectivelabs/ts-types'
import { BigNumberInBase, INJ_DENOM } from '@injectivelabs/utils'
import { MsgBroadcaster, WalletStrategy } from '@injectivelabs/wallet-ts'
import { useCallback } from 'react'
import { useToast } from '@chakra-ui/react'

import { chainName } from '../config'
import { SellParam } from '../intefaces/sale'

const CONTRACT_ADDRESS = 'inj1ayq30pl2v5hnzyxczc884nrue9cg68lf6fgfan'
const denom = 'inj'
const GAS_PRICE = `100`
const GAS_LIMIT = `200261`

export const useContract = () => {
  const toast = useToast()
  const { getSigningCosmWasmClient, address } = useChainWallet(
    chainName,
    'keplr-extension',
    false
  )

  const createPresale = async (amount: any, sellParam: any) => {
    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress: CONTRACT_ADDRESS,
      sender: address || '',
      msg: {
        create_presale_msg: {
          amount: amount,
          param: sellParam,
        },
      },
    })

    const walletStrategy = new WalletStrategy({
      chainId: ChainId.Testnet,
    })
    const msgBroadcastClient = new MsgBroadcaster({
      walletStrategy,
      network: Network.TestnetK8s,
    })

    const result = await msgBroadcastClient.broadcast({
      msgs: msg,
      injectiveAddress: address || '',
    })

    toast({
      title: 'Create presale success',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    return result
  }

  const participate = async (
    id: number,
    cur: any, ///?? Asset
    allowPartial: boolean
  ) => {
    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress: CONTRACT_ADDRESS,
      sender: address || '',
      msg: {
        participate_msg: {
          id,
          cur: {
            info: {
              native: 'uinj',
            },
            amount: new BigNumberInBase(cur.amount).toWei().toFixed(),
          },
          allow_partial: allowPartial,
        },
      },
      funds: [
        {
          denom: INJ_DENOM,
          amount: new BigNumberInBase(cur.amount).toWei().toFixed(),
        },
      ],
    })

    const walletStrategy = new WalletStrategy({
      chainId: ChainId.Testnet,
    })
    const msgBroadcastClient = new MsgBroadcaster({
      walletStrategy,
      network: Network.TestnetK8s,
    })

    const result = await msgBroadcastClient.broadcast({
      msgs: msg,
      injectiveAddress: address || '',
    })

    toast({
      title: 'Purchase success',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    return result
  }

  const claim = async (id: number) => {
    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress: CONTRACT_ADDRESS,
      sender: address || '',
      msg: {
        claim_msg: {
          id,
        },
      },
    })

    const walletStrategy = new WalletStrategy({
      chainId: ChainId.Testnet,
    })
    const msgBroadcastClient = new MsgBroadcaster({
      walletStrategy,
      network: Network.TestnetK8s,
    })

    const result = await msgBroadcastClient.broadcast({
      msgs: msg,
      injectiveAddress: address || '',
    })

    toast({
      title: 'Claim success',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    return result
  }

  const refund = async (id: number) => {
    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress: CONTRACT_ADDRESS,
      sender: address || '',
      msg: {
        refund_msg: {
          id,
        },
      },
    })

    const walletStrategy = new WalletStrategy({
      chainId: ChainId.Testnet,
    })
    const msgBroadcastClient = new MsgBroadcaster({
      walletStrategy,
      network: Network.TestnetK8s,
    })

    const result = await msgBroadcastClient.broadcast({
      msgs: msg,
      injectiveAddress: address || '',
    })

    toast({
      title: 'Refund success',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    return result
  }

  const getAdmin = async () => {
    const client = await getSigningCosmWasmClient()

    return await client.queryContractSmart(CONTRACT_ADDRESS, {
      admin: {},
    })
  }

  const getConfig = async () => {
    const client = await getSigningCosmWasmClient()

    return await client.queryContractSmart(CONTRACT_ADDRESS, {
      config: {},
    })
  }

  const getSales = useCallback(
    async (startAfter?: number, limit?: number, isAscending?: boolean) => {
      const client = await getSigningCosmWasmClient()

      return await client.queryContractSmart(CONTRACT_ADDRESS, {
        sales: {},
      })
    },
    [getSigningCosmWasmClient]
  )

  const getSalesOwner = async (
    address: string,
    startAfter?: number,
    limit?: number,
    isAscending?: boolean
  ) => {
    const client = await getSigningCosmWasmClient()

    return await client.queryContractSmart(CONTRACT_ADDRESS, {
      sales_owner: {
        address,
      },
    })
  }

  const getProgress = async (id: number, address: string) => {
    const client = await getSigningCosmWasmClient()

    return await client.queryContractSmart(CONTRACT_ADDRESS, {
      progress: {
        id,
        address,
      },
    })
  }

  return {
    createPresale,
    participate,
    claim,
    refund,
    getAdmin,
    getConfig,
    getSales,
    getSalesOwner,
    getProgress,
  }
}
