export type HabitOption = {
  id: number;
  title: string;
};

export type Habit = {
  id: number;
  title: string;
  currProgress: number;
  targetProgress: number;
  intention: string;
  habitTime: Date;
  reminderTime: Date;
};
