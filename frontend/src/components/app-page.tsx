'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Beaker, BarChart, Users, Home } from "lucide-react"

export function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-pink-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link className="flex items-center gap-2 text-xl font-bold text-purple-700 ml-[100px]" href="#">
            <span>Glow</span>
          </Link>
          <nav className="flex-1 flex justify-center gap-6 md:flex">
            <Link className="text-sm font-medium hover:text-purple-600" href="#">
              Home
            </Link>
            <Link className="text-sm font-medium hover:text-purple-600" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-purple-600" href="#pricing">
              Pricing
            </Link>
          </nav>
          <div className="flex gap-4">
            <Button asChild variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-100">
              <Link href="#contact">Contact</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <Link href="/auth">Try Now</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-800">
                  Empower Your Skincare Brand with Data-Driven Insights
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                  Transform your product development and market understanding with powerful research tools designed for
                  emerging skincare brands.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Link href="/auth">Try Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-purple-600 border-purple-300 hover:bg-purple-100">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-800">Our Features</h2>
            <div className="grid gap-12 lg:grid-cols-3">
              <Card className="bg-purple-50 border-purple-100">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Beaker className="h-12 w-12 text-purple-500" />
                  <h3 className="text-xl font-bold text-purple-700">Product Development Tracking</h3>
                  <p className="text-center text-gray-600">
                    Track product trials, monitor feedback, and make data-driven improvements.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-pink-50 border-pink-100">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Users className="h-12 w-12 text-pink-500" />
                  <h3 className="text-xl font-bold text-pink-700">Consumer Feedback Collection</h3>
                  <p className="text-center text-gray-600">
                    Collect and analyze valuable insights directly from your target audience.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-100">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <BarChart className="h-12 w-12 text-purple-500" />
                  <h3 className="text-xl font-bold text-purple-700">Data Analysis & Reporting</h3>
                  <p className="text-center text-gray-600">
                    Access in-depth reports and trends to guide smarter decisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold text-purple-800">Choose Your Plan</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-purple-700">Basic Plan</h3>
                  <p className="mb-6 text-gray-600">Perfect for startups on a budget. Includes core features.</p>
                  <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    <Link href="#signup">Select Plan</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white border-purple-300 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-pink-700">Professional Plan</h3>
                  <p className="mb-6 text-gray-600">Unlock advanced analytics and consumer insights.</p>
                  <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <Link href="#signup">Select Plan</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-purple-700">Enterprise Plan</h3>
                  <p className="mb-6 text-gray-600">Custom solutions tailored for established brands.</p>
                  <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    <Link href="#signup">Select Plan</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="signup" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-purple-800">Get started with Glow today</h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
                  Join the growing community of skincare brands making data-driven decisions.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">Try Now</Button>
                </form>
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-purple-600" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-purple-50 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="text-center text-sm leading-loose text-gray-600 md:text-left">
            <Link className="font-medium underline underline-offset-4 hover:text-purple-600" href="#">
              Terms of Service
            </Link>{" "}
            ·{" "}
            <Link className="font-medium underline underline-offset-4 hover:text-purple-600" href="#">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link className="font-medium underline underline-offset-4 hover:text-purple-600" href="#">
              Contact Us
            </Link>
          </div>
          <div className="flex gap-4">
            <Link className="text-gray-600 hover:text-purple-600" href="#">
              <span className="sr-only">LinkedIn</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
            <Link className="text-gray-600 hover:text-purple-600" href="#">
              <span className="sr-only">Instagram</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
            </Link>
            <Link className="text-gray-600 hover:text-purple-600" href="#">
              <span className="sr-only">Twitter</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148a13.98 13.98 0 0 0 10.15 5.144 4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}