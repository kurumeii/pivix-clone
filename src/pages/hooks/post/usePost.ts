import { useTheme } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import type { CloudinaryResponse } from '../../../interfaces/cloudinary'
import type { MyFiles } from '../../../interfaces/dropzone'
import { cloudinaryAPIAction } from '../../../utils/helpers'
import { errorTitle, successTitle, Toast } from '../../../utils/swal'
import { trpc } from '../../../utils/trpc'

export default function usePost() {
  const { isDark } = useTheme()
  const [isLoading, setLoading] = useState(false)
  const { data: sessionData, status: sessionStatus } = useSession()
  const [field, setField] = useState({
    title: '',
    description: '',
  })
  const [files, setFiles] = useState<MyFiles[]>([])
  const createMutation = trpc.post.create.useMutation()

  const handleCreatNew = async () => {
    const form = new FormData()
    setLoading(true)
    if (!sessionData) return false
    const results = await Promise.all(
      files.map(async file => {
        form.append('file', file)
        form.append('upload_preset', 'myclouduploads')
        form.append('folder', sessionData.user.id)
        const fetching = await fetch(cloudinaryAPIAction('upload', 'image'), {
          method: 'POST',
          body: form,
        })
        const {
          public_id,
          delete_token,
          url,
          secure_url,
          folder,
          original_filename,
        }: CloudinaryResponse = await fetching.json()
        return {
          public_id,
          delete_token,
          url,
          secure_url,
          folder,
          original_filename: original_filename || public_id,
        }
      })
    )

    if (!sessionData)
      return Toast.fire({
        icon: 'error',
        title: errorTitle('Session timed out'),
      })
    await createMutation.mutate(
      {
        title: field.title,
        description: field.description,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        email: sessionData.user.email!,
        secure_imgs: results,
      },
      {
        onError: async ({ message }) => {
          //Fallback when there is an error on server side
          form.delete('file')
          results.forEach(async ({ delete_token }) => {
            form.append('token', delete_token)
            await fetch(cloudinaryAPIAction('delete_by_token'), {
              method: 'POST',
              body: form,
            })
          })

          Toast.fire({
            icon: 'error',
            title: errorTitle(message),
          })
        },
        onSuccess: async ({ createdPost }) => {
          const { isDismissed } = await Toast.fire({
            icon: 'success',
            title: successTitle('Success'),
            text: 'post ' + createdPost.id + ' created',
          })
          if (isDismissed) {
            setField({
              description: '',
              title: '',
            })
            setFiles([])
          }
        },
        onSettled: () => setLoading(false),
      }
    )
  }

  return {
    field,
    setField,
    isDark,
    isLoading,
    sessionStatus,
    handleCreatNew,
    sessionData,
    setFiles,
    files,
  }
}
