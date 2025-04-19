import { View, TextInput } from 'react-native';

import BorderedTextBox from '../BorderedTextBox';
import ThemedText from '../ThemedText';

export const QuestionBox = (props: {
  colour: string;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  number: string;
  question: string;
  emoji: string;
  hint: string;
  boxHeading: string;
  placeholderText: string;
  isNumber?: boolean;
}) => {
  return (
    <View className="relative mt-4 flex w-full gap-y-4 rounded-md p-4">
      <View className="gap-y-2">
        <View className="flex-row justify-start gap-x-2">
          <ThemedText className="sml-4 w-6 min-w-6 max-w-6 flex-1 text-xl font-semibold">
            {props.number}
          </ThemedText>
          <ThemedText className="sml-4 text-xl font-semibold">{props.question}</ThemedText>
        </View>
        <View className="flex-row justify-start gap-x-2">
          <ThemedText className="sml-4 text-md w-6 text-hintTxt">{props.emoji}</ThemedText>
          <ThemedText className="sml-4 text-md flex-1 text-hintTxt">{props.hint}</ThemedText>
        </View>
      </View>
      <BorderedTextBox
        title={props.boxHeading}
        className={`w-full border-${props.colour}`}
        textClassName={`color-${props.colour}`}>
        <TextInput
          className={`w-full text-lg font-bold text-${props.colour}`}
          textAlignVertical="top"
          placeholder={props.placeholderText}
          placeholderTextColor="#A0A0A0"
          onChangeText={props.onChangeText}
          value={props.value !== '0' ? props.value : ''}
          inputMode={`${props.isNumber ? 'numeric' : 'text'}`}
          keyboardType={props.isNumber ? 'numeric' : 'default'}
        />
      </BorderedTextBox>
    </View>
  );
};
