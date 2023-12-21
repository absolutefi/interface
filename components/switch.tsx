import { Flex, Button } from '@chakra-ui/react'
import { ManagePageTabs } from '../pages/manage'

export interface SwitchProps {
  titleA: ManagePageTabs
  titleB: ManagePageTabs
  active: ManagePageTabs
  onChange: (active: ManagePageTabs) => void
}

const Switch = (props: SwitchProps) => {
  const handleChange = (title: ManagePageTabs) => {
    props.onChange(title)
  }

  const ActiveSwitch = (title: ManagePageTabs) => {
    return (
      <Button
        variant={props?.active === title ? 'primary' : 'ghost'}
        onClick={() => handleChange(title)}
      >
        {title}
      </Button>
    )
  }

  return (
    <Flex direction="row" p="8px" bg="rgba(255, 255, 255, 0.03)" rounded="2px">
      {ActiveSwitch(props.titleA)}
      {ActiveSwitch(props.titleB)}
    </Flex>
  )
}

export default Switch
