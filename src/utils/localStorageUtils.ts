/**
 * @param key
 * @param value
 */
export const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @param key
 * @returns
 */
export const getFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key)
  try {
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.warn(`Failed to parse localStorage item for key "${key}":`, error)
    return null
  }
}

/**
 * @param key
 */
export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
}
