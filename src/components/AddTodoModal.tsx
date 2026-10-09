import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo, Priority, Category } from '../types/todo';
import { useTodos } from '../context/TodoContext';
import { useTheme } from '../context/ThemeContext';

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  todoToEdit?: Todo | null;
}

const CATEGORIES: Category[] = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Ideas'];
const PRIORITIES: { key: Priority; label: string }[] = [
  { key: 'low', label: 'Low' },
  { key: 'medium', label: 'Medium' },
  { key: 'high', label: 'High' },
];

interface FormProps {
  onClose: () => void;
  todoToEdit?: Todo | null;
}

const AddTodoForm: React.FC<FormProps> = ({ onClose, todoToEdit }) => {
  const { addTodo, updateTodo } = useTodos();
  const { colors } = useTheme();

  const [title, setTitle] = useState(todoToEdit?.title ?? '');
  const [description, setDescription] = useState(todoToEdit?.description ?? '');
  const [priority, setPriority] = useState<Priority>(todoToEdit?.priority ?? 'medium');
  const [category, setCategory] = useState<Category>(todoToEdit?.category ?? 'General');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      setErrorMessage('Task title cannot be empty.');
      return;
    }

    if (todoToEdit) {
      await updateTodo(todoToEdit.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        category,
      });
    } else {
      await addTodo({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        category,
      });
    }

    onClose();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardContainer}
    >
      <View
        style={[
          styles.modalCard,
          { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {todoToEdit ? 'Edit Task' : 'New Task'}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.closeBtn, { backgroundColor: colors.surfaceElevated }]}
          >
            <Ionicons name="close" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* Title Input */}
          <Text style={[styles.label, { color: colors.textMuted }]}>TITLE</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBackground,
                borderColor: colors.surfaceBorder,
                color: colors.text,
              },
              Boolean(errorMessage) && { borderColor: colors.danger },
            ]}
            placeholder="What needs to be done?"
            placeholderTextColor={colors.textMuted}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errorMessage) setErrorMessage('');
            }}
            autoFocus={!todoToEdit}
            returnKeyType="next"
          />
          {Boolean(errorMessage) && (
            <Text style={[styles.errorText, { color: colors.danger }]}>{errorMessage}</Text>
          )}

          {/* Description Input */}
          <Text style={[styles.label, { color: colors.textMuted }]}>NOTES (OPTIONAL)</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: colors.inputBackground,
                borderColor: colors.surfaceBorder,
                color: colors.text,
              },
            ]}
            placeholder="Add extra details, checklist, or links..."
            placeholderTextColor={colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          {/* Priority Selection */}
          <Text style={[styles.label, { color: colors.textMuted }]}>PRIORITY</Text>
          <View style={styles.pillRow}>
            {PRIORITIES.map((item) => {
              const isSelected = priority === item.key;
              const meta = colors.priorities[item.key];
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.priorityPill,
                    {
                      backgroundColor: colors.inputBackground,
                      borderColor: colors.surfaceBorder,
                    },
                    isSelected && {
                      backgroundColor: meta.bg,
                      borderColor: meta.dot,
                    },
                  ]}
                  onPress={() => setPriority(item.key)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.dot, { backgroundColor: meta.dot }]} />
                  <Text
                    style={[
                      styles.pillText,
                      { color: isSelected ? meta.text : colors.textSecondary },
                      isSelected && { fontWeight: '700' },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Category Selection */}
          <Text style={[styles.label, { color: colors.textMuted }]}>CATEGORY</Text>
          <View style={styles.pillWrap}>
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat;
              const meta = colors.categories[cat];
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryPill,
                    {
                      backgroundColor: colors.inputBackground,
                      borderColor: colors.surfaceBorder,
                    },
                    isSelected && {
                      backgroundColor: meta.bg,
                      borderColor: meta.border,
                    },
                  ]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.categoryPillText,
                      { color: isSelected ? meta.text : colors.textSecondary },
                      isSelected && { fontWeight: '700' },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.cancelButton,
              { backgroundColor: colors.surfaceElevated, borderColor: colors.surfaceBorder },
            ]}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={[styles.cancelText, { color: colors.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.saveText}>
              {todoToEdit ? 'Save Changes' : 'Create Task'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  onClose,
  todoToEdit,
}) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <AddTodoForm
            key={todoToEdit ? todoToEdit.id : 'new-todo'}
            onClose={onClose}
            todoToEdit={todoToEdit}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 16, 0.65)',
    justifyContent: 'flex-end',
  },
  keyboardContainer: {
    width: '100%',
  },
  modalCard: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 22,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 6,
    borderRadius: 10,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  saveText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
