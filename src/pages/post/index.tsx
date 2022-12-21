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
} from '@nextui-org/react'
import Head from 'next/head'
import type { ReactElement } from 'react'
import MyDropzone from '../../components/Dropzone'
import Layout from '../../components/Layout/Layout'
import type { NextPageWithLayout } from '../../types/page'
import { Box } from '../../utils/themes'
import usePost from '../hooks/post/usePost'
import { Delete } from 'react-iconly'

const Post: NextPageWithLayout = () => {
  const {
    setField,
    handleCreatNew,
    isDark,
    isLoading,
    sessionStatus,
    sessionData,
    field,
    setFiles,
    files,
  } = usePost()

  return (
    <>
      <Head>
        <title>Post new image</title>
      </Head>
      <Box>
        {!sessionData && (
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
        {sessionStatus === 'authenticated' && (
          <Grid.Container
            gap={2}
            justify='center'
          >
            <Grid
              xs={12}
              md={10}
              justify='center'
            >
              <Card
                variant={isDark ? 'bordered' : 'shadow'}
                css={{
                  p: '$10',
                  '@xs': {
                    flexDirection: 'column',
                    ai: 'center',
                    jc: 'center',
                  },
                  '@sm': {
                    flexDirection: 'row',
                    ai: 'flex-start',
                    jc: 'center',
                  },
                }}
              >
                <Card.Body css={{ p: '$12' }}>
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
                        minRows={4}
                        labelPlaceholder='Description'
                        color='error'
                        autoComplete='off'
                        value={field.description}
                        onChange={e => setField({ ...field, [e.target.name]: e.target.value })}
                      />
                      {/*TODO: Drop image or upload area */}
                    </Grid>
                    <Grid
                      xs={12}
                      alignItems='center'
                      justify='center'
                      css={{ flexDirection: 'row' }}
                    >
                      <Button
                        color={isDark ? 'error' : 'secondary'}
                        onClick={() => handleCreatNew()}
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
                      <Button
                        auto
                        flat={!isDark}
                        ghost={isDark}
                        color={'error'}
                        onClick={() => setFiles([])}
                        icon={
                          <Delete
                            size={'medium'}
                            set='curved'
                            filled
                          />
                        }
                      />
                    </Grid>
                  </Grid.Container>
                </Card.Body>
                <Card.Footer
                  css={{
                    h: '100%',
                  }}
                >
                  <MyDropzone
                    onChangeEvent={setFiles}
                    files={files}
                  />
                </Card.Footer>
              </Card>
            </Grid>
          </Grid.Container>
        )}
      </Box>
      {isLoading && (
        <Progress
          indeterminated
          size={'sm'}
          value={50}
          shadow={isDark}
          color={isDark ? 'error' : 'secondary'}
          status={isDark ? 'default' : 'secondary'}
          css={{
            position: 'fixed',
            bottom: 0,
          }}
        />
      )}
    </>
  )
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Post
