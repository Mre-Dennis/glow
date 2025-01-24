import { motion } from "framer-motion"

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <motion.div
      className="flex items-center mb-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="ml-2 block text-sm text-gray-900">{label}</label>
    </motion.div>
  )
}

