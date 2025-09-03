export type TaskId = string;

export interface Task {
  id: TaskId;
  text: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface EditableTaskFields {
  text?: string;
  completed?: boolean;
}
