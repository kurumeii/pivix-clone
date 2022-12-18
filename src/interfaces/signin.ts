import type { ChangeEvent, FormEvent } from 'react'
import type { IFieldOpt } from './constants'

export interface ISignInField {
  email: IFieldOpt
  password: IFieldOpt
}

export interface ISignInErrorField {
  email: string[]
  password: string[]
}

export interface ISignInState {
  email: IFieldOpt
  password: IFieldOpt
  onChange: (event: ChangeEvent<FormEvent>) => void
}
