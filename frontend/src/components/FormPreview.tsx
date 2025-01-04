import { FormField, FormConfig } from '../utils/formUtils';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormPreviewProps {
  formConfig: FormConfig;
}

export function FormPreview({ formConfig }: FormPreviewProps) {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return <Input id={field.id} type="text" className="w-full" />;
      case 'number':
        return <Input id={field.id} type="number" className="w-full" />;
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`${field.id}-${index}`} />
                <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      case 'radio':
        return (
          <RadioGroup>
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'dropdown':
        return (
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'likert':
        return (
          <div className="flex flex-wrap justify-between">
            {Array.from({ length: field.likertScale || 5 }, (_, i) => (
              <div key={i} className="flex flex-col items-center mb-2">
                <RadioGroupItem value={`${i + 1}`} id={`${field.id}-${i}`} />
                <Label htmlFor={`${field.id}-${i}`} className="text-xs mt-1">{i + 1}</Label>
              </div>
            ))}
          </div>
        );
      case 'matrix':
        return (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  {field.matrixColumns?.map((column, index) => (
                    <TableHead key={index} className="text-center">{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {field.matrixRows?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{row}</TableCell>
                    {field.matrixColumns?.map((_, colIndex) => (
                      <TableCell key={colIndex} className="text-center">
                        <RadioGroupItem value={`${rowIndex}-${colIndex}`} id={`${field.id}-${rowIndex}-${colIndex}`} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {formConfig.fields.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Add questions to see your form preview here!</p>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{formConfig.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground">{formConfig.description}</p>
            {formConfig.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-base md:text-lg font-semibold text-primary">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {renderField(field)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

