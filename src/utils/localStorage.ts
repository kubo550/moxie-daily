export const setToLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting localStorage: ${error}`)
  }
}

export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Error parsing localStorage: ${error}`)
    return null
  }
}

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}