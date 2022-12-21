import { Card, Grid, Text, useTheme } from '@nextui-org/react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import type { MyDropzoneProps, MyFiles } from '../interfaces/dropzone'
import { errorTitle, Toast } from '../utils/swal'
import { DropzoneContainer } from '../utils/themes'

function MyDropzone({ files, onChangeEvent }: MyDropzoneProps) {
  const { isDark } = useTheme()

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: acceptedFiles => {
      onChangeEvent((prev: MyFiles[]) => {
        const newArr = [
          ...acceptedFiles.map(file =>
            Object.assign(file, {
              imgSrc: URL.createObjectURL(file),
            })
          ),
          ...prev,
        ]
        const filterDub = newArr.filter(
          (value, index, self) => index === self.findIndex(t => t.name === value.name)
        )
        return filterDub
      })
    },
    maxSize: 10485760,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDropRejected: async (fileRejections, event) => {
      const text = fileRejections
        .map(({ errors, file }) => {
          return file.name + ': ' + errors.map(err => err.message)
        })
        .join(', ')
      await Toast.fire({
        icon: 'error',
        title: errorTitle(),
        text,
      })
    },
  })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => file.imgSrc && URL.revokeObjectURL(file.imgSrc))
  }, [files])

  return (
    <DropzoneContainer
      {...getRootProps({ className: 'dropzone' })}
      css={{
        bgColor: isDark ? '$accents1' : '#fafafa',
        borderColor: isDark ? '$accents1' : '$accents4',
      }}
    >
      <Text css={{ ai: 'center', my: '$5', color: !isDark ? '$accents5' : '' }}>
        Drag &apos;n&apos; drop some files here, or click to select files
        <br />
      </Text>
      <aside>
        <input {...getInputProps()} />
        <Grid.Container
          gap={2}
          justify='center'
          alignItems={'stretch'}
          css={{
            flexWrap: 'wrap',
          }}
        >
          {files.map(file => (
            <Grid
              key={file.name}
              xs={12}
              sm={6}
              lg={4}
            >
              <Card isHoverable>
                <Card.Image
                  src={file.imgSrc || '/public/broken-image.jpg'}
                  alt={file.name}
                  css={{
                    aspectRatio: '1',
                    objectPosition: 'top',
                  }}
                  objectFit={'cover'}
                />
                <Card.Footer
                  css={{
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                  }}
                >
                  <Text
                    b
                    css={{
                      ov: 'clip',
                      textOverflow: 'ellipsis',
                      w: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {file.name}
                  </Text>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </aside>
    </DropzoneContainer>
  )
}
export default MyDropzone
