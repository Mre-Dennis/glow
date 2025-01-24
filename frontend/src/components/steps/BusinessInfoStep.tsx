import type React from "react"
import { TextField } from "../TextField"
import { ToggleTile } from "../ToggleTile"
import { motion } from "framer-motion"

interface BusinessInfoStepProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
}

const industries = ["Retail", "Tech", "Health", "Finance", "Education", "Other"]

export const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ data, updateData, onNext }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Business Information</h2>
      <TextField
        label="Business Name"
        value={data.businessName || ""}
        onChange={(value) => updateData({ businessName: value })}
        placeholder="Enter your business name"
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
        <div className="grid grid-cols-2 gap-4">
          {industries.map((industry) => (
            <ToggleTile
              key={industry}
              label={industry}
              selected={data.industry === industry}
              onClick={() => updateData({ industry })}
            />
          ))}
        </div>
      </div>
      <TextField
        label="Location"
        value={data.location || ""}
        onChange={(value) => updateData({ location: value })}
        placeholder="Enter your business location"
      />
      <motion.button
        className="mt-6 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next
      </motion.button>
    </div>
  )
}

