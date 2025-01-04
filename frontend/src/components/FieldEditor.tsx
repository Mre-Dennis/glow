import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, QuestionType } from '../utils/formUtils';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FieldEditorProps {
  onSave: (field: FormField) => void;
  editingField: FormField | null;
  existingFields: FormField[];
}

export function FieldEditor({ onSave, editingField, existingFields }: FieldEditorProps) {
  const [field, setField] = useState<FormField>({
    id: '',
    type: 'text',
    label: '',
    options: [],
    required: false,
  });
  const [option, setOption] = useState('');

  useEffect(() => {
    if (editingField) {
      setField(editingField);
    }
  }, [editingField]);

  const handleSave = () => {
    if (field.label.trim() === '') {
      alert('Please enter a label for the question.');
      return;
    }
    onSave({ ...field, id: field.id || crypto.randomUUID() });
    setField({ id: '', type: 'text', label: '', options: [], required: false });
  };

  const addOption = () => {
    if (option && field.options) {
      setField({ ...field, options: [...field.options, option] });
      setOption('');
    }
  };

  const removeOption = (index: number) => {
    if (field.options) {
      const newOptions = [...field.options];
      newOptions.splice(index, 1);
      setField({ ...field, options: newOptions });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="questionLabel" className="text-lg text-primary">Question Text</Label>
          <Input
            id="questionLabel"
            value={field.label}
            onChange={(e) => setField({ ...field, label: e.target.value })}
            placeholder="Enter question text"
            className="mt-1 text-lg"
          />
        </div>
        <div>
          <Label htmlFor="questionType" className="text-lg text-primary">Question Type</Label>
          <Select
            value={field.type}
            onValueChange={(value: QuestionType) => setField({ ...field, type: value, options: value === 'text' || value === 'number' ? undefined : [] })}
          >
            <SelectTrigger className="mt-1 text-lg">
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Short Answer</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="checkbox">Multiple Choice (Checkbox)</SelectItem>
              <SelectItem value="radio">Single Choice (Radio)</SelectItem>
              <SelectItem value="dropdown">Dropdown</SelectItem>
              <SelectItem value="likert">Likert Scale</SelectItem>
              <SelectItem value="matrix">Matrix</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(field.type === 'checkbox' || field.type === 'radio' || field.type === 'dropdown') && (
          <div className="space-y-2">
            <Label htmlFor="questionOptions" className="text-lg text-primary">Options</Label>
            <div className="flex space-x-2">
              <Input
                id="questionOptions"
                value={option}
                onChange={(e) => setOption(e.target.value)}
                placeholder="Enter option"
                className="text-lg"
              />
              <Button onClick={addOption} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <PlusCircle className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {field.options?.map((opt, index) => (
                <li key={index} className="flex items-center justify-between text-primary">
                  <span>{opt}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeOption(index)}>
                    <MinusCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {field.type === 'likert' && (
          <div>
            <Label htmlFor="likertScale" className="text-lg text-primary">Likert Scale Points</Label>
            <Select
              value={field.likertScale?.toString() || '5'}
              onValueChange={(value) => setField({ ...field, likertScale: parseInt(value) })}
            >
              <SelectTrigger className="mt-1 text-lg">
                <SelectValue placeholder="Select scale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3-point scale</SelectItem>
                <SelectItem value="5">5-point scale</SelectItem>
                <SelectItem value="7">7-point scale</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {field.type === 'matrix' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="matrixRows" className="text-lg text-primary">Matrix Rows</Label>
              <Input
                id="matrixRows"
                value={field.matrixRows?.join(', ') || ''}
                onChange={(e) => setField({ ...field, matrixRows: e.target.value.split(',').map(item => item.trim()) })}
                placeholder="Enter row labels, separated by commas"
                className="mt-1 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="matrixColumns" className="text-lg text-primary">Matrix Columns</Label>
              <Input
                id="matrixColumns"
                value={field.matrixColumns?.join(', ') || ''}
                onChange={(e) => setField({ ...field, matrixColumns: e.target.value.split(',').map(item => item.trim()) })}
                placeholder="Enter column labels, separated by commas"
                className="mt-1 text-lg"
              />
            </div>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="required"
            checked={field.required}
            onCheckedChange={(checked) => setField({ ...field, required: checked as boolean })}
          />
          <Label htmlFor="required" className="text-lg text-primary">Required</Label>
        </div>
        <div>
          <Label htmlFor="conditionalLogic" className="text-lg text-primary">Conditional Logic</Label>
          <Select
            value={field.conditionalLogic?.dependsOn || 'none'}
            onValueChange={(value) => setField({ ...field, conditionalLogic: value !== 'none' ? { dependsOn: value, showIf: '' } : undefined })}
          >
            <SelectTrigger className="mt-1 text-lg">
              <SelectValue placeholder="Select dependent question" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No conditional logic</SelectItem>
              {existingFields.map((f) => (
                <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {field.conditionalLogic && (
            <Input
              className="mt-2 text-lg"
              placeholder="Show if answer is..."
              value={field.conditionalLogic.showIf}
              onChange={(e) => setField({ ...field, conditionalLogic: { ...field.conditionalLogic!, showIf: e.target.value } })}
            />
          )}
        </div>
      </CardContent>
      <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground text-lg py-2 rounded-md hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
        Save Question
      </Button>
    </Card>
  );
}

