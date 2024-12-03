'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Plus, Search} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DashboardLayout from '@/components/DashboardLayout'

const productData = [
    { id: 1, name: 'Glow Serum', category: 'Serum', sales: 1200, stock: 500, rating: 4.5 },
    { id: 2, name: 'Hydra Boost Moisturizer', category: 'Moisturizer', sales: 980, stock: 300, rating: 4.2 },
    { id: 3, name: 'Clear Skin Cleanser', category: 'Cleanser', sales: 1500, stock: 700, rating: 4.7 },
    { id: 4, name: 'Radiance Face Mask', category: 'Mask', sales: 800, stock: 200, rating: 4.0 },
    { id: 5, name: 'Youth Restore Night Cream', category: 'Moisturizer', sales: 1100, stock: 400, rating: 4.6 },
]

const salesData = [
    { name: 'Serum', sales: 4000 },
    { name: 'Moisturizer', sales: 3000 },
    { name: 'Cleanser', sales: 2000 },
    { name: 'Mask', sales: 2780 },
    { name: 'Toner', sales: 1890 },
    { name: 'Sunscreen', sales: 2390 },
]

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const filteredProducts = productData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === 'all' || product.category === categoryFilter)
    )

    return (
        <DashboardLayout>
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Products</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New Product
                </Button>
            </div>

            <div className="flex space-x-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Serum">Serum</SelectItem>
                        <SelectItem value="Moisturizer">Moisturizer</SelectItem>
                        <SelectItem value="Cleanser">Cleanser</SelectItem>
                        <SelectItem value="Mask">Mask</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Sales</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Rating</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.sales}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.rating}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            </div>
        </DashboardLayout>
    )
}