const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'

export async function geocodeCityState(
  city: string,
  state: string
): Promise<{ latitude: number; longitude: number } | null> {
  const query = encodeURIComponent(`${city}, ${state}, United States`)
  const url = `${NOMINATIM_URL}?q=${query}&format=json&limit=1&countrycodes=us`

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'AASS-IncidentMap/1.0 (https://aass-five.vercel.app)',
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) return null

    const results = (await response.json()) as Array<{ lat: string; lon: string }>
    if (!results.length) return null

    return {
      latitude: parseFloat(results[0].lat),
      longitude: parseFloat(results[0].lon),
    }
  } catch {
    return null
  }
}
