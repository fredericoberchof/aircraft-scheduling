export interface Flight {
  ident: string
  origin: string
  destination: string
  departuretime: number
  arrivaltime: number
  readable_departure: string
  readable_arrival: string
}

export interface Aircraft {
  ident: string
  type: string
  economySeats: number
  base: string
}

export type RotationMap = Record<string, Flight[]>
export type RotationsByDate = Record<string, RotationMap>