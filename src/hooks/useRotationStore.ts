import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Flight } from "../types/aviationTypes"

type RotationsByDate = Record<string, Record<string, Flight[]>>

interface RotationState {
  selectedAircraftId: string | null
  rotationsByDate: RotationsByDate
  setSelectedAircraftId: (id: string | null) => void
  setRotationsByDate: (rotations: RotationsByDate) => void
  getRotation: (dateKey: string, aircraftId: string) => Flight[]
  updateRotation: (dateKey: string, aircraftId: string, rotation: Flight[]) => void
}

export const useRotationStore = create<RotationState>()(
  persist(
    (set, get) => ({
      selectedAircraftId: null,
      rotationsByDate: {},
      setSelectedAircraftId: (id) => set({ selectedAircraftId: id }),
      setRotationsByDate: (rotations) => set({ rotationsByDate: rotations }),
      getRotation: (dateKey, aircraftId) =>
        get().rotationsByDate[dateKey]?.[aircraftId] || [],
      updateRotation: (dateKey, aircraftId, rotation) => {
        set((state) => ({
          rotationsByDate: {
            ...state.rotationsByDate,
            [dateKey]: {
              ...state.rotationsByDate[dateKey],
              [aircraftId]: rotation,
            },
          },
        }))
      },
    }),
    {
      name: "rotation-storage",
    }
  )
)