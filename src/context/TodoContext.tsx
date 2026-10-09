import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Todo, Priority, Category, FilterStatus } from '../types/todo';
import { StorageService } from '../services/storage';

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addTodo: (item: { title: string; description?: string; priority: Priority; category: Category }) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
  resetDemoData: () => Promise<void>;
  filteredTodos: Todo[];
  stats: {
    total: number;
    completed: number;
    active: number;
    rate: number;
  };
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Hydrate from AsyncStorage on startup
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const loaded = await StorageService.loadTodos();
        if (isMounted) {
          setTodos(loaded);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save to AsyncStorage whenever todos change (after initial load)
  const persistChanges = async (newTodos: Todo[]) => {
    setTodos(newTodos);
    await StorageService.saveTodos(newTodos);
  };

  const addTodo = async (item: { title: string; description?: string; priority: Priority; category: Category }) => {
    const newTodo: Todo = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 7),
      title: item.title.trim(),
      description: item.description?.trim(),
      completed: false,
      priority: item.priority,
      category: item.category,
      createdAt: Date.now(),
    };
    const updated = [newTodo, ...todos];
    await persistChanges(updated);
  };

  const toggleTodo = async (id: string) => {
    const updated = todos.map((t) => {
      if (t.id === id) {
        const isNowCompleted = !t.completed;
        return {
          ...t,
          completed: isNowCompleted,
          completedAt: isNowCompleted ? Date.now() : undefined,
        };
      }
      return t;
    });
    await persistChanges(updated);
  };

  const updateTodo = async (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    const updated = todos.map((t) => (t.id === id ? { ...t, ...updates } : t));
    await persistChanges(updated);
  };

  const deleteTodo = async (id: string) => {
    const updated = todos.filter((t) => t.id !== id);
    await persistChanges(updated);
  };

  const clearCompleted = async () => {
    const updated = todos.filter((t) => !t.completed);
    await persistChanges(updated);
  };

  const resetDemoData = async () => {
    setIsLoading(true);
    const demo = await StorageService.resetToDemo();
    setTodos(demo);
    setIsLoading(false);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // Status filter
      if (filterStatus === 'active' && todo.completed) return false;
      if (filterStatus === 'completed' && !todo.completed) return false;

      // Category filter
      if (selectedCategory !== 'All' && todo.category !== selectedCategory) return false;

      // Search filter
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(query);
        const matchesDesc = todo.description?.toLowerCase().includes(query);
        return matchesTitle || matchesDesc;
      }

      return true;
    });
  }, [todos, filterStatus, selectedCategory, searchQuery]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, rate };
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        filterStatus,
        setFilterStatus,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
        clearCompleted,
        resetDemoData,
        filteredTodos,
        stats,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
