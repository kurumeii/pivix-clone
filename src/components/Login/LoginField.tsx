import { Col, Input, Row, useTheme } from '@nextui-org/react'
import type { FieldProps } from '../../interfaces/constants'

function LoginField(props: FieldProps) {
  const { isDark } = useTheme()
  return (
    <>
      <Row fluid>
        <Col
          css={{
            py: '$12',
          }}
          span={12}
        >
          {props.name === 'password' || props.name === 'retypepw' ? (
            <Input.Password
              name={props.name}
              status={props.hasError ? 'error' : 'default'}
              helperText={props.helperText}
              helperColor={props.hasError ? 'error' : 'default'}
              labelPlaceholder={props.labelPlaceholder}
              initialValue={props.initialValue}
              onChange={props.onChange}
              onClearClick={props.clearValue}
              autoComplete='off'
              clearable
              bordered={isDark}
              size='lg'
              css={{
                width: '100%',
              }}
            />
          ) : (
            <Input
              name={props.name}
              status={props.hasError ? 'error' : 'default'}
              helperText={props.helperText}
              helperColor={props.hasError ? 'error' : 'default'}
              labelPlaceholder={props.labelPlaceholder}
              initialValue={props.initialValue}
              onChange={props.onChange}
              onClearClick={props.clearValue}
              autoComplete='off'
              clearable
              bordered={isDark}
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
