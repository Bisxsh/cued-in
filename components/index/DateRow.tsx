import React from 'react';
import { View, Text } from 'react-native';

import ThemedText from '../ThemedText';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DateRow = () => {
  const today = new Date();
  const day = today.getDate();

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
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() + props.offset);

  let bg = 'bg-primary';
  let textColor = 'text-txt';

  if (date.valueOf() === today.valueOf()) {
    bg = 'bg-txt';
    textColor = 'color-background';
  }

  return (
    <View
      className={`bg-gray-200 mx-2 my-4 flex-1 items-center justify-center rounded-lg ${bg} px-4 py-2`}>
      <ThemedText className={`text-lg font-light ${textColor}`}>
        {DAYS_OF_WEEK[date.getDay()]}
      </ThemedText>
      <ThemedText className={`text-3xl ${textColor} `}>{date.getDate()}</ThemedText>
    </View>
  );
};
