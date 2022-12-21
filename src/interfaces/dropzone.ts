import type { Dispatch, SetStateAction } from 'react'

export interface MyFiles extends File {
  imgSrc?: string
}

export interface MyDropzoneProps {
  onChangeEvent: Dispatch<SetStateAction<MyFiles[]>>
  files: MyFiles[]
}
