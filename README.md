# MB Todo App

A mobile Todo application built with **React Native**, **Expo (SDK 57)**, and **Expo Router**, featuring client-side persistence with `@react-native-async-storage/async-storage`.

## Features

- **Local Offline Persistence**: Automatically loads and saves tasks locally via `AsyncStorage` with zero external database dependencies.
- **Task Management**:
  - Create tasks with a title, optional detailed notes/links, priority level, and category tag.
  - Mark tasks complete/incomplete with intuitive checkbox toggles and completion styling.
  - Edit existing tasks anytime via the task edit modal.
  - Delete individual tasks with confirmation alerts.
  - Batch clear all completed tasks.
- **Productivity & Statistics**:
  - Live productivity meter showing task completion percentage and completed/total counts.
  - Progress bar dynamically updating as tasks are completed.
- **Categorization & Filtering**:
  - Filter tasks by status: **All**, **Active**, and **Completed**.
  - Filter tasks by category tag: **General**, **Work**, **Personal**, **Shopping**, **Health**, and **Ideas**.
  - Priority levels with distinct indicators: **High** (coral), **Medium** (amber), **Low** (emerald).
  - Real-time search filter searching across both task titles and notes.
- **Appearance & Theme Engine**:
  - Full support for **Light Mode**, **Dark Mode**, and **System (Auto)** appearance.
  - Quick theme toggle in the header bar.
  - Interactive theme selector in Settings with persistent preference in `AsyncStorage`.
  - Dynamic status bar and navigation tab bar reacting to active mode.
- **Mobile-First UX**:
  - Refined light & dark palettes designed with high-contrast readability.
  - Safe area insets support across all device form factors.
  - Keyboard avoidance and clean touch dismissal.
  - Floating Action Button (FAB) for fast task creation.
  - Empty state illustrations with quick-action resets.

## Project Structure

```
├── src/
│   ├── app/                    # Expo Router route screens & layout
│   │   ├── _layout.tsx         # Root Stack layout mounting Tabs
│   │   └── (tabs)/             # Bottom Navigation Tabs
│   │       ├── _layout.tsx     # Tab Bar navigator & menu items
│   │       ├── index.tsx       # Tasks screen (list, search, filter, FAB)
│   │       ├── categories.tsx  # Categories breakdown & progress screen
│   │       ├── analytics.tsx   # Insights, completion streaks & metrics
│   │       └── settings.tsx    # Storage stats, erase/reset & preferences
│   ├── components/             # Reusable UI components
│   │   ├── AddTodoModal.tsx    # Modal form for creating & editing tasks
│   │   ├── EmptyState.tsx      # Empty state placeholder with action buttons
│   │   ├── FilterBar.tsx       # Segmented status & category filter pills
│   │   ├── TodoHeader.tsx      # Header bar, search bar, & productivity card
│   │   └── TodoItem.tsx        # Individual task card component
│   ├── context/
│   │   └── TodoContext.tsx     # Centralized state provider & storage synchronization
│   ├── services/
│   │   └── storage.ts          # AsyncStorage persistence service & sample data
│   ├── theme/
│   │   └── colors.ts           # Design tokens, category and priority palettes
│   └── types/
│       └── todo.ts             # TypeScript interfaces for Todo, Priority, Category
├── app.json                    # Expo project configuration
├── package.json
└── tsconfig.json
```

## Getting Started

### 1. Start the Dev Server

```bash
npx expo start
```

### 2. Run on Platforms

- **Android**: Press `a` in the terminal or run `npx expo start --android` (requires Android Emulator or Expo Go on device).
- **iOS**: Press `i` in the terminal or run `npx expo start --ios` (requires macOS Simulator or Expo Go on device).
- **Web**: Press `w` in the terminal or run `npx expo start --web`.

### 3. Verification Commands

```bash
npx tsc --noEmit     # TypeScript typechecking
npx eslint src       # Linting check
npx expo-doctor      # Project diagnostics
```
