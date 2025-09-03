# React Native To‑Do (Expo, TypeScript)

A simple To‑Do app built with React Native (Expo) using AsyncStorage for local persistence.

## Features
- Add a task
- Edit a task
- Delete a task
- Mark task as completed / not completed
- Persist tasks locally with AsyncStorage (survives app restarts)

## Stack
- Expo (React Native)
- TypeScript
- @react-native-async-storage/async-storage

## Project Structure
```
src/
  components/
    TaskInput.tsx
    TaskItem.tsx
  screens/
    HomeScreen.tsx
  storage.ts
  types.ts
App.tsx
```

## Getting Started
1) Install dependencies:
```bash
npm install
```
2) Android: start an emulator in Android Studio (AVD) first, then run:
```bash
npm run android
```

## Implementation Notes
- Persistence utilities live in `src/storage.ts` (JSON via AsyncStorage).
- Task type definitions are in `src/types.ts`.
- UI is split into modular components: `TaskInput` and `TaskItem`.
- `HomeScreen` renders the list and wires add/edit/toggle/delete.
