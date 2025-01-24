import type React from "react"
import { ToggleTile } from "../ToggleTile"
import { TextField } from "../TextField"
import { motion } from "framer-motion"

interface VisualizationPreferencesStepProps {
  data: any
  updateData: (data: any) => void
  onPrev: () => void
  onSubmit: () => void
}

const chartTypes = ["Bar Charts", "Line Graphs", "Pie Charts", "Heatmaps", "Scatter Plots"]
const layoutPreferences = ["Minimalist", "Detailed", "Goal-oriented"]

export const VisualizationPreferencesStep: React.FC<VisualizationPreferencesStepProps> = ({
  data,
  updateData,
  onPrev,
  onSubmit,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Data Visualization Preferences</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Chart Types</label>
        <div className="grid grid-cols-2 gap-4">
          {chartTypes.map((type) => (
            <ToggleTile
              key={type}
              label={type}
              selected={(data.chartTypes || []).includes(type)}
              onClick={() => {
                const updatedTypes = data.chartTypes || []
                const index = updatedTypes.indexOf(type)
                if (index > -1) {
                  updatedTypes.splice(index, 1)
                } else {
                  updatedTypes.push(type)
                }
                updateData({ chartTypes: updatedTypes })
              }}
            />
          ))}
        </div>
      </div>
      <TextField
        label="Key Metrics/KPIs"
        value={data.keyMetrics || ""}
        onChange={(value) => updateData({ keyMetrics: value })}
        placeholder="e.g., Sales growth, Customer retention"
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Layout Preference</label>
        <div className="grid grid-cols-2 gap-4">
          {layoutPreferences.map((layout) => (
            <ToggleTile
              key={layout}
              label={layout}
              selected={data.layoutPreference === layout}
              onClick={() => updateData({ layoutPreference: layout })}
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
          onClick={onSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </div>
    </div>
  )
}

