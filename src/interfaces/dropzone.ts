import type { Dispatch, SetStateAction } from 'react'

export interface MyFiles extends File {
  imgSrc?: string
}

export interface MyDropzoneProps {
  onChangeEvent: Dispatch<SetStateAction<MyFiles[]>>
  files: MyFiles[]
}

export interface CloudinaryResponse {
  access_mode: 'public' | 'private'
  asset_id: string
  bytes: number
  created_at: string
  folder: string
  format: 'jpg' | 'png'
  original_filename: string
  placeholder: false
  resource_type: 'image' | 'video'
  tags: string[]
  secure_url: string
  height: number
  width: number
}
