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

export const DropzoneContainer = styled('div', {
  boxSizing: 'border-box',
  py: '$10',
  m: '$5',
  flex: 1,
  dflex: 'center',
  flexDirection: 'column',
  border: '2px dashed',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  borderRadius: '$lg',
  '&:focus': {
    borderColor: '$accents0',
  },
})
