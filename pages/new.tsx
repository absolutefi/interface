import { Box, Divider, Container, Button, Grid, GridItem } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import ProjectInfo from '../components/new/project-info'
import { useState, useMemo, useCallback } from 'react'
import { PreSaleInfo } from '../components/new/pre-sale-info'
import ConfirmSaleInfo from '../components/new/confirm-sale-info'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  IStepButtonProps,
  NEW_PROJECT_STEP,
  StepButton,
} from '../components/new/step-button'

import { useRouter } from 'next/router'
import { useContract } from '../hooks/useContract'
import { SellParam } from '../intefaces/sale'
import dayjs from 'dayjs'
import { assets } from 'chain-registry'
import { Asset, AssetList } from '@chain-registry/types'
import { chainName } from '../config'
import { BigNumberInBase } from '@injectivelabs/utils'

export interface INewProject {
  project: {
    name: string
    symbol: string
    subtile: string
    image: File | null
  }
  presale: {
    maxSupply?: number
    ownerSupply?: number
    maxCap?: number
    minSpentAllowance?: number
    maxSpentAllowance?: number
    startDate?: Date
    endDate?: Date
  }
}

const ProjectInfoSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  symbol: Yup.string().required('Required'),
  subtile: Yup.string().required('Required'),
  image: Yup.mixed().required('Required'),
})

const PreSaleSchema = Yup.object().shape({
  maxSupply: Yup.number().required('Required').min(0.0001),
  ownerSupply: Yup.number().required('Required').min(0.0001),
  maxCap: Yup.number().required('Required').min(0.0001),
  minSpentAllowance: Yup.number().required('Required').min(0.0001),
  maxSpentAllowance: Yup.number().required('Required').min(0.0001),
  startDate: Yup.date().required(),
  endDate: Yup.date().required(),
})

const chainassets: AssetList = assets.find(
  (chain) => chain.chain_name === chainName
) as AssetList

const coin: Asset = chainassets.assets.find((asset) => asset.base === 'inj') as Asset

