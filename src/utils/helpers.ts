import type { CloudinaryAPIAction, CloudinaryResourceType } from '../interfaces/cloudinary'

export const getDayOrNightheme = () => {
  const timeNow = new Date().getHours()
  const day = {
      hours: 7,
    },
    night = {
      hours: 18,
    }
  if (timeNow >= day.hours && timeNow < night.hours) return 'light'
  return 'dark'
}

export const fetchData = (url: string) => fetch(url).then(res => res.json())

export const sendData = (url: string, formData: FormData) =>
  fetch(url, {
    method: 'POST',
    body: formData,
  }).then(res => res.json())

export const cloudinaryAPIAction = (
  action: CloudinaryAPIAction,
  resource_type?: CloudinaryResourceType
) =>
  process.env.NEXT_PUBLIC_CLOUDINARY_API
    ? `${process.env.NEXT_PUBLIC_CLOUDINARY_API}${
        resource_type ? '/' + resource_type : ''
      }/${action}`
    : ''
