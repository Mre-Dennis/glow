'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Search, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DashboardLayout from '@/components/DashboardLayout'

const marketShareData = [
    { name: 'Glow', share: 25 },
    { name: 'Competitor A', share: 20 },
    { name: 'Competitor B', share: 15 },
    { name: 'Competitor C', share: 12 },
    { name: 'Others', share: 28 },
]

const ingredientTrendsData = [
    { name: 'Jan', Retinol: 4000, Hyaluronic: 2400, Vitamin_C: 2400 },
    { name: 'Feb', Retinol: 3000, Hyaluronic: 1398, Vitamin_C: 2210 },
    { name: 'Mar', Retinol: 2000, Hyaluronic: 9800, Vitamin_C: 2290 },
    { name: 'Apr', Retinol: 2780, Hyaluronic: 3908, Vitamin_C: 2000 },
    { name: 'May', Retinol: 1890, Hyaluronic: 4800, Vitamin_C: 2181 },
    { name: 'Jun', Retinol: 2390, Hyaluronic: 3800, Vitamin_C: 2500 },
]

const trendingTopics = [
    { id: 1, topic: 'Sustainable Packaging', trend: 'up', change: '+15%' },
    { id: 2, topic: 'Clean Beauty', trend: 'up', change: '+22%' },
    { id: 3, topic: 'Personalized Skincare', trend: 'up', change: '+18%' },
    { id: 4, topic: 'CBD in Skincare', trend: 'down', change: '-5%' },
    { id: 5, topic: 'Anti-Aging Products', trend: 'up', change: '+10%' },
]

export default function MarketTrendsPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredTopics = trendingTopics.filter(topic =>
        topic.topic.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold">Market Trends</h1>

            <div className="flex space-x-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search trends"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Market Share</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={marketShareData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="share" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Ingredient Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={ingredientTrendsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Retinol" stroke="#8884d8" />
                                <Line type="monotone" dataKey="Hyaluronic" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="Vitamin_C" stroke="#ffc658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Topic</TableHead>
                                <TableHead>Trend</TableHead>
                                <TableHead>Change</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTopics.map((topic) => (
                                <TableRow key={topic.id}>
                                    <TableCell className="font-medium">{topic.topic}</TableCell>
                                    <TableCell>
                                        {topic.trend === 'up' ? (
                                            <TrendingUp className="text-green-500" />
                                        ) : (
                                            <TrendingDown className="text-red-500" />
                                        )}
                                    </TableCell>
                                    <TableCell className={topic.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                                        {topic.change}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            </div>
        </DashboardLayout>
    )
}