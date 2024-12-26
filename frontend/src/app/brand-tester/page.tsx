import Link from "next/link"
import { BrandTesterForm } from "@/components/brand-tester-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

export default function BrandTesterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <main className="flex-1 py-12 md:py-24 lg:py-32">
          <Link href="/" className="inline-block mb-8">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-green-600">
            Become a Brand Tester
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-[800px] mx-auto">
            Join our exclusive community of brand testers and help shape the future of consumer products. Get early access to new products and provide valuable feedback to top brands.
          </p>
          <BrandTesterForm />
        </main>
      </div>
    </div>
  )
}

