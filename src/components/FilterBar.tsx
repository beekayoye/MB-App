import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useTodos } from '../context/TodoContext';
import { useTheme } from '../context/ThemeContext';
import { FilterStatus, Category } from '../types/todo';

const CATEGORIES: (Category | 'All')[] = [
  'All',
  'General',
  'Work',
  'Personal',
  'Shopping',
  'Health',
  'Ideas',
];

export const FilterBar: React.FC = () => {
  const {
    filterStatus,
    setFilterStatus,
    selectedCategory,
    setSelectedCategory,
    stats,
  } = useTodos();
  const { colors } = useTheme();

  const statusOptions: { key: FilterStatus; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <View style={styles.container}>
      {/* Segmented status filter tabs */}
      <View
        style={[
          styles.segmentedContainer,
          { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
        ]}
      >
        {statusOptions.map((opt) => {
          const isActive = filterStatus === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.segmentBtn,
                isActive && { backgroundColor: colors.primary },
              ]}
              onPress={() => setFilterStatus(opt.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: isActive ? '#FFFFFF' : colors.textSecondary },
                  isActive && styles.segmentTextActive,
                ]}
              >
                {opt.label}
              </Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isActive
                      ? 'rgba(255, 255, 255, 0.25)'
                      : colors.surfaceElevated,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: isActive ? '#FFFFFF' : colors.textMuted },
                  ]}
                >
                  {opt.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Horizontal categories list */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryPill,
                {
                  backgroundColor: isSelected ? colors.surfaceElevated : colors.surface,
                  borderColor: isSelected ? colors.accent : colors.surfaceBorder,
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  { color: isSelected ? colors.accent : colors.textSecondary },
                  isSelected && styles.categoryPillTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  segmentedContainer: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
  },
  segmentTextActive: {
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  categoriesScroll: {
    gap: 8,
    paddingRight: 8,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryPillTextSelected: {
    fontWeight: '700',
  },
});
