import { FormField } from '../utils/formUtils';
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import type { DraggableProvided } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext } from 'react-beautiful-dnd'; // Import DragDropContext

interface FieldListProps {
  fields: FormField[];
  onEdit: (field: FormField) => void;
  onDelete: (fieldId: string) => void;
}

export function FieldList({ fields, onEdit, onDelete }: FieldListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Form Questions</CardTitle>
      </CardHeader>
      <CardContent>
        {fields.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No questions added yet. Start building your form!</p>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
                {(provided: DraggableProvided) => (  // Ensure `provided` is typed correctly here
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center justify-between p-4 bg-accent rounded-md shadow transition-all duration-300 hover:shadow-md"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-primary">{field.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        Type: {field.type}
                        {field.required && ' (Required)'}
                        {field.conditionalLogic && ` (Conditional on ${field.conditionalLogic.dependsOn})`}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50" onClick={() => onEdit(field)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(field.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Ensure you wrap the FieldList component with DragDropContext
export function FormEditor({ fields, onEdit, onDelete }: FieldListProps) {
  const handleDragEnd = (result: any) => {
    // Handle the drag end logic
    // Update fields order after drag
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <FieldList fields={fields} onEdit={onEdit} onDelete={onDelete} />
    </DragDropContext>
  );
}
