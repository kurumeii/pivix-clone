import { Col, FormElement, Input, Row } from '@nextui-org/react'
import { ChangeEvent, FC } from 'react'

export type FieldProps = {
  name: 'email' | 'password'
  status?: boolean
  helperText?: string
  labelPlaceholder?: 'email' | 'password'
  initialValue: string
  onChange?: ChangeEvent<FormElement>
}

function LoginField(props: FieldProps): FC {
  return (
    <>
      <Row fluid>
        <Col
          css={{
            pb: '$20',
          }}
          span={12}
        >
          {props.name === 'password' ? (
            <Input.Password
              {...props}
              autoComplete='off'
              clearable
              bordered
              color='primary'
              size='lg'
              css={{
                width: '100%',
              }}
            />
          ) : (
            <Input
              {...props}
              autoComplete='off'
              clearable
              bordered
              color='primary'
              size='lg'
              css={{
                width: '100%',
              }}
            />
          )}
        </Col>
      </Row>
    </>
  )
}

export default LoginField
