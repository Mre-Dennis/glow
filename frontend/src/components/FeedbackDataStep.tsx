import type React from "react"
import { ToggleTile } from "./ToggleTile"
import { Checkbox } from "./Checkbox"
import { motion } from "framer-motion"

interface FeedbackDataStepProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

const feedbackTypes = ["Customer Satisfaction", "Product Reviews", "Usage Statistics", "Support Tickets"]
const feedbackSources = ["Surveys", "E-commerce Platforms", "Social Media", "Customer Support"]
const collectionFrequencies = ["Daily", "Weekly", "Monthly", "Quarterly"]

export const FeedbackDataStep: React.FC<FeedbackDataStepProps> = ({ data, updateData, onNext, onPrev }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Feedback Data Preferences</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Types of Feedback</label>
        <div className="grid grid-cols-2 gap-4">
          {feedbackTypes.map((type) => (
            <ToggleTile
              key={type}
              label={type}
              selected={(data.feedbackTypes || []).includes(type)}
              onClick={() => {
                const updatedTypes = data.feedbackTypes || []
                const index = updatedTypes.indexOf(type)
                if (index > -1) {
                  updatedTypes.splice(index, 1)
                } else {
                  updatedTypes.push(type)
                }
                updateData({ feedbackTypes: updatedTypes })
              }}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Sources</label>
        {feedbackSources.map((source) => (
          <Checkbox
            key={source}
            label={source}
            checked={(data.feedbackSources || []).includes(source)}
            onChange={(checked) => {
              const updatedSources = data.feedbackSources || []
              if (checked) {
                updatedSources.push(source)
              } else {
                const index = updatedSources.indexOf(source)
                if (index > -1) {
                  updatedSources.splice(index, 1)
                }
              }
              updateData({ feedbackSources: updatedSources })
            }}
          />
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Data Collection Frequency</label>
        <div className="grid grid-cols-2 gap-4">
          {collectionFrequencies.map((frequency) => (
            <ToggleTile
              key={frequency}
              label={frequency}
              selected={data.collectionFrequency === frequency}
              onClick={() => updateData({ collectionFrequency: frequency })}
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

