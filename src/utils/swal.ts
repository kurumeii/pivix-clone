import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const swal = withReactContent(Swal)

export const Toast = swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  showCloseButton: true,
  timer: 5000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export const errorTitle = (text?: string) =>
  `<h4 style='color: #d63051 !important'>There has been an error: ${text}</h4>`

export const successTitle = (text?: string) =>
  `<h4 style='color: #e63946 !important'>${text || 'Successfully'}</h4>`
