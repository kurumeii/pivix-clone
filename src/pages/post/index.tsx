import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Loading,
  Progress,
  Text,
  Textarea,
  useTheme,
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import type { ReactElement } from 'react'
import { useState } from 'react'
import MyDropzone from '../../components/Dropzone'
import Layout from '../../components/Layout/Layout'
import type { CloudinaryResponse, MyFiles } from '../../interfaces/dropzone'
import type { NextPageWithLayout } from '../../types/page'
import { errorTitle, successTitle, Toast } from '../../utils/swal'
import { Box } from '../../utils/themes'
import { trpc } from '../../utils/trpc'

const Post: NextPageWithLayout = () => {
  const { isDark } = useTheme()
  const { data: session, status } = useSession()
  const [field, setField] = useState({
    title: '',
    description: '',
  })
  const [files, setFiles] = useState<MyFiles[]>([])
  const { isLoading, mutate } = trpc.post.create.useMutation({
    onError(error) {
      Toast.fire({
        icon: 'error',
        title: errorTitle(error.data?.code),
        text: error.message,
      })
    },
    onSuccess({ createdPost }) {
      Toast.fire({
        timer: 2000,
        icon: 'success',
        title: successTitle('Success'),
        text: 'post ' + createdPost.id + ' created',
      })
    },
  })

  // const isLoading = false
  const handleCreatNew = async () => {
    const form = new FormData()
    const url = process.env.NEXT_PUBLIC_CLOUDINARY_API || ''
    const results = await Promise.all(
      files.map(async file => {
        form.append('file', file)
        form.append('upload_preset', 'myclouduploads')
        const fetching = await fetch(url, {
          method: 'POST',
          body: form,
        })
        const { secure_url, original_filename }: CloudinaryResponse = await fetching.json()
        return {
          secure_url,
          original_filename,
        }
      })
    )
    if (!session)
      return Toast.fire({
        icon: 'error',
        title: errorTitle('Session timed out'),
      })
    await mutate({
      title: field.title,
      description: field.description,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      email: session.user.email!,
      secure_imgs: results,
    })
  }

  return (
    <>
      <Head>
        <title>Post new image</title>
      </Head>
      <Box>
        {!session && (
          <Container>
            <Text
              b
              h3
              css={{
                textAlign: 'center',
                mt: '$18',
              }}
            >
              You&apos;re not signed in
            </Text>
          </Container>
        )}
        {status === 'authenticated' && (
          <Grid.Container
            gap={2}
            justify='center'
          >
            <Grid
              xs={8}
              justify='center'
            >
              <Card
                variant={isDark ? 'bordered' : 'shadow'}
                css={{ p: '$10', minWidth: 'fit-content' }}
              >
                <Card.Header
                  css={{
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    h2
                    css={{
                      textGradient: `${
                        isDark ? 'to right, #ff416c , #ff4b2b' : 'to left, #ad5389, #3c1053'
                      }`,
                    }}
                  >
                    Upload new image{' '}
                  </Text>
                </Card.Header>
                <Card.Body css={{ p: '$12' }}>
                  <Grid.Container
                    justify='center'
                    gap={4}
                  >
                    <Grid
                      xs={12}
                      justify='center'
                    >
                      {/*TODO:Title */}
                      <Input
                        bordered={isDark}
                        name='title'
                        fullWidth
                        labelPlaceholder='Title'
                        color='error'
                        clearable
                        autoComplete='off'
                        value={field.title}
                        onChange={e => setField({ ...field, [e.target.name]: e.target.value })}
                      />
                    </Grid>
                    <Grid xs={12}>
                      {/*TODO: Descriptiom */}
                      <Textarea
                        bordered={isDark}
                        name='description'
                        fullWidth
                        labelPlaceholder='Description'
                        color='error'
                        autoComplete='off'
                        value={field.description}
                        onChange={e => setField({ ...field, [e.target.name]: e.target.value })}
                      />
                      {/*TODO: Drop image or upload area */}
                    </Grid>
                    <Grid xs={12}>
                      <MyDropzone
                        onChangeEvent={setFiles}
                        files={files}
                      />
                    </Grid>
                  </Grid.Container>
                </Card.Body>
                <Card.Footer>
                  <Grid.Container
                    justify='center'
                    gap={4}
                  >
                    <Grid
                      xs={12}
                      justify='center'
                    >
                      {isLoading && (
                        <Progress
                          indeterminated
                          value={50}
                          color={isDark ? 'error' : 'secondary'}
                          status={isDark ? 'default' : 'secondary'}
                        />
                      )}
                    </Grid>
                    <Grid>
                      <Button
                        size='lg'
                        color={isDark ? 'error' : 'secondary'}
                        onPress={() => handleCreatNew()}
                        isDisabled={isLoading}
                      >
                        {isLoading ? (
                          <Loading
                            color='currentColor'
                            size='sm'
                          />
                        ) : (
                          'Create'
                        )}
                      </Button>
                    </Grid>
                  </Grid.Container>
                </Card.Footer>
              </Card>
            </Grid>
          </Grid.Container>
        )}
      </Box>
    </>
  )
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Post
