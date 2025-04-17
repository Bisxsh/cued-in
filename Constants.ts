import { HabitOption } from './Types';

export const COLOURS = {
  primary: '#A8D5BA',
  secondary: '#B0C4DE',
  accent: '#F4C95D',
  background: '#F5F5F5',
  txt: '#333333',
  gray: '#A9A9A9',
  progressBg: 'rgba(244, 201, 93, 0.15)',
  hintText: '#717171',
};

export const HABITS: HabitOption[] = [
  {
    id: 1,
    title:
      '20 minutes of moderate-intensity aerobic physical activity or 10 minutes of vigorous-intensity aerobic physical activity',
  },
  { id: 2, title: 'Eat at least 5 portions of a variety of fruits and vegetables daily' },
  { id: 3, title: 'Drink 6-8 glasses of water daily' },
  { id: 4, title: 'Stop sitting for longer than 30 minutes at a time' },
  { id: 5, title: 'Stop using electronics that emit blue light an hour before bed' },
  { id: 6, title: 'Stop consuming more than 400mg of caffeine daily' },
];
