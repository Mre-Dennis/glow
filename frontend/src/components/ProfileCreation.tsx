import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProgressBar } from "./ProgressBar"
import { BusinessInfoStep } from "./steps/BusinessInfoStep"
import { ProductInsightsStep } from "./steps/ProductInsightsStep"
import { FeedbackDataStep } from "./steps/FeedbackDataStep"
import { VisualizationPreferencesStep } from "./steps/VisualizationPreferencesStep"

const steps = [
  "Business Information",
  "Product Insights",
  "Feedback Data Preferences",
  "Data Visualization Preferences",
]

export const ProfileCreation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [profileData, setProfileData] = useState({
    businessInfo: {},
    productInsights: {},
    feedbackData: {},
    visualizationPreferences: {},
  })

  const updateProfileData = (step: string, data: any) => {
    setProfileData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...data },
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessInfoStep
            data={profileData.businessInfo}
            updateData={(data) => updateProfileData("businessInfo", data)}
            onNext={nextStep}
          />
        )
      case 1:
        return (
          <ProductInsightsStep
            data={profileData.productInsights}
            updateData={(data) => updateProfileData("productInsights", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 2:
        return (
          <FeedbackDataStep
            data={profileData.feedbackData}
            updateData={(data) => updateProfileData("feedbackData", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <VisualizationPreferencesStep
            data={profileData.visualizationPreferences}
            updateData={(data) => updateProfileData("visualizationPreferences", data)}
            onPrev={prevStep}
            onSubmit={() => console.log("Profile submitted:", profileData)}
          />
        )
      default:
        return null
    }
  }
  
  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Profile Creation Complete!</h1>
        <p className="mb-6">
          Thank you for setting up your Glowlytics profile. You're all set to start using our analytics tools.
        </p>
        <Link href="/dashboard" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
          Go to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Create Your Glowlytics Profile</h1>
      <ProgressBar progress={(currentStep / (steps.length - 1)) * 100} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

