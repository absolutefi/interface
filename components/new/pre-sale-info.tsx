import React, { useState } from 'react'
import {
  Text,
  Stack,
  Box,
  Divider,
  Grid,
  GridItem,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberInputField,
  NumberInput,
  FormErrorMessage,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'

import { regExpPositiveNumberWithDecimal } from '../../utils/format'
import { FormikProps } from 'formik'
import dayjs from 'dayjs'

interface Props {
  form: FormikProps<any>
  symbol: string
}
export const PreSaleInfo = ({ form, symbol }: Props) => {
  const filterPassedTime = (time: Date) => {
    const currentDate = dayjs()
    const selectedDate = dayjs(time)
    return selectedDate.isAfter(currentDate)
  }

  const handleChangeNumberInput = (
    inputName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value
    if (regExpPositiveNumberWithDecimal.test(inputValue) || inputValue === '') {
      form?.setFieldValue(inputName, inputValue)
    }
  }

  return (
    <Box display="flex" gap="48px" flexDirection="column">
      <Stack spacing={'8px'} alignItems="center">
        <Text fontSize={36} fontWeight={500} color="white" lineHeight={1}>
          Pre-sale launch Information
        </Text>
        <Text
          fontSize={16}
          fontWeight="light"
          color="#FFF"
          opacity={0.7}
          lineHeight={1}
        >
          Make it easy for people to learn about your project.
        </Text>
      </Stack>
      <Divider
        position="relative"
        width="100vw"
        left="calc(-50vw + 50%)"
        opacity={0.05}
      />
      <Grid maxW="container.xl" mx="auto" templateColumns="repeat(2, 1fr)" gap={32}>
        <GridItem>
          <Text fontSize="24px" fontWeight={500} color="white">
            Max Supply
          </Text>
          <Text
            fontSize={14}
            fontWeight="light"
            color="#FFF"
            opacity={0.7}
            lineHeight={1}
          >
            Write a clear, brief title and subtitle to help people quickly understand
            your project. Both will appear on your project and pre-launch pages.
          </Text>
        </GridItem>
        <GridItem gap={'7px'} display={'flex'} flexDirection={'column'}>
          <Text fontSize={16} fontWeight={500} color="white">
            Max Supply
          </Text>
          <FormControl isRequired isInvalid={Boolean(form?.errors?.maxSupply)}>
            <InputGroup>
              <NumberInput w="100%" value={form.values.maxSupply}>
                <NumberInputField
                  borderRadius={0}
                  id="maxSupply"
                  name="maxSupply"
                  type="number"
                  color="white"
                  bg="#ffffff0d"
                  border="1px"
                  borderColor="#ffffff33"
                  placeholder="9999"
                  fontSize="14px"
                  onChange={(event) => handleChangeNumberInput('maxSupply', event)}
                />
              </NumberInput>
              <InputRightAddon borderRadius={0} color={'black'}>
                {symbol}
              </InputRightAddon>
            </InputGroup>
            {Boolean(form?.errors?.maxSupply) && (
              <FormErrorMessage>Max Supply is required.</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>
      </Grid>
      <Divider
        position="relative"
        width="100vw"
        left="calc(-50vw + 50%)"
        opacity={0.05}
      />
      <Grid maxW="container.xl" mx="auto" templateColumns="repeat(2, 1fr)" gap={32}>
        <GridItem>
          <Text fontSize="24px" fontWeight={500} color="white">
            Owner share
          </Text>
          <Text
            fontSize={14}
            fontWeight="light"
            color="#FFF"
            opacity={0.7}
            lineHeight={1}
          >
            Write a clear, brief title and subtitle to help people quickly understand
            your project. Both will appear on your project and pre-launch pages.
          </Text>
        </GridItem>
        <GridItem gap={'38px'} display={'flex'} flexDirection={'column'}>
          <Box display="flex" flexDirection="column" gap="7px">
            <Text fontSize={16} fontWeight={500} color="white">
              Owner supply
            </Text>
            <FormControl isRequired isInvalid={Boolean(form?.errors?.ownerSupply)}>
              <InputGroup>
                <NumberInput w="100%" value={form.values.ownerSupply}>
                  <NumberInputField
                    borderRadius={0}
                    id="ownerSupply"
                    name="ownerSupply"
                    type="number"
                    color="white"
                    bg="#ffffff0d"
                    border="1px"
                    borderColor="#ffffff33"
                    placeholder="99"
                    fontSize="14px"
                    onChange={(event) =>
                      handleChangeNumberInput('ownerSupply', event)
                    }
                  />
                </NumberInput>

                <InputRightAddon borderRadius={0} color={'black'}>
                  %
                </InputRightAddon>
              </InputGroup>
              {Boolean(form?.errors?.ownerSupply) && (
                <FormErrorMessage>Owner supply is required.</FormErrorMessage>
              )}
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="column" gap="7px">
            <Text fontSize={16} fontWeight={500} color="white">
              Pre-sale supply (Max cap)
            </Text>
            <FormControl isRequired isInvalid={Boolean(form?.errors?.maxCap)}>
              <InputGroup>
                <NumberInput w="100%" color={'white'} value={form.values.maxCap}>
                  <NumberInputField
                    borderRadius={0}
                    id="maxCap"
                    name="maxCap"
                    type="number"
                    color="white"
                    bg="#ffffff0d"
                    border="1px"
                    borderColor="#ffffff33"
                    placeholder="99"
                    fontSize="14px"
                    onChange={(event) => handleChangeNumberInput('maxCap', event)}
                  />
                </NumberInput>
                <InputRightAddon borderRadius={0} color={'black'}>
                  %
                </InputRightAddon>
              </InputGroup>
              {Boolean(form?.errors?.maxCap) && (
                <FormErrorMessage> Pre-sale supply is required.</FormErrorMessage>
              )}
            </FormControl>
          </Box>
        </GridItem>
      </Grid>
      <Divider
        position="relative"
        width="100vw"
        left="calc(-50vw + 50%)"
        opacity={0.05}
      />
      <Grid maxW="container.xl" mx="auto" templateColumns="repeat(2, 1fr)" gap={32}>
        <GridItem>
          <Text fontSize="24px" fontWeight={500} color="white">
            Raised cap
          </Text>
          <Text
            fontSize={14}
            fontWeight="light"
            color="#FFF"
            style={{
              opacity: 0.7,
            }}
            lineHeight={1}
          >
            Write a clear, brief title and subtitle to help people quickly understand
            your project. Both will appear on your project and pre-launch pages.
          </Text>
        </GridItem>
        <GridItem gap={'38px'} display={'flex'} flexDirection={'row'}>
          <Grid templateColumns="repeat(2, 1fr)" gap={2} w="100%">
            <Box display="flex" flexDirection="column" gap="7px">
              <Text fontSize={16} fontWeight={500} color="white">
                Minimum raised{' '}
              </Text>
              <FormControl
                isRequired
                isInvalid={Boolean(form?.errors?.minSpentAllowance)}
              >
                <InputGroup>
                  <NumberInput
                    w="100%"
                    color={'white'}
                    value={form.values.minSpentAllowance}
                  >
                    <NumberInputField
                      borderRadius={0}
                      id="minSpentAllowance"
                      name="minSpentAllowance"
                      type="number"
                      color="white"
                      bg="#ffffff0d"
                      border="1px"
                      borderColor="#ffffff33"
                      placeholder="99"
                      fontSize="14px"
                      onChange={(event) =>
                        handleChangeNumberInput('minSpentAllowance', event)
                      }
                    />
                  </NumberInput>
                  <InputRightAddon borderRadius={0} color={'black'}>
                    INJ
                  </InputRightAddon>
                </InputGroup>
                {Boolean(form?.errors?.minSpentAllowance) && (
                  <FormErrorMessage>Minimum raised is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box display="flex" flexDirection="column" gap="7px" w="100%">
              <Text fontSize={16} fontWeight={500} color="white">
                Maximum raised
              </Text>
              <FormControl
                isRequired
                isInvalid={Boolean(form?.errors?.maxSpentAllowance)}
              >
                <InputGroup>
                  <NumberInput
                    w="100%"
                    color={'white'}
                    value={form.values.maxSpentAllowance}
                  >
                    <NumberInputField
                      borderRadius={0}
                      id="maxSpentAllowance"
                      name="maxSpentAllowance"
                      type="number"
                      color="white"
                      bg="#ffffff0d"
                      border="1px"
                      borderColor="#ffffff33"
                      placeholder="99"
                      fontSize="14px"
                      onChange={(event) =>
                        handleChangeNumberInput('maxSpentAllowance', event)
                      }
                    />
                  </NumberInput>
                  <InputRightAddon borderRadius={0} color={'black'}>
                    INJ
                  </InputRightAddon>
                </InputGroup>
                {Boolean(form?.errors?.maxSpentAllowance) && (
                  <FormErrorMessage>Maximum raised is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </Grid>
        </GridItem>
      </Grid>
      <Divider
        position="relative"
        width="100vw"
        left="calc(-50vw + 50%)"
        opacity={0.05}
      />
      <Grid maxW="container.xl" mx="auto" templateColumns="repeat(2, 1fr)" gap={32}>
        <GridItem>
          <Text fontSize="24px" fontWeight={500} color="white">
            Pre-sale launch duration
          </Text>
          <Text
            fontSize={14}
            fontWeight="light"
            color="#FFF"
            opacity={0.7}
            lineHeight={1}
          >
            Write a clear, brief title and subtitle to help people quickly understand
            your project. Both will appear on your project and pre-launch pages.
          </Text>
        </GridItem>
        <GridItem gap={'38px'} display={'flex'} flexDirection={'column'}>
          <Box display="flex" flexDirection="column" gap="7px">
            <Text fontSize={16} fontWeight={500} color="white">
              Start date
            </Text>
            <FormControl isRequired isInvalid={Boolean(form?.errors?.startDate)}>
              <Box
                style={
                  Boolean(form?.errors?.startDate)
                    ? {
                        border: '1px solid red',
                      }
                    : {}
                }
              >
                <DatePicker
                  selected={form.values.startDate}
                  onChange={(date: Date) => form.setFieldValue('startDate', date)}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy hh:mm aa"
                  placeholderText="00/00/0000 00:00 AM"
                  filterTime={filterPassedTime}
                  excludeDateIntervals={[
                    {
                      start: dayjs(0).toDate(),
                      end: dayjs().subtract(1, 'day').toDate(),
                    },
                  ]}
                />
              </Box>
              {Boolean(form?.errors?.startDate) && (
                <FormErrorMessage>Start Date is required.</FormErrorMessage>
              )}
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="column" gap="7px">
            <Text fontSize={16} fontWeight={500} color="white">
              End date
            </Text>
            <FormControl isRequired isInvalid={Boolean(form?.errors?.endDate)}>
              <Box
                style={
                  Boolean(form?.errors?.endDate)
                    ? {
                        border: '1px solid red',
                      }
                    : {}
                }
              >
                <DatePicker
                  selected={form.values.endDate}
                  onChange={(date: Date) => form.setFieldValue('endDate', date)}
                  showTimeSelect
                  placeholderText="00/00/0000 00:00 AM"
                  dateFormat="dd/MM/yyyy hh:mm aa"
                  filterTime={filterPassedTime}
                  excludeDateIntervals={[
                    {
                      start: dayjs(0).toDate(),
                      end: dayjs(form.values.startDate || 0)
                        .subtract(1, 'day')
                        .toDate(),
                    },
                  ]}
                />
              </Box>
              {Boolean(form?.errors?.endDate) && (
                <FormErrorMessage>End Date is required.</FormErrorMessage>
              )}
            </FormControl>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}
