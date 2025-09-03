import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  const handleSave = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => onToggle(task.id)} style={styles.checkbox}>
        <View style={[styles.checkmark, task.completed && styles.checkmarkChecked]} />
      </Pressable>
      <View style={styles.content}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={handleSave}
            autoFocus
          />
        ) : (
          <Text style={[styles.text, task.completed && styles.textCompleted]}>{task.text}</Text>
        )}
      </View>
      {isEditing ? (
        <Pressable onPress={handleSave} style={styles.actionButton}>
          <Text style={styles.actionText}>Save</Text>
        </Pressable>
      ) : (
        <>
          <Pressable onPress={() => { setDraft(task.text); setIsEditing(true); }} style={styles.actionButton}>
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>
          <Pressable onPress={() => onDelete(task.id)} style={[styles.actionButton, styles.deleteButton]}>
            <Text style={styles.actionText}>Delete</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  checkmarkChecked: {
    backgroundColor: '#1e90ff',
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#222',
  },
  textCompleted: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  deleteButton: {
    marginLeft: 4,
  },
  actionText: {
    color: '#1e90ff',
    fontWeight: '600',
  },
});
