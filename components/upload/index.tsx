import { Box, Image, Square, Text, Icon, Flex } from '@chakra-ui/react'
import { ChangeEvent, useRef } from 'react'
import { MdPhotoLibrary } from 'react-icons/md'
import { FormikProps } from 'formik'

export interface IUploadProps {
  form: FormikProps<any>
  file: File | null
  setFile: (file: File | null) => void
}

const Upload = (props: IUploadProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e?.target?.files) {
        return
      }

      props.setFile(e?.target?.files?.[0])
      props?.form?.setFieldValue('image', e?.target?.files?.[0])
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenfile = () => {
    try {
      if (hiddenFileInput.current) {
        hiddenFileInput.current.click()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const emptyFile = () => {
    return (
      <Square
        bg="rgba(255, 255, 255, 0.05);"
        size="150px"
        style={{ cursor: 'pointer' }}
        onClick={() => handleOpenfile()}
        border={
          !Boolean(props?.form?.errors?.image)
            ? '1px solid rgba(255, 255, 255, 0.20);'
            : '2px solid rgba(229, 62, 62, 1);'
        }
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          h="100%"
          p="12px"
        >
          <Icon as={MdPhotoLibrary} color="white" w="24px" h="24px" />
          <Text fontSize="14px" color="rgba(255, 255, 255, 0.50)" mt="1.5">
            Upload your image
          </Text>
        </Flex>
      </Square>
    )
  }

  return (
    <Box>
      {props?.file ? (
        <Image
          boxSize="150px"
          objectFit="cover"
          src={props?.file ? URL.createObjectURL(props?.file) : ''}
          alt={props?.file ? props?.file.name : ''}
          onClick={() => handleOpenfile()}
          style={{ cursor: 'pointer' }}
          border=" 1px solid rgba(255, 255, 255, 0.20);"
        />
      ) : (
        emptyFile()
      )}
      <input
        style={{ display: 'none' }}
        type="file"
        onChange={(e) => handleFileChange(e)}
        ref={hiddenFileInput}
      />
    </Box>
  )
}

export default Upload
