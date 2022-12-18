import { Button, Col, Loading, Row } from '@nextui-org/react'

interface ButtonProp {
  onPressHandler: () => void
  loading: boolean
}

function LoginButton({ loading, onPressHandler }: ButtonProp) {
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
              fontSize: '$lg',
              letterSpacing: '$wider',
            }}
          >
            {loading ? (
              <Loading
                type='spinner'
                color='currentColor'
                size='lg'
              />
            ) : (
              <>Submit</>
            )}
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default LoginButton
