import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, combine, StorageValue } from 'zustand/middleware';

import { Habit } from '~/Types';

// Types
export interface SessionState {
  uuid: string;
  lastNotificationSent: Date;
  formReminderStartDate: Date;
  dateStarted: Date;
  habits: Habit[];
  habitBeingCreated: Habit | null;
  habitBeingEdited: Habit | null;
  completedDays: Set<string>;
  completedLessons: boolean[];
  completedLessonsCount: number;
}

export interface SessionActions {
  setUuid: (uuid: string) => void;
  setLastNotificationSent: (date: Date) => void;
  setDateStarted: (date: Date) => void;
  setFormReminderStartDate: (date: Date) => void;
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  removeHabit: (id: number) => void;
  updateHabit: (id: number, updatedHabit: Partial<Habit>) => void;
  setHabitBeingCreated: (habit: Habit | null) => void;
  setHabitBeingEdited: (habit: Habit | null) => void;
  setDayComplete: (date: string) => void;
  setCompletedDays: (days: Set<string>) => void;
  removeCompletedDay: (date: string) => void;
  setCompletedLessons: (lessons: boolean[]) => void;
  setCompletedLessonsCount: (count: number) => void;
}

export type StoreType = SessionState & SessionActions;

export const useStore = create<StoreType>()(
  persist(
    combine<SessionState, SessionActions>(
      {
        uuid: '',
        lastNotificationSent: new Date(),
        dateStarted: new Date(),
        formReminderStartDate: new Date(),
        habits: [],
        habitBeingCreated: null,
        habitBeingEdited: null,
        completedDays: new Set<string>(),
        completedLessons: [false, false, false, false, false, false, false, false],
        completedLessonsCount: 0,
      },
      (set) => ({
        setUuid: (uuid) => set({ uuid }),
        setLastNotificationSent: (date) => set({ lastNotificationSent: date }),
        setDateStarted: (date) => set({ dateStarted: date }),
        setFormReminderStartDate: (date) => set({ formReminderStartDate: date }),
        setHabits: (habits) => set({ habits }),
        addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
        removeHabit: (id) =>
          set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id),
          })),
        updateHabit: (id, updatedHabit) =>
          set((state) => ({
            habits: state.habits.map((habit) =>
              habit.id === id ? { ...habit, ...updatedHabit } : habit
            ),
          })),
        setHabitBeingCreated: (habit) => set({ habitBeingCreated: habit }),
        setHabitBeingEdited: (habit) => set({ habitBeingEdited: habit }),
        setDayComplete: (date) =>
          set((state) => ({
            completedDays: new Set(state.completedDays).add(date),
          })),
        setCompletedDays: (days) => set({ completedDays: days }),
        removeCompletedDay: (date) =>
          set((state) => {
            const newCompletedDays = new Set(state.completedDays);
            newCompletedDays.delete(date);
            return { completedDays: newCompletedDays };
          }),
        setCompletedLessons: (lessons) => set({ completedLessons: lessons }),
        setCompletedLessonsCount: (count) => set({ completedLessonsCount: count }),
      })
    ),
    {
      name: 'habit-store',
      storage: {
        getItem: async (key) => {
          const raw = await AsyncStorage.getItem(key);
          if (!raw) return null;

          const parsed = JSON.parse(raw);

          // Rehydrate Set and Date
          parsed.state.completedDays = new Set(parsed.state.completedDays);
          parsed.state.dateStarted = new Date(parsed.state.dateStarted);

          return parsed as StorageValue<SessionState & SessionActions>;
        },
        setItem: async (key, value) => {
          const parsed = {
            ...value,
            state: {
              ...value.state,
              completedDays: Array.from(value.state.completedDays), // Serialize Set
            },
          };
          await AsyncStorage.setItem(key, JSON.stringify(parsed));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);
