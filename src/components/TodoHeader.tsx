import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../context/TodoContext';
import { useTheme } from '../context/ThemeContext';

interface TodoHeaderProps {
  onOpenAddModal: () => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ onOpenAddModal }) => {
  const { searchQuery, setSearchQuery, stats, clearCompleted, resetDemoData } = useTodos();
  const { colors, isDark, toggleTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  const handleClearCompleted = () => {
    if (stats.completed === 0) return;
    Alert.alert(
      'Clear Completed Tasks',
      `Are you sure you want to remove all ${stats.completed} completed task(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearCompleted },
      ]
    );
  };

  const handleResetDemo = () => {
    Alert.alert(
      'Reset Sample Data',
      'This will replace your current tasks with the initial sample tasks. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'default', onPress: resetDemoData },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Top bar with title and action icons */}
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.dateText, { color: colors.accent }]}>
            {formattedDate.toUpperCase()}
          </Text>
          <Text style={[styles.titleText, { color: colors.text }]}>My Tasks</Text>
        </View>

        <View style={styles.actionButtons}>
          {/* Quick Theme Toggle Button */}
          <TouchableOpacity
            style={[
              styles.iconButton,
              { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
            ]}
            onPress={toggleTheme}
            accessibilityLabel="Toggle light and dark theme"
          >
            <Ionicons
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={19}
              color={isDark ? '#FBBF24' : colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconButton,
              { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
              showSearch && { borderColor: colors.primary, backgroundColor: colors.surfaceElevated },
            ]}
            onPress={() => {
              if (showSearch) {
                setSearchQuery('');
              }
              setShowSearch(!showSearch);
            }}
            accessibilityLabel="Search tasks"
          >
            <Ionicons
              name={showSearch ? 'close' : 'search'}
              size={19}
              color={showSearch ? colors.primary : colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconButton,
              { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
            ]}
            onPress={handleResetDemo}
            accessibilityLabel="Reset demo tasks"
          >
            <Ionicons name="refresh-outline" size={19} color={colors.textSecondary} />
          </TouchableOpacity>

          {stats.completed > 0 && (
            <TouchableOpacity
              style={[
                styles.iconButton,
                { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
              ]}
              onPress={handleClearCompleted}
              accessibilityLabel="Clear completed tasks"
            >
              <Ionicons name="trash-outline" size={19} color={colors.danger} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={onOpenAddModal}
            accessibilityLabel="Add new task"
          >
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Real-time search bar if toggled */}
      {showSearch && (
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
          ]}
        >
          <Ionicons name="search" size={18} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search by title or note..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
              <Ionicons name="close-circle" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Progress & stats card */}
      <View
        style={[
          styles.progressCard,
          { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
        ]}
      >
        <View style={styles.progressHeader}>
          <View>
            <Text style={[styles.progressTitle, { color: colors.text }]}>Productivity</Text>
            <Text style={[styles.progressSubtitle, { color: colors.textSecondary }]}>
              {stats.completed} of {stats.total} completed
            </Text>
          </View>
          <View
            style={[
              styles.rateBadge,
              { backgroundColor: colors.surfaceElevated, borderColor: colors.surfaceBorder },
            ]}
          >
            <Text style={[styles.rateText, { color: colors.accent }]}>{stats.rate}%</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View
          style={[styles.progressBarTrack, { backgroundColor: colors.progressBarTrack }]}
        >
          <View
            style={[
              styles.progressBarFill,
              { width: `${stats.rate}%`, backgroundColor: colors.primaryLight },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: '700',
    marginBottom: 2,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 14,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  clearSearchBtn: {
    padding: 4,
  },
  progressCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  progressSubtitle: {
    fontSize: 12,
  },
  rateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  rateText: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
