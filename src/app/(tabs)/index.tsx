import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../../context/TodoContext';
import { useTheme } from '../../context/ThemeContext';
import { Todo } from '../../types/todo';
import { TodoHeader } from '../../components/TodoHeader';
import { FilterBar } from '../../components/FilterBar';
import { TodoItem } from '../../components/TodoItem';
import { EmptyState } from '../../components/EmptyState';
import { AddTodoModal } from '../../components/AddTodoModal';

export default function TodoListScreen() {
  const insets = useSafeAreaInsets();
  const { filteredTodos, isLoading } = useTodos();
  const { colors } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleOpenAddModal = () => {
    setSelectedTodo(null);
    setModalVisible(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Header section with Productivity and Quick Actions */}
      <TodoHeader onOpenAddModal={handleOpenAddModal} />

      {/* Filter and Categorization controls */}
      <FilterBar />

      {/* Main List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem todo={item} onEdit={handleEditTodo} />
          )}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 84 },
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState onOpenAddModal={handleOpenAddModal} />
          }
        />
      )}

      {/* Mobile Floating Action Button (FAB) */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: colors.primary,
            bottom: insets.bottom + 16,
            shadowColor: colors.primary,
          },
        ]}
        onPress={handleOpenAddModal}
        activeOpacity={0.85}
        accessibilityLabel="Create new task"
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Create & Edit Modal */}
      <AddTodoModal
        visible={modalVisible}
        onClose={handleCloseModal}
        todoToEdit={selectedTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
});
