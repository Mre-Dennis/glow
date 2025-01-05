
export enum QuestionType {
    Text = "text",
    Number = "number",
    Checkbox = "checkbox",
    Radio = "radio",
    Dropdown = "dropdown",
    Toggle = "toggle",
  }
  
export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  likertScale?: number; // New property for Likert Scale points
  matrixRows?: string[];
}

export interface FormConfig {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export const saveFormConfig = (config: FormConfig) => {
  localStorage.setItem(`form_${config.id}`, JSON.stringify(config));
};

export const generateUniqueUrl = (id: string) => {
  return `${window.location.origin}/form/${id}`;
};

export const calculateProgress = (fields: FormField[]): number => {
  return Math.min(100, Math.floor((fields.length / 10) * 100));
};

export const calculateLevel = (fields: FormField[]): number => {
  return Math.floor(fields.length / 3) + 1;
};

export const getReward = (level: number): string => {
  const rewards = [
    "Novice Researcher",
    "Data Explorer",
    "Insight Gatherer",
    "Survey Master",
    "Research Guru"
  ];
  return rewards[Math.min(level - 1, rewards.length - 1)];
};

export const exportToCSV = (config: FormConfig): string => {
  const headers = ["Question", "Type", "Required", "Options"];
  const rows = config.fields.map(field => [
    field.label,
    field.type,
    field.required ? "Yes" : "No",
    field.options?.join(";") || ""
  ]);
  return [headers, ...rows].map(row => row.join(",")).join("\n");
}; 