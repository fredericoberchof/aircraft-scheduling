import { useState } from 'react'
import { Flight } from '../types/aviationTypes'

type RotationMap = {
  [aircraftId: string]: Flight[]
}

export function useRotationStore() {
  const [rotations, setRotations] = useState<RotationMap>({})

  const getRotation = (aircraftId: string) => rotations[aircraftId] || []

  const updateRotation = (aircraftId: string, newRotation: Flight[]) => {
    setRotations((prev) => ({ ...prev, [aircraftId]: newRotation }))
  }

  return { getRotation, updateRotation }
}
