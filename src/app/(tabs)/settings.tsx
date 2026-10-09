import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../../context/TodoContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeMode } from '../../theme/colors';

const THEME_OPTIONS: { key: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap; desc: string }[] = [
  { key: 'system', label: 'System (Auto)', icon: 'phone-portrait-outline', desc: 'Match your device appearance' },
  { key: 'light', label: 'Light Mode', icon: 'sunny-outline', desc: 'Crisp, high-contrast clean theme' },
  { key: 'dark', label: 'Dark Mode', icon: 'moon-outline', desc: 'Midnight slate, easy on the eyes' },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { todos, stats, clearCompleted, resetDemoData, deleteTodo } = useTodos();
  const { colors, themeMode, setThemeMode, isDark } = useTheme();

  const handleClearCompleted = () => {
    if (stats.completed === 0) {
      Alert.alert('Info', 'There are no completed tasks to clear.');
      return;
    }
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
      'This will replace your current tasks with the default starter tasks. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'default', onPress: resetDemoData },
      ]
    );
  };

  const handleEraseAll = () => {
    if (todos.length === 0) {
      Alert.alert('Info', 'Your task list is already empty.');
      return;
    }
    Alert.alert(
      'Erase All Tasks',
      'This will permanently delete ALL tasks stored on your device. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Erase All',
          style: 'destructive',
          onPress: async () => {
            for (const t of todos) {
              await deleteTodo(t.id);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.tagline, { color: colors.accent }]}>PREFERENCES</Text>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Manage local device persistence, appearance, and storage.
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
      >
        {/* Storage status banner */}
        <View
          style={[
            styles.statusBanner,
            {
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : '#ECFDF5',
              borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0',
            },
          ]}
        >
          <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.statusTitle, { color: colors.success }]}>Offline Storage Active</Text>
            <Text style={[styles.statusSubtitle, { color: colors.textSecondary }]}>
              Using device local storage (AsyncStorage) with zero network requirement.
            </Text>
          </View>
        </View>

        {/* Appearance & Theme Selector */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: colors.textMuted, borderBottomColor: colors.surfaceBorder }]}>
            APPEARANCE & THEME
          </Text>

          {THEME_OPTIONS.map((opt) => {
            const isSelected = themeMode === opt.key;
            return (
              <TouchableOpacity
                key={opt.key}
                style={[
                  styles.themeOptionRow,
                  { borderBottomColor: colors.surfaceBorder },
                  isSelected && {
                    backgroundColor: colors.surfaceElevated,
                  },
                ]}
                onPress={() => setThemeMode(opt.key)}
                activeOpacity={0.7}
              >
                <View style={styles.rowLeft}>
                  <View
                    style={[
                      styles.themeIconBox,
                      {
                        backgroundColor: isSelected ? colors.primary : colors.surfaceElevated,
                        borderColor: colors.surfaceBorder,
                      },
                    ]}
                  >
                    <Ionicons
                      name={opt.icon}
                      size={18}
                      color={isSelected ? '#FFFFFF' : colors.textSecondary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.themeOptionLabel,
                        { color: colors.text },
                        isSelected && { fontWeight: '700', color: colors.primary },
                      ]}
                    >
                      {opt.label}
                    </Text>
                    <Text style={[styles.themeOptionDesc, { color: colors.textMuted }]}>
                      {opt.desc}
                    </Text>
                  </View>
                </View>

                {isSelected && (
                  <View style={[styles.checkCircle, { backgroundColor: colors.primary }]}>
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Data & Storage Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: colors.textMuted, borderBottomColor: colors.surfaceBorder }]}>
            DATA & STORAGE
          </Text>

          <View style={[styles.row, { borderBottomColor: colors.surfaceBorder }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="server-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.rowLabel, { color: colors.text }]}>Storage Engine</Text>
            </View>
            <Text style={[styles.rowValue, { color: colors.textSecondary }]}>AsyncStorage</Text>
          </View>

          <View style={[styles.row, { borderBottomColor: colors.surfaceBorder }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="document-text-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.rowLabel, { color: colors.text }]}>Stored Tasks</Text>
            </View>
            <Text style={[styles.rowValue, { color: colors.textSecondary }]}>{todos.length} items</Text>
          </View>

          <TouchableOpacity
            style={[styles.actionRow, { borderBottomColor: colors.surfaceBorder }]}
            onPress={handleClearCompleted}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="checkmark-done-circle-outline" size={20} color={colors.accent} />
              <Text style={[styles.rowLabel, { color: colors.accent }]}>
                Clear Completed Tasks ({stats.completed})
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionRow, { borderBottomColor: colors.surfaceBorder }]}
            onPress={handleResetDemo}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="refresh-circle-outline" size={20} color={colors.primary} />
              <Text style={[styles.rowLabel, { color: colors.primary }]}>
                Restore Sample Starter Data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionRow, { borderBottomColor: colors.surfaceBorder }]}
            onPress={handleEraseAll}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
              <Text style={[styles.rowLabel, { color: colors.danger }]}>
                Erase All Tasks Permanently
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: colors.textMuted, borderBottomColor: colors.surfaceBorder }]}>
            ABOUT
          </Text>

          <View style={[styles.row, { borderBottomColor: colors.surfaceBorder }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="phone-portrait-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.rowLabel, { color: colors.text }]}>Application</Text>
            </View>
            <Text style={[styles.rowValue, { color: colors.textSecondary }]}>MB Todo Mobile</Text>
          </View>

          <View style={[styles.row, { borderBottomColor: colors.surfaceBorder }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="layers-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.rowLabel, { color: colors.text }]}>Framework</Text>
            </View>
            <Text style={[styles.rowValue, { color: colors.textSecondary }]}>Expo SDK 57 / React 19</Text>
          </View>

          <View style={[styles.row, { borderBottomColor: colors.surfaceBorder }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="navigate-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.rowLabel, { color: colors.text }]}>Routing</Text>
            </View>
            <Text style={[styles.rowValue, { color: colors.textSecondary }]}>Expo Router Tabs</Text>
          </View>

          <View style={[styles.row, { borderBottomColor: colors.surfaceBorder }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="color-wand-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.rowLabel, { color: colors.text }]}>Active Appearance</Text>
            </View>
            <Text style={[styles.rowValue, { color: colors.textSecondary }]}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </View>
        </View>
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
    gap: 16,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  section: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  themeOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginVertical: 3,
  },
  themeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeOptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 1,
  },
  themeOptionDesc: {
    fontSize: 11,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});
