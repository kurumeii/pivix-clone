export const getDayOrNightheme = (): 'dark' | 'night' => {
  const timeNow = new Date().getHours()
  const day = {
      hours: 7,
      theme: 'light',
    },
    night = {
      hours: 18,
      theme: 'dark',
    }

  return (timeNow >= day.hours) & (timeNow < night.hours) ? day.theme : night.theme
}
