import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types';
import { TaskItem } from '../components/TaskItem';
import { TaskInput } from '../components/TaskInput';
import { loadTasks, saveTasks } from '../storage';

function createTask(text: string): Task {
  const now = Date.now();
  return {
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

export const HomeScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    (async () => {
      const saved = await loadTasks();
      setTasks(saved);
    })();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (text: string) => {
    setTasks((prev) => [createTask(text), ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id: string, text: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text, updatedAt: Date.now() } : t)));
  };

  const header = useMemo(() => (
    <View style={styles.header}>
      <Text style={styles.title}>My Tasks</Text>
      <TaskInput onSubmit={addTask} submitLabel="Add" />
    </View>
  ), []);

  const empty = (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>Your list is empty. Add your first task.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />)
        }
        contentContainerStyle={tasks.length === 0 ? { flexGrow: 1 } : undefined}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    color: '#666',
  },
});
