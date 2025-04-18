import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { COLOURS } from '../../Constants';
import BorderedTextBox from '../BorderedTextBox';
import Card from '../Card';

const Habit = (props: {
  title: string;
  currProgress: number;
  targetProgress: number;
  intention: string;
}) => {
  return (
    <Card className="gap-y-6 p-4">
      <View className="w-full flex-row items-center justify-start gap-x-3">
        <ProgressBar progress={props.currProgress} target={props.targetProgress} />
        <Text className="max-w-[75%] text-lg">{props.title}</Text>
      </View>
      <BorderedTextBox title="IMPLEMENTATION INTENTION">
        <Text>{props.intention}</Text>
      </BorderedTextBox>
    </Card>
  );
};

export default Habit;

const ProgressBar = (props: { progress: number; target: number }) => {
  return (
    <AnimatedCircularProgress
      size={80}
      width={10}
      fill={(props.progress / props.target) * 100}
      tintColor={COLOURS.accent}
      backgroundColor={COLOURS.progressBg}
      rotation={0}
      duration={1000}
      lineCap="round">
      {() => (
        <View className="flex items-center justify-center">
          <Text>{`${props.progress} / ${props.target}`}</Text>
        </View>
      )}
    </AnimatedCircularProgress>
  );
};
