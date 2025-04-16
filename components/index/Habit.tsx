import React from 'react';
import { View, Text } from 'react-native';

const Habit = (props: {
  title: string;
  currProgress: number;
  targetProgress: number;
  intention: string;
}) => {
  return (
    <View>
      <Text>{props.title}</Text>
      <Text>Current Progress: {props.currProgress}</Text>
      <Text>Target Progress: {props.targetProgress}</Text>
      <Text>Intention: {props.intention}</Text>
    </View>
  );
};

export default Habit;
