'use client'

import { useState } from 'react'
import { Bell, User, Lock, Globe, Palette, CreditCard, HelpCircle /*LogOut*/ } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DashboardLayout from '@/components/DashboardLayout'
import { CardFooter } from '@/components/ui/card'

export default function SettingsPage() {
  const [name, setName] = useState('Jane Doe')
  const [email, setEmail] = useState('jane.doe@example.com')
  const [language, setLanguage] = useState('english')
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  })

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>

        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Language
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </TabsTrigger>
          </TabsList>

          {/* Tab contents go here */}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
