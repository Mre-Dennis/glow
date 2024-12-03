// components/DashboardLayout.jsx
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Beaker, Users, TrendingUp, Search, Bell, ChevronDown, Settings, LogOut } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import Link from 'next/link'


export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-white w-64 min-h-screen flex flex-col ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                <div className="p-4">
                    <Link className="flex items-center gap-2 text-xl font-bold text-purple-700 ml-[12px]" href="#">
                        <span>Glowlytics</span>
                    </Link>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                    <Link href="/dashboard" passHref>
                        <Button variant="ghost" className="w-full justify-start text-blue">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/dashboard/Products" passHref>
                        <Button variant="ghost" className="w-full justify-start text-blue">
                            <Beaker className="mr-2 h-4 w-4" />
                            Products
                        </Button>
                    </Link>
                    <Link href="/dashboard/consumers" passHref>
                        <Button variant="ghost" className="w-full justify-start text-blue">
                            <Users className="mr-2 h-4 w-4" />
                            Consumers
                        </Button>
                    </Link>
                    {/* <Link href="/dashboard/productDevelopment" passHref>
                        <Button variant="ghost" className="w-full justify-start text-blue">
                            <Beaker className="mr-2 h-4 w-4" />
                            Product Development
                        </Button>
                    </Link> */}
                    <Link href="/dashboard/feedback" passHref>
                        <Button variant="ghost" className="w-full justify-start text-blue">
                            <Bell className="mr-2 h-4 w-4" />
                            Feedback
                        </Button>
                    </Link>
                    {/*<Link href="/dashboard/marketTrends" passHref>
                        <Button variant="ghost" className="w-full justify-start text-blue">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Market Trends
                        </Button>
                    </Link>*/}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <Button variant="ghost" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <LayoutDashboard className="h-6 w-6" />
                        </Button>
                        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                            <div className="max-w-lg w-full lg:max-w-xs">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="search"
                                        name="search"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                        placeholder="Search"
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <Button variant="ghost" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                <span className="sr-only">View notifications</span>
                                <Bell className="h-6 w-6" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ml-3 flex items-center">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src="/placeholder.svg"
                                            alt="User avatar"
                                            width={32}
                                            height={32}
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Jane Doe</span>
                                        <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/Settings" passHref>
                                            <a className="flex items-center">
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Account settings</span>
                                            </a>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}