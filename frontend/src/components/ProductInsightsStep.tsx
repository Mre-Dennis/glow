import type React from "react"
import { TextField } from "./TextField"
import { ToggleTile } from "./ToggleTile"
import { motion } from "framer-motion"

interface ProductInsightsStepProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

const customerSegments = ["Youth", "Adults", "Seniors", "Families", "Professionals", "Students"]

export const ProductInsightsStep: React.FC<ProductInsightsStepProps> = ({ data, updateData, onNext, onPrev }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Insights</h2>
      <TextField
        label="Products/Services"
        value={data.products || ""}
        onChange={(value) => updateData({ products: value })}
        placeholder="List your main products or services"
      />
      <TextField
        label="Key Features"
        value={data.features || ""}
        onChange={(value) => updateData({ features: value })}
        placeholder="Describe key features or attributes"
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Customer Segments</label>
        <div className="grid grid-cols-2 gap-4">
          {customerSegments.map((segment) => (
            <ToggleTile
              key={segment}
              label={segment}
              selected={(data.targetSegments || []).includes(segment)}
              onClick={() => {
                const updatedSegments = data.targetSegments || []
                const index = updatedSegments.indexOf(segment)
                if (index > -1) {
                  updatedSegments.splice(index, 1)
                } else {
                  updatedSegments.push(segment)
                }
                updateData({ targetSegments: updatedSegments })
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <motion.button
          className="bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 transition-colors"
          onClick={onPrev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Previous
        </motion.button>
        <motion.button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next
        </motion.button>
      </div>
    </div>
  )
}

