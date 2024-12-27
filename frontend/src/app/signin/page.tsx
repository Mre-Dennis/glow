'use client'

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign-in logic here
    console.log("Sign in attempted with:", email, password)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-gray-200 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg fixed w-full z-50 left-0 right-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center bg-transparent">
          <Link className="flex items-center justify-center" href="/">
            <BarChart className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-blue-600">BrandInsight</span>
          </Link>
        </div>
      </motion.header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Sign In to BrandInsight</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/get-started" className="text-blue-600 hover:underline">
                Get Started
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>&copy; 2023 BrandInsight. All rights reserved.</p>
      </footer>
    </div>
  )
}

