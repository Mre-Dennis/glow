'use client'

import React from 'react';
import { FormBuilder } from '@/components/FormBuilder';
import { FormConfig } from '@/utils/formUtils';
import DashboardLayout from '@/components/DashboardLayout'

export default function FeedbackPage() {
  const handleSaveForm = (config: FormConfig) => {
    // Here you would typically save the form configuration to your backend
    console.log('Form configuration saved:', config);
    // You can add your API call or state management logic here
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <FormBuilder onSave={handleSaveForm} />
      </div>
    </DashboardLayout>
  );
}