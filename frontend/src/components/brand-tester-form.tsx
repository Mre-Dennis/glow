"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export function BrandTesterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    // For this example, we'll just set the submitted state to true
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto border-2 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
            <p className="text-gray-600">Thank you for your interest in becoming a brand tester. We'll review your application and get back to you soon.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-green-200">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-800">Full Name</Label>
            <Input id="name" name="name" required className="border-gray-200 focus:border-green-400 focus:ring-green-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-800">Email</Label>
            <Input id="email" name="email" type="email" required className="border-gray-200 focus:border-green-400 focus:ring-green-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className="text-gray-800">Age</Label>
            <Input id="age" name="age" type="number" required className="border-gray-200 focus:border-green-400 focus:ring-green-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-gray-800">Location</Label>
            <Input id="location" name="location" required className="border-gray-200 focus:border-green-400 focus:ring-green-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-gray-800">Previous Brand Testing Experience</Label>
            <Textarea id="experience" name="experience" className="border-gray-200 focus:border-green-400 focus:ring-green-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interests" className="text-gray-800">Product Categories of Interest</Label>
            <Textarea id="interests" name="interests" required className="border-gray-200 focus:border-green-400 focus:ring-green-400" />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

