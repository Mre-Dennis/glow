import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FieldEditor } from './FieldEditor';
import { FieldList } from './FieldList';
import { FormPreview } from './FormPreview';
import { FormField, FormConfig, saveFormConfig, generateUniqueUrl, calculateProgress, calculateLevel, getReward, exportToCSV } from '../utils/formUtils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toaster";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import confetti from 'canvas-confetti';
import { Download } from 'lucide-react';

interface FormBuilderProps {
  initialConfig?: FormConfig;
  onSave?: (config: FormConfig) => void;
}

function FormBuilder({ initialConfig, onSave }: FormBuilderProps) {
  const [formConfig, setFormConfig] = useState<FormConfig>(initialConfig || {
    id: crypto.randomUUID(),
    title: '',
    description: '',
    fields: [],
  });
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [formUrl, setFormUrl] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(1);


  useEffect(() => {
    setProgress(calculateProgress(formConfig.fields));
    setLevel(calculateLevel(formConfig.fields));
  }, [formConfig.fields]);

  const handleSaveField = (field: FormField) => {
    if (editingField) {
      setFormConfig({
        ...formConfig,
        fields: formConfig.fields.map(f => f.id === field.id ? field : f)
      });
      setEditingField(null);
    } else {
      setFormConfig({
        ...formConfig,
        fields: [...formConfig.fields, field]
      });
    }
    toast({
      title: "Question added!",
      description: `You've unlocked: ${getReward(level + 1)}`,
      className: "bg-green-500 text-white",
    });
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
  };

  const handleDeleteField = (fieldId: string) => {
    setFormConfig({
      ...formConfig,
      fields: formConfig.fields.filter(f => f.id !== fieldId)
    });
  };

  const handleSaveForm = () => {
    saveFormConfig(formConfig);
    const url = generateUniqueUrl(formConfig.id);
    setFormUrl(url);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    toast({
      title: "Feedback form saved successfully!",
      description: "Your feedback form is ready to be shared!",
      className: "bg-purple-600 text-white",
    });
    if (onSave) {
      onSave(formConfig);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(formConfig.fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFormConfig({
      ...formConfig,
      fields: items
    });
  };

  const handleExport = () => {
    const csvContent = exportToCSV(formConfig);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `feedback_form_${formConfig.id}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">Feedback Form Builder</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Form Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Form Title"
                value={formConfig.title}
                onChange={(e) => setFormConfig({ ...formConfig, title: e.target.value })}
                className="mb-4"
              />
              <Textarea
                placeholder="Form Description"
                value={formConfig.description}
                onChange={(e) => setFormConfig({ ...formConfig, description: e.target.value })}
                className="mb-4"
              />
            </CardContent>
          </Card>
          <FieldEditor onSave={handleSaveField} editingField={editingField} existingFields={formConfig.fields} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <FieldList fields={formConfig.fields} onEdit={handleEditField} onDelete={handleDeleteField} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full h-4 mb-2" />
              <p className="text-sm text-muted-foreground mb-4">You're {progress}% done! Keep adding questions to complete your form.</p>
              <p className="text-lg font-semibold text-primary">Level: {level} - {getReward(level)}</p>
            </CardContent>
          </Card>
          <FormPreview formConfig={formConfig} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button onClick={handleSaveForm} className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
          Save & Share Your Form
        </Button>
        <Button onClick={handleExport} className="bg-secondary text-secondary-foreground px-8 py-3 rounded-full text-lg font-semibold hover:bg-secondary/90 transition-all duration-300">
          <Download className="mr-2 h-4 w-4" /> Export to CSV
        </Button>
      </div>
      {formUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Share your feedback form:</CardTitle>
          </CardHeader>
          <CardContent>
            <Input value={formUrl} readOnly className="bg-muted text-lg" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export { FormBuilder };

