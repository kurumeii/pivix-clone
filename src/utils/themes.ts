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
  height: '100%',
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

export const SlideShowContainer = styled('div', {
  w: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
})

export const SlideItem = styled('div', {
  display: 'none',
  position: 'relative',
  width: '500px',
  aspectRatio: '1',
  height: '500px',
})

export const NavigateSlide = styled('a', {
  position: 'absolute',
  top: '50%',
  width: 'auto',
  marginTop: '-22px',
  p: '16px',
  color: '$accents0',
  fontWeight: 'bold',
  fontSize: '18px',
  transition: '0.6s ease',
  br: '0 3px 3px 0',
  userSelect: 'none',
  '&:hover': {
    bgColor: 'rgba(0,0,0,0.8)',
  },
  zIndex: 3,
})

export const SlideDot = styled('span', {
  cursor: 'pointer',
  height: '15px',
  width: '15px',
  margin: '0 2px',
  backgroundColor: '#bbb',
  br: '50%',
  display: 'inline-block',
  transition: 'background-color 0.6s ease',
})
