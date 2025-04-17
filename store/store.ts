import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { Habit } from '~/Types';

// Types
export interface SessionState {
  habits: Habit[];
  habitBeingCreated: Habit | null;
  habitBeingEdited: Habit | null;
}

export interface SessionActions {
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  removeHabit: (id: number) => void;
  updateHabit: (id: number, updatedHabit: Partial<Habit>) => void;
  setHabitBeingCreated: (habit: Habit | null) => void;
  setHabitBeingEdited: (habit: Habit | null) => void;
}

export type StoreType = SessionState & SessionActions;

export const useStore = create<StoreType>()(
  combine<SessionState, SessionActions>(
    {
      habits: [],
      habitBeingCreated: null,
      habitBeingEdited: null,
    },
    (set) => ({
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
    })
  )
);
