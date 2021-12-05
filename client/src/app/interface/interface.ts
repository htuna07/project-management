export enum Progress {
  todo = 0,
  in_progress = 1,
  done = 2,
  failed = -1,
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  progress: Progress;
}

export interface Project {
  id?: number;
  name: string;
  tasks: Task[];
}
