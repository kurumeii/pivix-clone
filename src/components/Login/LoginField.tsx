import type { FormElement } from '@nextui-org/react'
import { Col, Input, Row } from '@nextui-org/react'
import type { ChangeEvent } from 'react'

export type FieldProps = {
  name: string
  status?: boolean
  helperText?: string
  labelPlaceholder?: string
  initialValue: string
  onChange?: ((e: ChangeEvent<FormElement>) => void) | undefined
}

function LoginField(props: FieldProps) {
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
              name={props.name}
              status={props.status ? 'default' : 'error'}
              helperText={props.helperText}
              labelPlaceholder={props.labelPlaceholder}
              initialValue={props.initialValue}
              onChange={props.onChange}
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
              name={props.name}
              status={props.status ? 'default' : 'error'}
              helperText={props.helperText}
              labelPlaceholder={props.labelPlaceholder}
              initialValue={props.initialValue}
              onChange={props.onChange}
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
