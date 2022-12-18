import type { FormElement } from '@nextui-org/react'
import type { ChangeEvent, FocusEventHandler } from 'react'

export interface IFieldOpt {
  label: string
  value: string
  name: string
}
export interface CustomErrorMessage {
  Signin: string
  OAuthSignin: string
  OAuthCallback: string
  OAuthCreateAccount: string
  EmailCreateAccount: string
  Callback: string
  OAuthAccountNotLinked: string
  EmailSignin: string
  CredentialsSignin: string
  default: string
}

export interface FieldProps {
  name: string
  hasError?: boolean
  helperText?: string
  labelPlaceholder?: string
  initialValue: string
  onChange?: ((e: ChangeEvent<FormElement>) => void) | undefined
  clearValue?: () => void
  onFocus?: FocusEventHandler<FormElement>
}
