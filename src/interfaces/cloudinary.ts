export interface CloudinaryResponse {
  access_mode: 'public' | 'private'
  asset_id: string
  bytes: number
  created_at: string
  folder: string
  format: 'jpg' | 'png'
  original_filename?: string
  public_id: string
  placeholder: boolean
  resource_type: 'image' | 'video'
  tags: string[]
  url: string
  secure_url: string
  height: number
  width: number
  delete_token: string
  signature: string
}

export interface CloudinaryResult {
  result: string
}

export interface CloudinaryAdminResult {
  folders: {
    name: string
    path: string
  }[]
  total_count: number
}

export type CloudinaryAPIAction =
  | 'upload'
  | 'delete_by_token'
  | 'upload_presets'
  | 'rename'
  | 'destroy'
export type CloudinaryResourceType = 'image' | 'raw' | 'video'