export default function NewProject() {
  const [newProjectStep, setNewProjectStep] = useState<NEW_PROJECT_STEP>(
    NEW_PROJECT_STEP.PROJECT_INFO
  )
  const router = useRouter()
  const { createPresale } = useContract()

  //PROJECT_INFO page
  const projectForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      symbol: '',
      subtile: '',
      image: null,
    },
    validationSchema: ProjectInfoSchema,
    onSubmit: (values: INewProject['project']) => {
      setNewProjectStep(NEW_PROJECT_STEP.PRESALE_INFO)
    },
  })
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = useCallback(async () => {
    try {
      if (!file) {
        return
      }

      const body = new FormData()
      body.append('file', file)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body,
      })

      return response.json()
    } catch (error) {
      console.error(error)
    }
  }, [file])

  //PRESALE_INFO page
  const presaleForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      maxSupply: undefined,
      ownerSupply: undefined,
      maxCap: undefined,
      minSpentAllowance: undefined,
      maxSpentAllowance: undefined,
      startDate: undefined,
      endDate: undefined,
    },
    validationSchema: PreSaleSchema,
    onSubmit: (values: INewProject['presale']) => {
      setNewProjectStep(NEW_PROJECT_STEP.CONFIRM_INFO)
    },
  })

  //CONFIRM_INFO page
  const handleClickPublish = useCallback(async () => {
    const uploadImage = await handleUpload()

    const project = projectForm.values
    const presale = presaleForm.values

    const sellParam: any = {
      start: dayjs(presale.startDate).unix(),
      end: dayjs(presale.endDate).unix(),
      token_sale_amt: new BigNumberInBase(presale.maxCap!).toWei(6).toFixed(), //Pre-sale supply
      cur_info: {
        native: 'uinj',
      }, //????????
      soft_cap: new BigNumberInBase(presale.minSpentAllowance!).toWei().toFixed(),
      hard_cap: new BigNumberInBase(presale.maxSpentAllowance!).toWei().toFixed(),
      // max_cur_alloc_per: 0, //????????
      owner_allocation: new BigNumberInBase(presale.ownerSupply!).toWei(6).toFixed(), //Pre-sale supply
      token_name: project.name,
      token_symbol: project.symbol,
      token_project: project.subtile, //????
      token_description: project.subtile,
      token_marketing: project.subtile,
      token_logo: uploadImage.url,
      // wl_end_time: dayjs(presale.endDate).valueOf(),
    }

    const tx = await createPresale(new BigNumberInBase(1).toFixed(), sellParam)
    router.push('/')
  }, [handleUpload, projectForm.values, presaleForm.values, createPresale, router])

  //step button
  const stepButton: IStepButtonProps = useMemo(() => {
    if (newProjectStep === NEW_PROJECT_STEP.PRESALE_INFO) {
      return {
        backLabel: 'Back to Project Information ',
        backFn: () => setNewProjectStep(NEW_PROJECT_STEP.PROJECT_INFO),
        nextLabel: 'Next',
        nextFn: async () => {
          const validateForm = await presaleForm.validateForm()
          if (Object.keys(validateForm).length > 0) {
            return
          }
          presaleForm.handleSubmit()
        },
      }
    }

    if (newProjectStep === NEW_PROJECT_STEP.CONFIRM_INFO) {
      return {
        backLabel: 'Back to Pre-sale launch Information',
        backFn: () => setNewProjectStep(NEW_PROJECT_STEP.PRESALE_INFO),
        nextLabel: 'Publish',
        nextFn: handleClickPublish,
      }
    }

    return {
      backLabel: 'Exit',
      backFn: () => router.back(),
      nextLabel: 'Next',
      nextFn: async () => {
        const validateForm = await projectForm.validateForm()
        if (Object.keys(validateForm).length > 0) {
          return
        }
        projectForm.handleSubmit()
      },
    }
  }, [newProjectStep, projectForm, presaleForm, router, handleClickPublish])

  return (
    <>
      <Box display="flex" flexDirection="column" gap={'48px'} pb={'48px'}>
        <Container maxW="container.xl" position="relative" left="180px" mt="-50px">
          <Grid
            display="flex"
            justifyContent="space-between"
            templateColumns="repeat(1, 1fr)"
          >
            <GridItem>
              <Button
                leftIcon={
                  <ArrowBackIcon color="white" top="2px" position="relative" />
                }
                variant="unstyled"
                color="white"
                onClick={stepButton.backFn}
              >
                {stepButton.backLabel}
              </Button>
            </GridItem>
            <GridItem>
              <Button
                variant="primary"
                py="8px"
                px="32px"
                position="relative"
                left="-180px"
                onClick={stepButton.nextFn}
              >
                {stepButton.nextLabel}
              </Button>
            </GridItem>
          </Grid>
        </Container>
        <Container maxW="container.xl">
          <Box gap={32}>
            {newProjectStep === NEW_PROJECT_STEP.PROJECT_INFO && (
              <ProjectInfo form={projectForm} file={file} setFile={setFile} />
            )}
            {newProjectStep === NEW_PROJECT_STEP.PRESALE_INFO && (
              <PreSaleInfo form={presaleForm} symbol={projectForm?.values?.symbol} />
            )}
            {newProjectStep === NEW_PROJECT_STEP.CONFIRM_INFO && (
              <ConfirmSaleInfo
                file={file}
                project={projectForm?.values}
                presale={presaleForm?.values}
              />
            )}
            <Divider
              position="relative"
              width="100vw"
              left="calc(-50vw + 50%)"
              mt={12}
              opacity={0.05}
            />
          </Box>
          <Box mt={12}>
            <StepButton {...stepButton} />
          </Box>
        </Container>
      </Box>
    </>
  )
}
