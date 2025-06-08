import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "./localStorageUtils"

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(global, "localStorage", { value: localStorageMock })

describe("localStorageUtils", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("saveToLocalStorage", () => {
    it("should save a string value to localStorage", () => {
      saveToLocalStorage("testKey", "testValue")
      expect(localStorage.getItem("testKey")).toBe(JSON.stringify("testValue"))
    })

    it("should save an object to localStorage", () => {
      const testObject = { key: "value" }
      saveToLocalStorage("testObjectKey", testObject)
      expect(localStorage.getItem("testObjectKey")).toBe(JSON.stringify(testObject))
    })
  })

  describe("getFromLocalStorage", () => {
    it("should retrieve a string value from localStorage", () => {
      localStorage.setItem("testKey", JSON.stringify("testValue"))
      const result = getFromLocalStorage<string>("testKey")
      expect(result).toBe("testValue")
    })

    it("should retrieve an object from localStorage", () => {
      const testObject = { key: "value" }
      localStorage.setItem("testObjectKey", JSON.stringify(testObject))
      const result = getFromLocalStorage<{ key: string }>("testObjectKey")
      expect(result).toEqual(testObject)
    })

    it("should return null if the key does not exist", () => {
      const result = getFromLocalStorage<string>("nonExistentKey")
      expect(result).toBeNull()
    })

    it("should return null and log a warning if the value is invalid JSON", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation()
      localStorage.setItem("invalidKey", "invalidJSON")
      const result = getFromLocalStorage<string>("invalidKey")
      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to parse localStorage item for key "invalidKey":',
        expect.any(Error)
      )
      consoleSpy.mockRestore()
    })
  })

  describe("removeFromLocalStorage", () => {
    it("should remove a key from localStorage", () => {
      localStorage.setItem("testKey", JSON.stringify("testValue"))
      removeFromLocalStorage("testKey")
      expect(localStorage.getItem("testKey")).toBeNull()
    })

    it("should not throw an error if the key does not exist", () => {
      expect(() => removeFromLocalStorage("nonExistentKey")).not.toThrow()
    })
  })
})