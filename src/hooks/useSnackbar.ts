import { create } from "zustand"

type SnackbarType = "success" | "error" | "info" | "warning"

type SnackbarState = {
  message: string | null
  type: SnackbarType
  show: boolean
  showMessage: (msg: string, type?: SnackbarType) => void
  hideMessage: () => void
}

export const useSnackbar = create<SnackbarState>((set) => ({
  message: null,
  type: "info",
  show: false,
  showMessage: (msg, type = "info") => {
    set({ message: msg, type, show: true })

    setTimeout(() => set({ show: false }), 5000)
  },
  hideMessage: () => set({ show: false }),
}))