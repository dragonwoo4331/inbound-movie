export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },

  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch {
      // Silently fail
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Silently fail
    }
  },

  getSession: (key: string): string | null => {
    try {
      return sessionStorage.getItem(key)
    } catch {
      return null
    }
  },

  setSession: (key: string, value: string): void => {
    try {
      sessionStorage.setItem(key, value)
    } catch {
      // Silently fail
    }
  },

  removeSession: (key: string): void => {
    try {
      sessionStorage.removeItem(key)
    } catch {
      // Silently fail
    }
  }
}