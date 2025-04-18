import { View, Text } from 'react-native';

import ThemedText from '../ThemedText';

import { StoreType, useStore } from '~/store/store';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DateRow = () => {
  return (
    <View className="flex flex-row items-center justify-between">
      <DateBox offset={-2} />
      <DateBox offset={-1} />
      <DateBox offset={0} />
      <DateBox offset={1} />
      <DateBox offset={2} />
    </View>
  );
};

export default DateRow;

const DateBox = (props: { offset: number }) => {
  const { completedDays, dateStarted } = useStore((state: StoreType) => ({
    completedDays: state.completedDays,
    dateStarted: state.dateStarted,
  }));

  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() + props.offset);

  let bg = 'bg-primary';
  let textColor = 'text-txt';

  if (!completedDays.has(date.toDateString()) && date.valueOf() < today.valueOf()) {
    bg = 'bg-[#D5A8A8]';
    textColor = 'text-txt';
  }

  if (date.valueOf() === today.valueOf() && !completedDays.has(date.toDateString())) {
    bg = 'bg-txt';
    textColor = 'text-background';
  }

  if (date > today || date < dateStarted) {
    bg = 'bg-gray';
  }

  return (
    <View
      className={`bg-gray-200 mx-2 my-4 flex-1 items-center justify-center rounded-lg ${bg} ${props.offset === 0 ? 'border border-txt' : ''} px-4 py-2`}>
      <ThemedText className={`text-lg font-light ${textColor}`} colour={textColor}>
        {DAYS_OF_WEEK[date.getDay()]}
      </ThemedText>
      <ThemedText className={`text-3xl ${textColor}`} colour={textColor}>
        {date.getDate()}
      </ThemedText>
    </View>
  );
};
