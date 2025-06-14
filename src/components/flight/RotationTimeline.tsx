import { colors } from "../../styles/colors"
import { Flight } from "../../types/aviationTypes"
import { formatTime } from "../../utils/formatTime"

type Props = {
  rotation: Flight[]
}

const SECONDS_IN_DAY = 86400
const TURNAROUND_TIME = 20 * 60

export default function RotationTimeline({ rotation }: Props) {
  const sortedFlights = [...rotation].sort(
    (a, b) => a.departuretime - b.departuretime
  )

  const timelineBlocks = []
  let currentTime = 0

  for (let i = 0; i < sortedFlights.length; i++) {
    const flight = sortedFlights[i]

    if (flight.departuretime > currentTime) {
      timelineBlocks.push({
        type: "idle",
        start: currentTime,
        end: flight.departuretime,
      })
    }

    timelineBlocks.push({
      type: "flight",
      start: flight.departuretime,
      end: flight.arrivaltime,
    })

    timelineBlocks.push({
      type: "turnaround",
      start: flight.arrivaltime,
      end: flight.arrivaltime + TURNAROUND_TIME,
    })

    currentTime = flight.arrivaltime + TURNAROUND_TIME
  }

  if (currentTime < SECONDS_IN_DAY) {
    timelineBlocks.push({
      type: "idle",
      start: currentTime,
      end: SECONDS_IN_DAY,
    })
  }

  const hourMarkers = []
  for (let h = 0; h <= 24; h += 4) {
    hourMarkers.push({
      label: `${String(h).padStart(2, "0")}:00`,
      positionPercent: (h / 24) * 100,
    })
  }

  return (
    <div className="border mt-4 p-2 rounded bg-gray-100">
      <div className="flex items-center mb-2">
        <h3 className="text-sm font-medium">Rotation Timeline</h3>
        <span
          className="ml-1 flex items-center justify-center w-3 h-3 rounded-full bg-blue-500 text-white text-xs font-bold cursor-default"
          title="Hover over the colored blocks to see detailed information about the rotations."
        >
          i
        </span>
      </div>

      <div className="flex justify-center items-center mb-4 gap-6">
      <div className="flex items-center">
          <div
            className="w-4 h-4 rounded mr-2"
            style={{ backgroundColor: colors.idle }}
          ></div>
          <span className="text-xs text-gray-600">Idle</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded mr-2"
            style={{ backgroundColor: colors.scheduled }}
          ></div>
          <span className="text-xs text-gray-600">Scheduled</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded mr-2"
            style={{ backgroundColor: colors.turnaround }}
          ></div>
          <span className="text-xs text-gray-600">Turnaround</span>
        </div>
      </div>

      <div
        className="relative w-full mb-1 text-xs text-gray-600 px-4 select-none"
        style={{ height: "20px" }}
      >
        {hourMarkers.map((marker, idx) => {
          let transformStyle = "-translate-x-1/2"
          if (idx === 0) transformStyle = "translate-x-0"
          else if (idx === hourMarkers.length - 1) transformStyle = "-translate-x-full"

          return (
            <div
              key={idx}
              className={`absolute top-0 ${transformStyle} flex flex-col items-center`}
              style={{ left: `${marker.positionPercent}%` }}
            >
              <span>{marker.label}</span>
              <div
                className="block mt-1"
                style={{
                  width: "1px",
                  height: "10px",
                  backgroundColor: "#000",
                }}
              />
            </div>
          )
        })}
      </div>

      <div className="relative h-6 w-full bg-gray-300 rounded overflow-hidden">
        {timelineBlocks.map((block, idx) => {
          const widthPercent =
            ((block.end - block.start) / SECONDS_IN_DAY) * 100

          let backgroundColor = colors.idle
          if (block.type === "flight") backgroundColor = colors.scheduled
          if (block.type === "turnaround") backgroundColor = colors.turnaround

          return (
            <div
              key={idx}
              className="h-full absolute top-0 transition-all duration-300"
              style={{
                left: `${(block.start / SECONDS_IN_DAY) * 100}%`,
                width: `${widthPercent}%`,
                backgroundColor,
              }}
              title={`${block.type.toUpperCase()} - ${formatTime(
                block.start
              )} → ${formatTime(block.end)}`}
            />
          )
        })}
      </div>
    </div>
  )
}