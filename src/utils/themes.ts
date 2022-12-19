import type { Theme } from '@nextui-org/react'
import { styled } from '@nextui-org/react'

export const lightThemeOptions: Theme = {
  type: 'light',
}
export const darkThemeOptions: Theme = {
  type: 'dark',
}

export const Box = styled('div', {
  boxSizing: 'border-box',
})
