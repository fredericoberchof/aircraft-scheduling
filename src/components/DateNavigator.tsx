import { format } from "date-fns"
import { enUS } from "date-fns/locale" // locale dos EUA

interface Props {
  currentDate: Date
  onChange: (newDate: Date) => void
}

export default function DateNavigator({ currentDate, onChange }: Props) {
  const handlePrev = () => {
    const prevDay = new Date(currentDate)
    prevDay.setDate(currentDate.getDate() - 1)
    onChange(prevDay)
  }

  const handleNext = () => {
    const nextDay = new Date(currentDate)
    nextDay.setDate(currentDate.getDate() + 1)
    onChange(nextDay)
  }

  const formatted = format(currentDate, "do MMMM yyyy", { locale: enUS })

  return (
    <div className="flex justify-center items-center gap-4 mb-4">
      <button onClick={handlePrev} className="text-xl px-2">&lt;</button>
      <h2 className="text-lg font-semibold">{formatted}</h2>
      <button onClick={handleNext} className="text-xl px-2">&gt;</button>
    </div>
  )
}
