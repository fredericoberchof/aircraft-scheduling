export async function getFlights() {
    const res = await fetch("https://recruiting-assessment.alphasights.com/api/flights")
    return res.json()
  }
  
  export async function getAircrafts() {
    const res = await fetch("https://recruiting-assessment.alphasights.com/api/aircrafts")
    return res.json()
  }
  