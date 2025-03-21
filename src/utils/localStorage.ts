export const setToLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting localStorage: ${error}`)
  }
}

export const getFromLocalStorage:
  {
    (key: string, options: { skipParsing: true }): string | null
    <T>(key: string, options?: { skipParsing?: false }): T | null
  } = <T>(key: string, options: { skipParsing?: boolean } | undefined = { skipParsing: false }) => {
  try {
    const item = localStorage.getItem(key)

    if (options.skipParsing) {
      return item
    }

    return item ? ((JSON.parse(item)) as T) : null
  } catch (error) {
    console.error(`Error parsing localStorage: ${error}`)

    return null
  }
}

export const removeFromLocalStorage = (key: string) => localStorage.removeItem(key)
