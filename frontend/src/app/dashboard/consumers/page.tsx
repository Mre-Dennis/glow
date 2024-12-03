'use client'

import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DashboardLayout from '@/components/DashboardLayout'

const consumerData = [
    { id: 1, name: 'Alice Johnson', age: 28, skinType: 'Combination', purchaseFrequency: 'Monthly', totalSpent: 450 },
    { id: 2, name: 'Bob Smith', age: 35, skinType: 'Dry', purchaseFrequency: 'Quarterly', totalSpent: 300 },
    { id: 3, name: 'Carol Williams', age: 42, skinType: 'Oily', purchaseFrequency: 'Monthly', totalSpent: 600 },
    { id: 4, name: 'David Brown', age: 31, skinType: 'Normal', purchaseFrequency: 'Bi-Monthly', totalSpent: 400 },
    { id: 5, name: 'Eva Davis', age: 26, skinType: 'Sensitive', purchaseFrequency: 'Monthly', totalSpent: 550 },
]

const ageDistributionData = [
    { name: '18-25', value: 20 },
    { name: '26-35', value: 35 },
    { name: '36-45', value: 25 },
    { name: '46+', value: 20 },
]

const purchaseFrequencyData = [
    { month: 'Jan', purchases: 65 },
    { month: 'Feb', purchases: 59 },
    { month: 'Mar', purchases: 80 },
    { month: 'Apr', purchases: 81 },
    { month: 'May', purchases: 56 },
    { month: 'Jun', purchases: 55 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function ConsumersPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [skinTypeFilter, setSkinTypeFilter] = useState('all')

    const filteredConsumers = consumerData.filter(consumer =>
        consumer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (skinTypeFilter === 'all' || consumer.skinType === skinTypeFilter)
    )

    return (
        <DashboardLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold">Consumers</h1>

            <div className="flex space-x-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search consumers"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Select value={skinTypeFilter} onValueChange={setSkinTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Skin Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Skin Types</SelectItem>
                        <SelectItem value="Dry">Dry</SelectItem>
                        <SelectItem value="Oily">Oily</SelectItem>
                        <SelectItem value="Combination">Combination</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Sensitive">Sensitive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Consumer List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Skin Type</TableHead>
                                <TableHead>Purchase Frequency</TableHead>
                                <TableHead>Total Spent</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredConsumers.map((consumer) => (
                                <TableRow key={consumer.id}>
                                    <TableCell className="font-medium">{consumer.name}</TableCell>
                                    <TableCell>{consumer.age}</TableCell>
                                    <TableCell>{consumer.skinType}</TableCell>
                                    <TableCell>{consumer.purchaseFrequency}</TableCell>
                                    <TableCell>${consumer.totalSpent}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Age Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={ageDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {ageDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Purchase Frequency</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={purchaseFrequencyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="purchases" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            </div>
        </DashboardLayout>
    )
}