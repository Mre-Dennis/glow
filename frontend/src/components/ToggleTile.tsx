import { motion } from "framer-motion"

interface ToggleTileProps {
  label: string
  selected: boolean
  onClick: () => void
}

export const ToggleTile: React.FC<ToggleTileProps> = ({ label, selected, onClick }) => {
  return (
    <motion.div
      className={`p-4 rounded-lg cursor-pointer transition-colors ${
        selected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
      {selected && (
        <motion.svg
          className="w-6 h-6 ml-2 inline-block"
          viewBox="0 0 24 24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </motion.svg>
      )}
    </motion.div>
  )
}

