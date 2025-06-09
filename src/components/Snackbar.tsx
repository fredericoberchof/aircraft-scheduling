import { useSnackbar } from "../hooks/useSnackbar"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

const ICONS = {
  success: <CheckCircleIcon className="h-5 w-5 mr-2 text-white" />,
  error: <ExclamationCircleIcon className="h-5 w-5 mr-2 text-white" />,
  info: <InformationCircleIcon className="h-5 w-5 mr-2 text-white" />,
  warning: <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-white" />,
}

const COLORS = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-yellow-500 text-black",
}

const Snackbar = () => {
  const { show, message, type } = useSnackbar()

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 flex items-center text-white transition-all duration-500 ease-in-out ${
        COLORS[type]
      } ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
    >
      {ICONS[type]}
      <span className="ml-2">{message}</span>
    </div>
  )
}

export default Snackbar
