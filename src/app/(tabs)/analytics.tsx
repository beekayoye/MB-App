import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../../context/TodoContext';
import { useTheme } from '../../context/ThemeContext';

export default function AnalyticsScreen() {
  const insets = useSafeAreaInsets();
  const { todos, stats } = useTodos();
  const { colors } = useTheme();

  const highPriority = todos.filter((t) => t.priority === 'high');
  const mediumPriority = todos.filter((t) => t.priority === 'medium');
  const lowPriority = todos.filter((t) => t.priority === 'low');

  const highCompleted = highPriority.filter((t) => t.completed).length;
  const mediumCompleted = mediumPriority.filter((t) => t.completed).length;
  const lowCompleted = lowPriority.filter((t) => t.completed).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.tagline, { color: colors.accent }]}>PRODUCTIVITY</Text>
        <Text style={[styles.title, { color: colors.text }]}>Insights & Stats</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Track your completion trends, focus levels, and habit progression.
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
      >
        {/* Main Hero Card */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
          ]}
        >
          <View style={styles.heroTop}>
            <View>
              <Text style={[styles.heroLabel, { color: colors.textMuted }]}>OVERALL COMPLETION</Text>
              <Text style={[styles.heroValue, { color: colors.text }]}>{stats.rate}%</Text>
            </View>
            <View
              style={[
                styles.heroIconBadge,
                { backgroundColor: colors.surfaceElevated, borderColor: colors.surfaceBorder },
              ]}
            >
              <Ionicons
                name={stats.rate >= 75 ? 'trophy' : stats.rate >= 40 ? 'flame' : 'trending-up'}
                size={28}
                color={colors.accent}
              />
            </View>
          </View>

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

          <Text style={[styles.heroNote, { color: colors.textSecondary }]}>
            {stats.completed} of {stats.total} total tasks achieved
          </Text>
        </View>

        {/* 3 Metric Grid */}
        <View style={styles.gridRow}>
          <View
            style={[
              styles.metricCard,
              { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
            ]}
          >
            <View
              style={[
                styles.metricIconWrap,
                { backgroundColor: colors.isDark ? '#1E1B4B' : '#EEF2FF' },
              ]}
            >
              <Ionicons name="list" size={18} color={colors.primary} />
            </View>
            <Text style={[styles.metricNumber, { color: colors.text }]}>{stats.total}</Text>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Total Tasks</Text>
          </View>

          <View
            style={[
              styles.metricCard,
              { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
            ]}
          >
            <View
              style={[
                styles.metricIconWrap,
                { backgroundColor: colors.isDark ? '#064E3B' : '#ECFDF5' },
              ]}
            >
              <Ionicons name="checkmark-done" size={18} color={colors.success} />
            </View>
            <Text style={[styles.metricNumber, { color: colors.text }]}>{stats.completed}</Text>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Done</Text>
          </View>

          <View
            style={[
              styles.metricCard,
              { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
            ]}
          >
            <View
              style={[
                styles.metricIconWrap,
                { backgroundColor: colors.isDark ? '#78350F' : '#FFFBEB' },
              ]}
            >
              <Ionicons name="time-outline" size={18} color={colors.warning} />
            </View>
            <Text style={[styles.metricNumber, { color: colors.text }]}>{stats.active}</Text>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Pending</Text>
          </View>
        </View>

        {/* Priority Breakdown */}
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Breakdown by Priority</Text>

          {/* High Priority */}
          <View style={styles.priorityRow}>
            <View style={styles.priorityHeader}>
              <View style={styles.priorityTitleWrap}>
                <View style={[styles.dot, { backgroundColor: colors.priorities.high.dot }]} />
                <Text style={[styles.priorityName, { color: colors.text }]}>High Priority</Text>
              </View>
              <Text style={[styles.priorityStat, { color: colors.textSecondary }]}>
                {highCompleted}/{highPriority.length} done
              </Text>
            </View>
            <View
              style={[styles.miniBarTrack, { backgroundColor: colors.progressBarTrack }]}
            >
              <View
                style={[
                  styles.miniBarFill,
                  {
                    width: `${highPriority.length ? (highCompleted / highPriority.length) * 100 : 0}%`,
                    backgroundColor: colors.priorities.high.dot,
                  },
                ]}
              />
            </View>
          </View>

          {/* Medium Priority */}
          <View style={styles.priorityRow}>
            <View style={styles.priorityHeader}>
              <View style={styles.priorityTitleWrap}>
                <View style={[styles.dot, { backgroundColor: colors.priorities.medium.dot }]} />
                <Text style={[styles.priorityName, { color: colors.text }]}>Medium Priority</Text>
              </View>
              <Text style={[styles.priorityStat, { color: colors.textSecondary }]}>
                {mediumCompleted}/{mediumPriority.length} done
              </Text>
            </View>
            <View
              style={[styles.miniBarTrack, { backgroundColor: colors.progressBarTrack }]}
            >
              <View
                style={[
                  styles.miniBarFill,
                  {
                    width: `${mediumPriority.length ? (mediumCompleted / mediumPriority.length) * 100 : 0}%`,
                    backgroundColor: colors.priorities.medium.dot,
                  },
                ]}
              />
            </View>
          </View>

          {/* Low Priority */}
          <View style={styles.priorityRow}>
            <View style={styles.priorityHeader}>
              <View style={styles.priorityTitleWrap}>
                <View style={[styles.dot, { backgroundColor: colors.priorities.low.dot }]} />
                <Text style={[styles.priorityName, { color: colors.text }]}>Low Priority</Text>
              </View>
              <Text style={[styles.priorityStat, { color: colors.textSecondary }]}>
                {lowCompleted}/{lowPriority.length} done
              </Text>
            </View>
            <View
              style={[styles.miniBarTrack, { backgroundColor: colors.progressBarTrack }]}
            >
              <View
                style={[
                  styles.miniBarFill,
                  {
                    width: `${lowPriority.length ? (lowCompleted / lowPriority.length) * 100 : 0}%`,
                    backgroundColor: colors.priorities.low.dot,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Motivational Tip Card */}
        <View
          style={[
            styles.tipCard,
            { backgroundColor: colors.surfaceElevated, borderColor: colors.surfaceBorder },
          ]}
        >
          <Ionicons name="sparkles" size={20} color={colors.accent} style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.tipTitle, { color: colors.accent }]}>Daily Productivity Tip</Text>
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>
              Breaking large goals into small, actionable tasks with high priority makes steady progress effortless.
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
    gap: 14,
  },
  heroCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 38,
    fontWeight: '900',
  },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  heroNote: {
    fontSize: 12,
    fontWeight: '500',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
  },
  metricIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  metricNumber: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  priorityRow: {
    gap: 8,
  },
  priorityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityName: {
    fontSize: 13,
    fontWeight: '600',
  },
  priorityStat: {
    fontSize: 12,
    fontWeight: '600',
  },
  miniBarTrack: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
  },
  miniBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
