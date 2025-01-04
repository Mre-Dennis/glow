import { v4 as uuidv4 } from 'uuid';

export type QuestionType = 'text' | 'number' | 'checkbox' | 'radio' | 'dropdown' | 'likert' | 'matrix';

export interface FormField {
  id: string;
  type: QuestionType;
  label: string;
  options?: string[];
  required?: boolean;
  conditionalLogic?: {
    dependsOn: string;
    showIf: string;
  };
  likertScale?: number;
  matrixRows?: string[];
  matrixColumns?: string[];
}

export interface FormConfig {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export function generateUniqueUrl(formId: string): string {
  return `https://example.com/feedback/${formId}`;
}

export function saveFormConfig(config: FormConfig): void {
  localStorage.setItem(`feedback_form_${config.id}`, JSON.stringify(config));
}

export function getFormConfig(formId: string): FormConfig | null {
  const saved = localStorage.getItem(`feedback_form_${formId}`);
  return saved ? JSON.parse(saved) : null;
}

export function calculateProgress(fields: FormField[]): number {
  const totalSteps = 10;
  const progress = Math.min(fields.length / totalSteps, 1);
  return Math.round(progress * 100);
}

export function calculateLevel(fields: FormField[]): number {
  return Math.floor(fields.length / 5) + 1;
}

export function getReward(level: number): string {
  const rewards = [
    "🌟 Feedback Novice",
    "📝 Question Crafter",
    "🔍 Insight Seeker",
    "📊 Data Collector",
    "🏆 Feedback Master"
  ];
  return rewards[Math.min(level - 1, rewards.length - 1)];
}

export function exportToCSV(formConfig: FormConfig): string {
  const headers = ['Question ID', 'Question Type', 'Question Text', 'Options', 'Required', 'Conditional Logic'];
  const rows = formConfig.fields.map(field => [
    field.id,
    field.type,
    field.label,
    field.options ? field.options.join(';') : '',
    field.required ? 'Yes' : 'No',
    field.conditionalLogic ? `Depends on ${field.conditionalLogic.dependsOn}, Show if ${field.conditionalLogic.showIf}` : ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csvContent;
}

