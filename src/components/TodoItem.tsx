import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../types/todo';
import { useTodos } from '../context/TodoContext';
import { useTheme } from '../context/ThemeContext';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const { toggleTodo, deleteTodo } = useTodos();
  const { colors } = useTheme();

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Delete "${todo.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTodo(todo.id),
        },
      ]
    );
  };

  const priorityMeta = colors.priorities[todo.priority];
  const categoryMeta = colors.categories[todo.category] || colors.categories.General;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: todo.completed ? colors.cardCompletedBg : colors.surface,
          borderColor: todo.completed ? colors.cardCompletedBorder : colors.surfaceBorder,
          shadowOpacity: colors.isDark ? 0.2 : 0.06,
        },
        todo.completed && styles.cardCompleted,
      ]}
    >
      {/* Checkbox */}
      <TouchableOpacity
        style={[
          styles.checkbox,
          { borderColor: todo.completed ? colors.success : colors.textMuted },
          todo.completed && { backgroundColor: colors.success },
        ]}
        onPress={() => toggleTodo(todo.id)}
        activeOpacity={0.7}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.completed }}
      >
        {todo.completed && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
      </TouchableOpacity>

      {/* Main Content Area */}
      <TouchableOpacity
        style={styles.contentArea}
        onPress={() => onEdit(todo)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.title,
            { color: colors.text },
            todo.completed && [styles.titleCompleted, { color: colors.textMuted }],
          ]}
          numberOfLines={2}
        >
          {todo.title}
        </Text>

        {Boolean(todo.description) && (
          <Text
            style={[
              styles.description,
              { color: colors.textSecondary },
              todo.completed && [styles.descriptionCompleted, { color: colors.textMuted }],
            ]}
            numberOfLines={2}
          >
            {todo.description}
          </Text>
        )}

        {/* Badges / metadata */}
        <View style={styles.badgeRow}>
          {/* Priority badge */}
          <View style={[styles.priorityBadge, { backgroundColor: priorityMeta.bg }]}>
            <View style={[styles.priorityDot, { backgroundColor: priorityMeta.dot }]} />
            <Text style={[styles.priorityText, { color: priorityMeta.text }]}>
              {todo.priority.toUpperCase()}
            </Text>
          </View>

          {/* Category badge */}
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: categoryMeta.bg, borderColor: categoryMeta.border },
            ]}
          >
            <Text style={[styles.categoryText, { color: categoryMeta.text }]}>
              {todo.category}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Quick Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onEdit(todo)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Edit task"
        >
          <Ionicons name="pencil-outline" size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={handleDelete}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Delete task"
        >
          <Ionicons name="trash-outline" size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardCompleted: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  contentArea: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 3,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  descriptionCompleted: {
    textDecorationLine: 'line-through',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 5,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    marginLeft: 4,
  },
  actionBtn: {
    padding: 4,
  },
});
