export async function fetchData(url: string) {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}: ${res.statusText}`)
    }
    return res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getFlights() {
  return fetchData("https://recruiting-assessment.alphasights.com/api/flights")
}

export async function getAircrafts() {
  return fetchData("https://recruiting-assessment.alphasights.com/api/aircrafts")
}