import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { Habit } from '~/Types';

// Types
export interface SessionState {
  //General
  name: string;
  dateStarted: Date;

  // Habits
  habits: Habit[];
  habitBeingCreated: Habit | null;
  habitBeingEdited: Habit | null;
  completedDays: Set<string>;

  // Learn
  completedLessons: boolean[];
  completedLessonsCount: number;
}

export interface SessionActions {
  //General
  setName: (name: string) => void;

  // Habits
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  removeHabit: (id: number) => void;
  updateHabit: (id: number, updatedHabit: Partial<Habit>) => void;
  setHabitBeingCreated: (habit: Habit | null) => void;
  setHabitBeingEdited: (habit: Habit | null) => void;
  setDayComplete: (date: string) => void;
  setCompletedDays: (days: Set<string>) => void;
  removeCompletedDay: (date: string) => void;

  // Learn
  setCompletedLessons: (lessons: boolean[]) => void;
  setCompletedLessonsCount: (count: number) => void;
}

export type StoreType = SessionState & SessionActions;

export const useStore = create<StoreType>()(
  combine<SessionState, SessionActions>(
    {
      // General
      name: '',
      dateStarted: new Date(),

      // Habits
      habits: [],
      habitBeingCreated: null,
      habitBeingEdited: null,
      completedDays: new Set<string>(),

      // Learn
      completedLessons: [false, false, false, false, false, false, false, false],
      completedLessonsCount: 0,
    },
    (set) => ({
      // General
      setName: (name) => set({ name }),
      setDateStarted: (date: Date) => set({ dateStarted: date }),

      // Habits
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

      // Learn
      setCompletedLessons: (lessons) => set({ completedLessons: lessons }),
      setCompletedLessonsCount: (count) => set({ completedLessonsCount: count }),
    })
  )
);
