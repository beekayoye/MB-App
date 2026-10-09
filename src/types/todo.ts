export type Priority = 'low' | 'medium' | 'high';

export type Category = 'General' | 'Work' | 'Personal' | 'Shopping' | 'Health' | 'Ideas';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: number;
  completedAt?: number;
}

export type FilterStatus = 'all' | 'active' | 'completed';
