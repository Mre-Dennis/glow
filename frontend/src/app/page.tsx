'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, PieChart, TrendingUp, Users, Target, Search, Zap, ArrowRight, Star, CheckCircle, ChevronDown, Eye, Heart, ArrowUpRight, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useState, useRef } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const MotionCard = motion(Card)
const MotionButton = motion(Button)

export default function Page() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })
  const [activeTab, setActiveTab] = useState('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Consumer Behavior Analysis",
      description: "Understand purchasing patterns and preferences with AI-driven insights",
      icon: Users,
      category: 'analytics'
    },
    {
      title: "Trend Forecasting",
      description: "Predict upcoming market trends with our advanced machine learning algorithms",
      icon: TrendingUp,
      category: 'prediction'
    },
    {
      title: "Competitor Intelligence",
      description: "Stay ahead of the competition with real-time competitor analysis",
      icon: Target,
      category: 'analytics'
    },
    {
      title: "Sentiment Analysis",
      description: "Gauge consumer sentiment across social media and review platforms",
      icon: PieChart,
      category: 'analytics'
    },
    {
      title: "Market Opportunity Identification",
      description: "Discover untapped markets and growth opportunities for your brand",
      icon: Search,
      category: 'prediction'
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Access all your market intelligence data in one intuitive dashboard",
      icon: Zap,
      category: 'dashboard'
    },
  ]

  const performanceMetrics = [
    { name: "Brand Awareness", value: 85 },
    { name: "Customer Loyalty", value: 92 },
    { name: "Market Share Growth", value: 78 },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
          <nav className="hidden md:flex items-center gap-4 sm:gap-6">
            <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" href="#pricing">
              Pricing
            </Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors" href="#testimonials">
              Testimonials
            </Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/brand-tester">
              Brand Tester
            </Link>
            <Link href="/signin">
              <MotionButton 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variant="default" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sign In
              </MotionButton>
            </Link>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-16 bg-white shadow-lg z-40"
          >
            <nav className="flex flex-col items-center py-4 space-y-4">
              <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="#features" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
              <Link className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors" href="#testimonials" onClick={() => setMobileMenuOpen(false)}>
                Testimonials
              </Link>
              <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/brand-tester" onClick={() => setMobileMenuOpen(false)}>
                Brand Tester
              </Link>
              <Link href="/signin">
                <MotionButton 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variant="default" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign In
                </MotionButton>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-600">
                    Revolutionize Your Brand Strategy with BrandInsight
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Harness the power of AI-driven market intelligence to stay ahead in the competitive consumer landscape
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href="/get-started">
                    <MotionButton 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Start Free Trial
                    </MotionButton>
                  </Link>
                  <MotionButton 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Watch Demo
                  </MotionButton>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center"
              >
                <div className="grid grid-cols-2 gap-4 lg:gap-8">
                  <MotionCard 
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-100 p-6"
                  >
                    <CardContent className="space-y-2">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-4xl font-bold text-blue-600"
                      >
                        500M+
                      </motion.div>
                      <p className="text-sm text-gray-600">Consumer Data Points</p>
                    </CardContent>
                  </MotionCard>
                  <MotionCard 
                    whileHover={{ scale: 1.05 }}
                    className="bg-green-100 p-6"
                  >
                    <CardContent className="space-y-2">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-4xl font-bold text-green-600"
                      >
                        98%
                      </motion.div>
                      <p className="text-sm text-gray-600">Prediction Accuracy</p>
                    </CardContent>
                  </MotionCard>
                  <MotionCard 
                    whileHover={{ scale: 1.05 }}
                    className="bg-orange-100 p-6"
                  >
                    <CardContent className="space-y-2">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-4xl font-bold text-orange-600"
                      >
                        24/7
                      </motion.div>
                      <p className="text-sm text-gray-600">Real-time Updates</p>
                    </CardContent>
                  </MotionCard>
                  <MotionCard 
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-100 p-6"
                  >
                    <CardContent className="space-y-2">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="text-lg font-bold text-blue-600"
                      >
                        AI-Powered
                      </motion.div>
                      <p className="text-sm text-gray-600">Trend Predictions</p>
                    </CardContent>
                  </MotionCard>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section 
          id="features"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              variants={item}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-600"
            >
              Comprehensive Market Intelligence Features
            </motion.h2>
            <motion.p 
              variants={item}
              className="text-center text-gray-600 mb-12 max-w-[800px] mx-auto"
            >
              Gain a competitive edge with our advanced analytics and insights
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                onClick={() => setActiveTab('all')}
                variant={activeTab === 'all' ? 'default' : 'outline'}
                className={activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-blue-600'}
              >
                All
              </Button>
              <Button
                onClick={() => setActiveTab('analytics')}
                variant={activeTab === 'analytics' ? 'default' : 'outline'}
                className={activeTab === 'analytics' ? 'bg-green-600 text-white' : 'text-green-600'}
              >
                Analytics
              </Button>
              <Button
                onClick={() => setActiveTab('prediction')}
                variant={activeTab === 'prediction' ? 'default' : 'outline'}
                className={activeTab === 'prediction' ? 'bg-orange-600 text-white' : 'text-orange-600'}
              >
                Prediction
              </Button>
              <Button
                onClick={() => setActiveTab('dashboard')}
                variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                className={activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-blue-600'}
              >
                Dashboard
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {features.filter(feature => activeTab === 'all' || feature.category === activeTab).map((feature, index) => (
                  <MotionCard 
                    key={feature.title}
                    variants={item}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-white"
                  >
                    <CardContent className="p-6 space-y-4">
                      <feature.icon className={`w-12 h-12 ${
                        feature.category === 'analytics' ? 'text-green-600' :
                        feature.category === 'prediction' ? 'text-orange-600' :
                        'text-blue-600'
                      }`} />
                      <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                      <MotionButton 
                        whileHover={{ x: 10 }}
                        variant="ghost" 
                        className={`
                          ${feature.category === 'analytics' ? 'text-green-600 hover:text-green-700' :
                            feature.category === 'prediction' ? 'text-orange-600 hover:text-orange-700' :
                            'text-blue-600 hover:text-blue-700'
                          } p-0
                        `}
                      >
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </MotionButton>
                    </CardContent>
                  </MotionCard>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
                  Transform Your Brand Strategy with Data-Driven Insights
                </h2>
                <p className="text-gray-500 text-lg">
                  Our market intelligence tool empowers consumer brands to make informed decisions and stay ahead of the curve.
                </p>
                <div className="space-y-6 mt-8">
                  {[
                    {
                      title: "Increase Market Share",
                      description: "Identify growth opportunities and expand your brand's presence",
                      icon: TrendingUp,
                    },
                    {
                      title: "Optimize Product Development",
                      description: "Align your offerings with consumer demands and preferences",
                      icon: Target,
                    },
                    {
                      title: "Enhance Customer Engagement",
                      description: "Tailor your marketing strategies based on consumer behavior insights",
                      icon: Users,
                    },
                  ].map((benefit, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="mt-1 bg-gray-100 rounded-full p-2">
                        <benefit.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{benefit.title}</h3>
                        <p className="text-gray-500">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Card className="border-gray-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-blue-600 mb-4">Performance Metrics</h3>
                    <div className="space-y-6">
                      {performanceMetrics.map((metric, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-800">{metric.name}</span>
                            <span className="text-2xl font-bold text-blue-600">{metric.value}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-blue-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-gray-200">
                    <CardContent className="p-4 text-center">
                      <ArrowUpRight className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h4 className="text-lg font-semibold text-gray-800">15% Increase</h4>
                      <p className="text-sm text-gray-500">in Conversion Rate</p>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200">
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h4 className="text-lg font-semibold text-gray-800">500K+</h4>
                      <p className="text-sm text-gray-500">Active Users</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter text-green-600 text-center sm:text-4xl mb-12">
              Choose the Right Plan for Your Brand
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "$99",
                  description: "Perfect for small brands and startups",
                  features: [
                    "Basic consumer behavior analysis",
                    "Limited trend forecasting",
                    "5 competitor tracking",
                    "Weekly reports",
                  ],
                  color: "border-blue-200 hover:border-blue-300"
                },
                {
                  name: "Professional",
                  price: "$299",
                  description: "Ideal for growing brands",
                  features: [
                    "Advanced consumer behavior analysis",
                    "Full trend forecasting",
                    "20 competitor tracking",
                    "Daily reports and alerts",
                    "Sentiment analysis",
                  ],
                  color: "border-green-200 hover:border-green-300"
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "For large-scale operations",
                  features: [
                    "Full suite of analytics tools",
                    "Unlimited competitor tracking",
                    "Real-time data and alerts",
                    "Dedicated account manager",
                    "Custom integrations",
                  ],
                  color: "border-orange-200 hover:border-orange-300"
                },
              ].map((plan, index) => (
                <Card key={index} className={`bg-white ${plan.color} flex flex-col`}>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                      <div className="text-3xl font-bold text-blue-600">{plan.price}<span className="text-sm font-normal text-gray-500">/month</span></div>
                      <p className="text-gray-600">{plan.description}</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-600">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className={`w-full ${index === 2 ? "bg-orange-600 hover:bg-orange-700" : index === 1 ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white mt-auto`}>
                        Get Started
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter text-blue-600 text-center sm:text-4xl mb-12">
              What Our Clients Say
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Marketing Director, TechCorp",
                  content: "BrandInsight has revolutionized our marketing strategy. The consumer behavior insights are invaluable.",
                },
                {
                  name: "Michael Chen",
                  role: "CEO, FashionNova",
                  content: "The trend forecasting feature has helped us stay ahead of the curve in the fast-paced fashion industry.",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Brand Manager, EcoLife",
                  content: "The competitor intelligence tools have given us a significant edge in our market positioning.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white border-gray-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-500 italic">"{testimonial.content}"</p>
                      <div>
                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-500">
                  Find answers to common questions about BrandInsight and our services.
                </p>
              </div>
              <div className="space-y-4">
                <Accordion type="single" collapsible>
                  {[
                    {
                      question: "How does BrandInsight gather consumer data?",
                      answer: "BrandInsight uses a combination of web scraping, social media APIs, and partnerships with data providers to gather consumer data. All data collection is done in compliance with privacy laws and regulations."
                    },
                    {
                      question: "Can I integrate BrandInsight with my existing tools?",
                      answer: "Yes, BrandInsight offers API integrations with many popular marketing and analytics tools. Our team can also work on custom integrations for enterprise clients."
                    },
                    {
                      question: "How accurate are the trend predictions?",
                      answer: "Our AI-powered trend predictions have an accuracy rate of 98%. We continuously train and improve our models with new data to maintain this high level of accuracy."
                    },
                  ].map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-gray-800 hover:text-blue-600">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-500">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full py-12 md:py-24 lg:py-32 bg-orange-600 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Ready to Transform Your Brand Strategy?
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto max-w-[600px] md:text-xl mt-4"
            >
              Join thousands of brands leveraging BrandInsight for market dominance
            </motion.p>
            <Link href="/get-started">
              <MotionButton 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.4 }}
                className="bg-white text-orange-600 hover:bg-orange-100 mt-8"
              >
                Start Your Free Trial
              </MotionButton>
            </Link>
          </div>
        </motion.section>
      </main>
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full py-12 bg-white border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-gray-800 font-bold">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">About Us</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Careers</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-gray-800 font-bold">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Features</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Pricing</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Case Studies</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-gray-800 font-bold">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Blog</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Webinars</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Documentation</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-gray-800 font-bold">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.77z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

