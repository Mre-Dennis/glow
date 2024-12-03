'use client'

import { useState } from 'react'
import { Plus, ChevronRight, Star, Beaker, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DashboardLayout from '@/components/DashboardLayout'
import { Progress } from '@/components/ui/progress'

// Dummy data for product ideas
const productIdeas = [
    { id: 1, name: 'Overnight Repair Serum', stage: 'Research', progress: 20 },
    { id: 2, name: 'Vitamin C Brightening Cream', stage: 'Formulation', progress: 50 },
    { id: 3, name: 'Hydrating Aloe Mist', stage: 'Testing', progress: 80 },
]

// Dummy data for feedback
const feedbackData = [
    { id: 1, product: 'Overnight Repair Serum', user: 'TestUser1', rating: 4, comment: 'Love the texture, but the scent is a bit strong.' },
    { id: 2, product: 'Vitamin C Brightening Cream', user: 'TestUser2', rating: 5, comment: 'Noticed a significant improvement in skin brightness!' },
    { id: 3, product: 'Hydrating Aloe Mist', user: 'TestUser3', rating: 3, comment: 'Feels refreshing, but doesn\'t seem to last long.' },
]

export default function ProductDevelopmentPage() {
    const [newIdea, setNewIdea] = useState({ name: '', description: '', targetAudience: '' })
    const [ideas, setIdeas] = useState(productIdeas)

    const handleNewIdeaSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newId = ideas.length + 1
        setIdeas([...ideas, { ...newIdea, id: newId, stage: 'Research', progress: 0 }])
        setNewIdea({ name: '', description: '', targetAudience: '' })
    }

    const handleStageChange = (id: number, newStage: string) => {
        setIdeas(ideas.map(idea =>
            idea.id === id ? { ...idea, stage: newStage, progress: getProgressForStage(newStage) } : idea
        ))
    }

    const getProgressForStage = (stage: string) => {
        switch (stage) {
            case 'Research': return 20
            case 'Formulation': return 40
            case 'Testing': return 60
            case 'Refinement': return 80
            case 'Launch Preparation': return 100
            default: return 0
        }
    }

    return (
        <DashboardLayout>
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold">Product Development Tool</h1>

            <Tabs defaultValue="ideas">
                <TabsList>
                    <TabsTrigger value="ideas">Product Ideas</TabsTrigger>
                    <TabsTrigger value="new">New Idea</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>

                <TabsContent value="ideas">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Product Ideas</CardTitle>
                            <CardDescription>Track and manage your product development pipeline</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product Name</TableHead>
                                        <TableHead>Current Stage</TableHead>
                                        <TableHead>Progress</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ideas.map((idea) => (
                                        <TableRow key={idea.id}>
                                            <TableCell>{idea.name}</TableCell>
                                            <TableCell>
                                                <Select defaultValue={idea.stage} onValueChange={(value) => handleStageChange(idea.id, value)}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Research">Research</SelectItem>
                                                        <SelectItem value="Formulation">Formulation</SelectItem>
                                                        <SelectItem value="Testing">Testing</SelectItem>
                                                        <SelectItem value="Refinement">Refinement</SelectItem>
                                                        <SelectItem value="Launch Preparation">Launch Preparation</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Progress value={idea.progress} className="w-[60%]" />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm">View Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="new">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Product Idea</CardTitle>
                            <CardDescription>Submit a new product idea for development</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleNewIdeaSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="productName">Product Name</Label>
                                    <Input
                                        id="productName"
                                        value={newIdea.name}
                                        onChange={(e) => setNewIdea({ ...newIdea, name: e.target.value })}
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="productDescription">Description</Label>
                                    <Textarea
                                        id="productDescription"
                                        value={newIdea.description}
                                        onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                                        placeholder="Describe the product idea"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="targetAudience">Target Audience</Label>
                                    <Input
                                        id="targetAudience"
                                        value={newIdea.targetAudience}
                                        onChange={(e) => setNewIdea({ ...newIdea, targetAudience: e.target.value })}
                                        placeholder="Define the target audience"
                                        required
                                    />
                                </div>
                                <Button type="submit">Submit New Idea</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="feedback">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Feedback</CardTitle>
                            <CardDescription>Review feedback for products in development</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Comment</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {feedbackData.map((feedback) => (
                                        <TableRow key={feedback.id}>
                                            <TableCell>{feedback.product}</TableCell>
                                            <TableCell>{feedback.user}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {feedback.rating}
                                                    <Star className="h-4 w-4 fill-primary text-primary ml-1" />
                                                </div>
                                            </TableCell>
                                            <TableCell>{feedback.comment}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Ideas</CardTitle>
                        <Beaker className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ideas.length}</div>
                        <p className="text-xs text-muted-foreground">across all stages</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Testers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">providing feedback</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Development Time</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2 months</div>
                        <p className="text-xs text-muted-foreground">from idea to launch</p>
                    </CardContent>
                </Card>
            </div>
            </div>
        </DashboardLayout>
    )
}