'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DashboardLayout from '@/components/DashboardLayout'

// Define types for the fields
type FieldType = 'text' | 'email' | 'select' | 'textarea';

interface FormField {
    id: number;
    type: FieldType;
    label: string;
    placeholder: string;
    options?: string[]; // Optional, only for 'select' fields
}

export default function FeedbackCollectionPage() {
    const [formFields, setFormFields] = useState<FormField[]>([
        { id: 1, type: 'text', label: 'Name', placeholder: 'Enter your name' },
        { id: 2, type: 'email', label: 'Email', placeholder: 'Enter your email' },
        { id: 3, type: 'select', label: 'Product', placeholder: 'Select a product', options: ['Glow Serum', 'Hydra Cream', 'Clarity Toner'] },
        { id: 4, type: 'textarea', label: 'Feedback', placeholder: 'Enter your feedback here' },
    ]);


    const addField = (type: FieldType) => {
        const newField: FormField = {
            id: Date.now(),
            type,
            label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
            placeholder: `Enter ${type}`,
            options: type === 'select' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
        };
        setFormFields([...formFields, newField]);
    };

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Feedback Collection</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customize Feedback Form</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {formFields.map((field) => (
                                    <div key={field.id} className="space-y-2">
                                        <label className="text-sm font-medium">{field.label}</label>
                                        {field.type === 'text' && <Input type="text" placeholder={field.placeholder} />}
                                        {field.type === 'email' && <Input type="email" placeholder={field.placeholder} />}
                                        {field.type === 'select' && (
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a product" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {field.options?.map((option) => (
                                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                        {field.type === 'textarea' && <Textarea placeholder={field.placeholder} />}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 space-x-2">
                                <Button onClick={() => addField('text')}>Add Text Field</Button>
                                <Button onClick={() => addField('select')}>Add Select Field</Button>
                                <Button onClick={() => addField('textarea')}>Add Textarea</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Share Feedback Form</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Shareable Link</label>
                                    <Input type="text" value="https://glow.com/feedback/abc123" readOnly />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Embed Code</label>
                                    <Textarea value="<iframe src='https://glow.com/feedback/abc123' width='100%' height='500px'></iframe>" readOnly />
                                </div>
                                <Button>Copy Link</Button>
                                <Button>Copy Embed Code</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
