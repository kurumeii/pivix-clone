import { Button, Col, Loading, Row, Text } from '@nextui-org/react'
import React, { FC } from 'react'

interface ButtonProp {
  onPressHandler: () => Promise<void>
  loading: boolean
}

function LoginButton({ loading, onPressHandler }: ButtonProp): FC {
  return (
    <>
      <Row fluid>
        <Col span={12}>
          <Button
            ghost
            color={'secondary'}
            onPress={onPressHandler}
            disabled={loading}
            css={{
              w: '100%',
            }}
          >
            {loading ? (
              <Loading
                type='spinner'
                color='currentColor'
                size='md'
              />
            ) : (
              <Text
                size={'$lg'}
                css={{ letterSpacing: '$wider' }}
              >
                Submit
              </Text>
            )}
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default LoginButton
