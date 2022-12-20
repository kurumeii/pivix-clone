import { Card, Grid, Text, useTheme } from '@nextui-org/react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import type { MyDropzoneProps, MyFiles } from '../interfaces/dropzone'
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
      <input {...getInputProps()} />
      <Text
        b
        css={{ ai: 'center', my: '$5' }}
      >
        Drag &apos;n&apos; drop some files here, or click to select files
      </Text>

      <aside>
        <Grid.Container
          gap={2}
          justify='center'
        >
          {files.map(file => (
            <Grid
              key={file.name}
              xs={12}
              md={6}
              lg={4}
            >
              <Card isHoverable>
                <Card.Image
                  src={file.imgSrc || '/public/broken-image.jpg'}
                  alt={file.name}
                  css={{
                    aspectRatio: '1',
                  }}
                  objectFit={'cover'}
                />
                <Card.Footer
                  css={{
                    justifyItems: 'center',
                    flexDirection: 'column',
                    textOverflow: 'clip',
                    overflow: 'hidden',
                  }}
                >
                  <Text b>{file.name}</Text>
                  <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm' }}>
                    {file.size}
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
