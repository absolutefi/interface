import {
  Stack,
  Divider,
  Box,
  Text,
  Textarea,
  Input,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { FormikProps } from 'formik'

import Upload from '../upload'

export interface IProjectInfoProps {
  form: FormikProps<any>
  file: File | null
  setFile: (file: File | null) => void
}

export default function ProjectInfo(props: IProjectInfoProps) {
  return (
    <Box display="flex" gap="48px" flexDirection="column">
      <Stack spacing="8px" alignItems="center">
        <Text fontSize="36px" fontWeight={500} color="white" lineHeight={1}>
          Project Information
        </Text>
        <Text
          fontSize="16px"
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
            Project Name
          </Text>
          <Text
            fontSize="14px"
            fontWeight="light"
            color="#FFF"
            opacity={0.7}
            lineHeight={1}
          >
            Write a clear, brief title and subtitle to help people quickly understand
            your project. Both will appear on your project and pre-launch pages.
            <br />
            <br /> Potential backers will also see them if your project appears on
            category pages, search results, or in emails we send to our community.
          </Text>
        </GridItem>
        <GridItem>
          <Grid maxW="container.xl" mx="auto" templateRows="repeat(2, 1fr)">
            <GridItem>
              <Grid
                maxW="container.xl"
                mx="auto"
                templateColumns="repeat(2, 1fr)"
                gap="24px"
              >
                <GridItem>
                  <Text fontSize={16} fontWeight={500} color="white" mb="11px">
                    Name
                  </Text>
                  <FormControl
                    isRequired
                    isInvalid={Boolean(props?.form?.errors?.name)}
                  >
                    <Input
                      color="white"
                      bg="#ffffff0d"
                      border="1px"
                      borderColor="#ffffff33"
                      borderRadius="0px"
                      placeholder="Project name"
                      fontSize="14px"
                      id="name"
                      name="name"
                      type="text"
                      onChange={(event) => {
                        const newValue = event.target.value
                        if (/^[A-Za-z]+$/.test(newValue) || newValue === '') {
                          props?.form?.setFieldValue('name', newValue)
                        }
                      }}
                      value={props?.form?.values?.name}
                    />
                    {Boolean(props?.form?.errors?.name) && (
                      <FormErrorMessage>Project Name is required.</FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem>
                  <Text fontSize={16} fontWeight={500} color="white" mb="11px">
                    Project symbol
                  </Text>
                  <FormControl
                    isRequired
                    isInvalid={Boolean(props?.form?.errors?.symbol)}
                  >
                    <Input
                      color="white"
                      bg="#ffffff0d"
                      border="1px"
                      borderColor="#ffffff33"
                      borderRadius="0px"
                      placeholder="Symbol like ETH, BTC etc.."
                      fontSize="14px"
                      id="symbol"
                      name="symbol"
                      type="text"
                      onChange={props?.form?.handleChange}
                      value={props?.form?.values?.symbol}
                    />
                    {Boolean(props?.form?.errors?.symbol) && (
                      <FormErrorMessage>Symbol is required.</FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem>
              <Text fontSize={16} fontWeight={500} color="white" mb="11px">
                Subtitle
              </Text>
              <FormControl
                isRequired
                isInvalid={Boolean(props?.form?.errors?.subtile)}
              >
                <Textarea
                  color="white"
                  bg="#ffffff0d"
                  border="1px"
                  borderColor="#ffffff33"
                  borderRadius="0px"
                  placeholder="Place your project information"
                  fontSize="14px"
                  id="subtile"
                  name="subtile"
                  onChange={props?.form?.handleChange}
                  value={props?.form?.values?.subtile}
                />
                {Boolean(props?.form?.errors?.subtile) && (
                  <FormErrorMessage>Subtitle is required.</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Divider
        position="relative"
        width="100vw"
        left="calc(-50vw + 50%)"
        opacity={0.05}
      />
      <Grid maxW="container.xl" templateColumns="repeat(2, 1fr)" gap={32}>
        <GridItem>
          <Text fontSize={24} fontWeight={500} color="white">
            Project Image
          </Text>
          <Text
            fontSize={14}
            fontWeight="light"
            color="#FFF"
            opacity={0.7}
            lineHeight={1}
          >
            Add an image that clearly represents your project. it’ll appear on your
            project avatar <br /> <br /> Your image should be at least 64x64 pixels.
            It will be cropped to a 1 : 1 ratio. {}
          </Text>
        </GridItem>
        <GridItem>
          <FormControl isRequired isInvalid={Boolean(props?.form?.errors?.image)}>
            <Upload file={props?.file} setFile={props?.setFile} form={props?.form} />
            {Boolean(props?.form?.errors?.image) && (
              <FormErrorMessage>Project Image is required.</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>
      </Grid>
      {/* <Divider
        position="relative"
        width="100vw"
        left="calc(-50vw + 50%)"
        opacity={0.05}
      />
      <Grid templateRows="repeat(2, 1fr)" gap="32px" maxW="container.xl" mx="auto">
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={32}
          maxW="container.xl"
          mx="auto"
        >
          <GridItem>
            <Text fontSize="24px" color="white">
              Project Description
            </Text>
            <Text fontSize="14px" color="white" opacity="0.7">
              Describe what you're raising funds to do, why you care about it, how
              you plan to make it happen, and who you are.
            </Text>
          </GridItem>
        </Grid>
        <GridItem>
          <Text fontSize="16px" color="white" mb="11px">
            Description
          </Text>
          <Input
            bg="#ffffff0d"
            border="1px"
            borderColor="#ffffff33"
            borderRadius="0px"
          ></Input>
        </GridItem>
      </Grid> */}
    </Box>
  )
}
