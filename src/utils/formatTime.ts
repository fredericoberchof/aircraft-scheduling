export const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0")
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0")
  return `${h}:${m}`
}
