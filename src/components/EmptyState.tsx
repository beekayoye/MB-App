import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../context/TodoContext';
import { useTheme } from '../context/ThemeContext';

interface EmptyStateProps {
  onOpenAddModal: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onOpenAddModal }) => {
  const { filterStatus, searchQuery, selectedCategory, setSearchQuery, setSelectedCategory, setFilterStatus } =
    useTodos();
  const { colors } = useTheme();

  const isFiltered = filterStatus !== 'all' || selectedCategory !== 'All' || searchQuery.length > 0;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setFilterStatus('all');
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
        ]}
      >
        <Ionicons
          name={isFiltered ? 'search-outline' : 'checkbox-outline'}
          size={38}
          color={colors.primary}
        />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>
        {isFiltered ? 'No Matching Tasks' : 'All Clear!'}
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {isFiltered
          ? 'No tasks found for your current search or category filter.'
          : 'You have no tasks pending. Tap below to create your first task!'}
      </Text>

      {isFiltered ? (
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.primary }]}
          onPress={handleResetFilters}
          activeOpacity={0.8}
        >
          <Ionicons name="refresh" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.actionBtnText}>Reset Filters</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.primary }]}
          onPress={onOpenAddModal}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={styles.actionBtnText}>Create New Task</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
