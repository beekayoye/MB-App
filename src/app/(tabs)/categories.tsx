import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../../context/TodoContext';
import { useTheme } from '../../context/ThemeContext';
import { Category } from '../../types/todo';

const CATEGORY_LIST: { key: Category; icon: keyof typeof Ionicons.glyphMap; description: string }[] = [
  { key: 'General', icon: 'clipboard-outline', description: 'Miscellaneous & everyday items' },
  { key: 'Work', icon: 'briefcase-outline', description: 'Projects, deadlines & office tasks' },
  { key: 'Personal', icon: 'person-outline', description: 'Personal growth, errands & life' },
  { key: 'Shopping', icon: 'cart-outline', description: 'Groceries, wishlist & purchases' },
  { key: 'Health', icon: 'fitness-outline', description: 'Workouts, medical & habits' },
  { key: 'Ideas', icon: 'bulb-outline', description: 'Brainstorms, creativity & inspiration' },
];

export default function CategoriesScreen() {
  const insets = useSafeAreaInsets();
  const { todos, toggleTodo, setSelectedCategory } = useTodos();
  const { colors } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<Category | null>(null);

  const getCategoryStats = (category: Category) => {
    const categoryTodos = todos.filter((t) => t.category === category);
    const total = categoryTodos.length;
    const completed = categoryTodos.filter((t) => t.completed).length;
    const active = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, rate, categoryTodos };
  };

  const handleGoToTasks = (cat: Category) => {
    setSelectedCategory(cat);
    router.push('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.tagline, { color: colors.accent }]}>PROJECTS & TAGS</Text>
        <Text style={[styles.title, { color: colors.text }]}>Categories</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Organize and track your tasks across different life domains.
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
      >
        {CATEGORY_LIST.map((item) => {
          const { total, completed, active, rate, categoryTodos } = getCategoryStats(item.key);
          const colorMeta = colors.categories[item.key] || colors.categories.General;
          const isExpanded = expandedCategory === item.key;

          return (
            <View
              key={item.key}
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
              ]}
            >
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => setExpandedCategory(isExpanded ? null : item.key)}
                activeOpacity={0.8}
              >
                {/* Icon badge */}
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: colorMeta.bg, borderColor: colorMeta.border },
                  ]}
                >
                  <Ionicons name={item.icon} size={22} color={colorMeta.text} />
                </View>

                {/* Info */}
                <View style={styles.infoCol}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.categoryTitle, { color: colors.text }]}>{item.key}</Text>
                    <Text style={[styles.taskCountText, { color: colors.textSecondary }]}>
                      {completed}/{total} done
                    </Text>
                  </View>
                  <Text style={[styles.descText, { color: colors.textMuted }]} numberOfLines={1}>
                    {item.description}
                  </Text>
                </View>

                {/* Chevron */}
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={colors.textMuted}
                />
              </TouchableOpacity>

              {/* Progress Bar */}
              <View style={styles.progressSection}>
                <View style={[styles.progressBarTrack, { backgroundColor: colors.progressBarTrack }]}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${rate}%`, backgroundColor: colorMeta.text },
                    ]}
                  />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={[styles.progressPercentText, { color: colors.textSecondary }]}>
                    {rate}% Complete
                  </Text>
                  <Text style={[styles.progressActiveText, { color: colors.textMuted }]}>
                    {active} active
                  </Text>
                </View>
              </View>

              {/* Expanded task details */}
              {isExpanded && (
                <View
                  style={[
                    styles.expandedContent,
                    { borderTopColor: colors.surfaceBorder },
                  ]}
                >
                  {categoryTodos.length === 0 ? (
                    <Text style={[styles.noTasksText, { color: colors.textMuted }]}>
                      No tasks created under {item.key} yet.
                    </Text>
                  ) : (
                    categoryTodos.map((todo) => (
                      <View key={todo.id} style={styles.inlineTodoRow}>
                        <TouchableOpacity
                          style={[
                            styles.miniCheck,
                            { borderColor: todo.completed ? colors.success : colors.textMuted },
                            todo.completed && { backgroundColor: colors.success },
                          ]}
                          onPress={() => toggleTodo(todo.id)}
                        >
                          {todo.completed && <Ionicons name="checkmark" size={12} color="#FFF" />}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.inlineTodoText,
                            { color: colors.text },
                            todo.completed && [styles.inlineTodoDone, { color: colors.textMuted }],
                          ]}
                          numberOfLines={1}
                        >
                          {todo.title}
                        </Text>
                      </View>
                    ))
                  )}

                  <TouchableOpacity
                    style={[
                      styles.viewInTasksBtn,
                      { backgroundColor: colors.surfaceElevated },
                    ]}
                    onPress={() => handleGoToTasks(item.key)}
                  >
                    <Text style={[styles.viewInTasksText, { color: colors.accent }]}>
                      View all in Tasks tab
                    </Text>
                    <Ionicons name="arrow-forward" size={14} color={colors.accent} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  tagline: {
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: '700',
    marginBottom: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  taskCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  descText: {
    fontSize: 12,
  },
  progressSection: {
    marginTop: 14,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressPercentText: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressActiveText: {
    fontSize: 11,
  },
  expandedContent: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  noTasksText: {
    fontSize: 12,
    fontStyle: 'italic',
    paddingVertical: 4,
  },
  inlineTodoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  miniCheck: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineTodoText: {
    fontSize: 13,
    flex: 1,
  },
  inlineTodoDone: {
    textDecorationLine: 'line-through',
  },
  viewInTasksBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    marginTop: 6,
    borderRadius: 10,
  },
  viewInTasksText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
