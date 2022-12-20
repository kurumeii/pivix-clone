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
