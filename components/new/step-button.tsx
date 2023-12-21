import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button } from '@chakra-ui/react'

export enum NEW_PROJECT_STEP {
  PROJECT_INFO,
  PRESALE_INFO,
  CONFIRM_INFO,
}

export interface IStepButtonProps {
  backLabel: string
  backFn: () => void
  nextLabel: string
  nextFn: () => void
}
export const StepButton = ({
  backLabel,
  backFn,
  nextFn,
  nextLabel,
}: IStepButtonProps) => {
  return (
    <Box
      maxW="container.xl"
      mx="auto"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
    >
      <Button
        leftIcon={<ArrowBackIcon color="white" top="2px" position="relative" />}
        variant="unstyled"
        color="white"
        onClick={backFn}
      >
        {backLabel}
      </Button>
      <Button variant="primary" py="8px" px="32px" onClick={nextFn}>
        {nextLabel}
      </Button>
    </Box>
  )
}
