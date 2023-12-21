import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Stack,
} from '@chakra-ui/react'
import { INewProject } from '../../pages/new'
import dayjs from 'dayjs'
import numeral from 'numeral'
import { useMemo } from 'react'
import Tilt from 'react-parallax-tilt'

interface IProps {
  file: File | null
  presale: INewProject['presale']
  project: INewProject['project']
}

const ConfirmSaleInfo = ({ presale, project, ...props }: IProps) => {
  const preSaleSupplyPercent = useMemo(() => {
    const maxCap = numeral(presale?.maxCap)
    return maxCap.divide(Number(presale?.maxSupply)).format('0.00%')
  }, [presale?.maxCap, presale?.maxSupply])

  const ownerSupplyPercent = useMemo(() => {
    const ownerSupply = numeral(presale?.ownerSupply)
    return ownerSupply.divide(Number(presale?.maxSupply)).format('0.00%')
  }, [presale?.ownerSupply, presale?.maxSupply])

  return (
    <div>
      <Stack spacing="8px" alignItems="center">
        <Text fontSize="36px" fontWeight={500} color="white" lineHeight={1}>
          Confirm your infomation
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
        mt="10"
        opacity={0.05}
      />
      <Container mt="48px" mb="48px" centerContent>
        <Tilt
          tiltEnable={false}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#D4B3FF"
          glareBorderRadius="2px"
          glarePosition="all"
        >
          <Box bg={'rgba(255, 255, 255, 0.03)'} minW="627px" p="24px">
            <Container centerContent>
              {props?.file && (
                <Image
                  boxSize="160px"
                  src={URL.createObjectURL(props?.file)}
                  objectFit="cover"
                  alt="alt image"
                  border=" 1px solid rgba(255, 255, 255, 0.20);"
                />
              )}
              <Text
                as="div"
                fontSize="16px"
                color="rgba(255, 255, 255, 0.61)"
                mt="16px"
              >
                {project?.symbol}
              </Text>
              <Text as="div" fontSize="24px" color="white">
                {project?.name}
              </Text>
              <Text
                as="div"
                fontSize="14px"
                color="rgba(255, 255, 255, 0.61)"
                align="center"
              >
                {project?.subtile}
              </Text>
              <Grid
                w={'100%'}
                templateColumns="1fr 2fr"
                gap={1}
                rowGap="24px"
                mt="22px"
              >
                <GridItem colSpan={1}>
                  <Text as="span" fontSize="14px" color="rgba(255, 255, 255, 0.61)">
                    Max supply
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Flex color="white" justify="flex-end">
                    <Text
                      as="span"
                      fontSize="14px"
                      fontWeight="700"
                      color="#fff"
                      mr="4px"
                    >
                      {numeral(presale?.maxSupply).format('0,0')}
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      color="rgba(255, 255, 255, 0.61)"
                    >
                      {project?.symbol}
                    </Text>
                  </Flex>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text as="span" fontSize="14px" color="rgba(255, 255, 255, 0.61)">
                    Owner supply
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Flex color="white" justify="flex-end">
                    <Text
                      as="span"
                      fontSize="14px"
                      color="rgba(255, 255, 255, 0.61)"
                      mr="8px"
                    >
                      ({ownerSupplyPercent})
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      fontWeight="700"
                      color="#fff"
                      mr="4px"
                    >
                      {numeral(presale?.ownerSupply).format('0,0')}
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      color="rgba(255, 255, 255, 0.61)"
                    >
                      {project?.symbol}
                    </Text>
                  </Flex>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text as="span" fontSize="14px" color="rgba(255, 255, 255, 0.61)">
                    Pre-sale supply
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Flex color="white" justify="flex-end">
                    <Text
                      as="span"
                      fontSize="14px"
                      color="rgba(255, 255, 255, 0.61)"
                      mr="8px"
                    >
                      ({preSaleSupplyPercent})
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      fontWeight="700"
                      color="#fff"
                      mr="4px"
                    >
                      {numeral(presale?.maxCap).format('0,0')}
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      color="rgba(255, 255, 255, 0.61)"
                    >
                      {project?.symbol}
                    </Text>
                  </Flex>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text as="span" fontSize="14px" color="rgba(255, 255, 255, 0.61)">
                    Raised cap
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Flex color="white" justify="flex-end">
                    <Text
                      as="span"
                      fontSize="14px"
                      fontWeight="700"
                      color="#fff"
                      mr="4px"
                    >
                      {numeral(presale?.minSpentAllowance).format('0,0')}
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      color="rgba(255, 255, 255, 0.61)"
                      mr="2"
                    >
                      INJ
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      color="rgba(255, 255, 255, 0.61)"
                      mr="2"
                    >
                      ~
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      fontWeight="700"
                      color="#fff"
                      mr="4px"
                    >
                      {numeral(presale?.maxSpentAllowance).format('0,0')}
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      color="rgba(255, 255, 255, 0.61)"
                    >
                      INJ
                    </Text>
                  </Flex>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text as="span" fontSize="14px" color="rgba(255, 255, 255, 0.61)">
                    Pre-sale launch duration
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Flex color="white" justify="flex-end">
                    <Text
                      as="span"
                      fontSize="14px"
                      fontWeight="700"
                      color="#fff"
                      mr="4px"
                    >
                      {dayjs(presale.startDate).format('DD/MM/YYYY hh:mm A')}
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      color="rgba(255, 255, 255, 0.61)"
                      mr="2"
                    >
                      ~
                    </Text>
                    <Text as="span" fontSize="14px" fontWeight="700" color="#fff">
                      {dayjs(presale.endDate).format('DD/MM/YYYY hh:mm A')}
                    </Text>
                  </Flex>
                </GridItem>
              </Grid>
            </Container>
          </Box>
        </Tilt>
      </Container>
    </div>
  )
}

export default ConfirmSaleInfo
