import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

interface TaskInputProps {
  initialValue?: string;
  placeholder?: string;
  onSubmit: (text: string) => void;
  submitLabel?: string;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  initialValue = '',
  placeholder = 'Add a task...',
  onSubmit,
  submitLabel = 'Add',
}) => {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      <Pressable accessibilityRole="button" onPress={handleSubmit} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
