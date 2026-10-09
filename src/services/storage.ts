import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types/todo';

const STORAGE_KEY = '@mb_todos_storage_v1';
const FIRST_LAUNCH_KEY = '@mb_todos_has_launched';

const INITIAL_TODOS: Todo[] = [
  {
    id: 'demo-1',
    title: 'Welcome to your new Todo App! 👋',
    description: 'Tap the circle on the left to mark tasks as completed.',
    completed: false,
    priority: 'high',
    category: 'General',
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'demo-2',
    title: 'Tap on a task to edit or view details',
    description: 'You can update priorities, tags, or descriptions anytime.',
    completed: false,
    priority: 'medium',
    category: 'Work',
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'demo-3',
    title: 'Persistent offline storage enabled 🚀',
    description: 'All your todos are safely stored on your device without needing an internet connection or external database.',
    completed: true,
    priority: 'low',
    category: 'Personal',
    createdAt: Date.now() - 86400000,
    completedAt: Date.now() - 7200000,
  },
];

export const StorageService = {
  async loadTodos(): Promise<Todo[]> {
    try {
      const hasLaunched = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
      const rawData = await AsyncStorage.getItem(STORAGE_KEY);

      if (!hasLaunched) {
        // First time opening app: seed with friendly sample todos
        await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true');
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TODOS));
        return INITIAL_TODOS;
      }

      if (rawData) {
        return JSON.parse(rawData) as Todo[];
      }
      return [];
    } catch (error) {
      console.error('Failed to load todos from local storage:', error);
      return [];
    }
  },

  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to local storage:', error);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  },

  async resetToDemo(): Promise<Todo[]> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TODOS));
      return INITIAL_TODOS;
    } catch (error) {
      console.error('Failed to reset demo todos:', error);
      return [];
    }
  },
};
