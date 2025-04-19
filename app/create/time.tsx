import Hoop from '@assets/mascots/hoop.svg';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  KeyboardTypeOptions,
  InputModeOptions,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { COLOURS } from '~/Constants';
import { Habit } from '~/Types';
import BorderedTextBox from '~/components/BorderedTextBox';
import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import Separator from '~/components/Separator';
import ThemedText from '~/components/ThemedText';
import { QuestionBox } from '~/components/create/QuestionBox';
import LearnBox from '~/components/learn/LearnBox';
import { StoreType, useStore } from '~/store/store';

const TimeScreen = () => {
  const [habitTime, setHabitTime] = useState<Date | undefined>(undefined);
  const [reminderTime, setReminderTime] = useState<Date | undefined>(undefined);
  const [target, setTarget] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const navigation = useNavigation();

  const { habitBeingCreated, setHabitBeingCreated, addHabit, completedLessons } = useStore(
    (state: StoreType) => ({
      habitBeingCreated: state.habitBeingCreated,
      setHabitBeingCreated: state.setHabitBeingCreated,
      addHabit: state.addHabit,
      completedLessons: state.completedLessons,
    })
  );

  const createHabit = () => {
    if (habitBeingCreated) {
      const newHabit: Habit = {
        ...habitBeingCreated,
        targetProgress: target,
        currProgress: 0,
        intention: '',
      };
      setHabitBeingCreated(null);
      addHabit(newHabit);
    }

    setHabitTime(undefined);
    setReminderTime(undefined);
    setTarget(0);
    navigation.goBack();
    navigation.goBack();
  };

  return (
    <SafeAreaView className="relative mx-6 h-full flex-1 bg-background">
      <ScrollView className="flex-1">
        <Heading svg={<Hoop width={120} height={144} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-4xl font-semibold">Set Your</ThemedText>
            <ThemedText className="text-4xl font-semibold color-primary">Intentions</ThemedText>
          </View>
        </Heading>
        <View className="flex-1">
          <DateQuestionBox
            colour="accent"
            value={habitTime}
            onChangeText={setHabitTime}
            number="1. "
            question="When would you like to do this habit?"
            boxHeading="HABIT TIME"
            placeholderText="15:00"
            inputMode="numeric"
            keyboardType="numeric"
          />
          <DateQuestionBox
            colour="primary"
            value={reminderTime}
            onChangeText={setReminderTime}
            number="2. "
            question="When would you like to be reminded?"
            boxHeading="REMINDER TIME"
            placeholderText="15:00"
            inputMode="numeric"
            keyboardType="numeric"
          />
          <QuestionBox
            colour="secondary"
            value={String(target)}
            onChangeText={(text: string) => setTarget(Number(text))}
            number="3. "
            question="Set a target for this habit"
            emoji="📈"
            hint="How many times do you want to do this action?"
            boxHeading="I WILL DO THIS ..."
            placeholderText="6 times a day"
            isNumber
          />
        </View>
        {target && (
          <View className="mb-20 flex flex-1 items-center justify-center">
            <Button
              title="Let's Go!"
              className="m-4 w-[50%] rounded-md bg-accent text-background shadow-sm"
              onPress={createHabit}
            />
          </View>
        )}
        <InfoModal
          visible={showInfo}
          setVisible={setShowInfo}
          title="Context Cues"
          buttonText="Close"
          body={
            <>
              <ThemedText>Unsure what context cues are? Check out this quick lesson!</ThemedText>
              <LearnBox
                imagePath={require('../../assets/learn/lesson_2.png')}
                title="Context Cues"
                isComplete={completedLessons[1]}
                href="/learn/lessonTwo"
                onPress={() => setShowInfo(false)}
              />
            </>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const DateQuestionBox = (props: {
  colour: string;
  value: Date | undefined;
  onChangeText: ((text: Date) => void) | undefined;
  number: string;
  question: string;
  emoji?: string;
  hint?: string;
  boxHeading: string;
  placeholderText: string;
  inputMode?: InputModeOptions;
  keyboardType?: KeyboardTypeOptions;
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View className="relative mt-4 flex w-full gap-y-4 rounded-md p-4">
      <View className="gap-y-2">
        <View className="flex-row justify-start gap-x-2">
          <ThemedText className="sml-4 w-6 min-w-6 max-w-6 flex-1 text-xl font-semibold">
            {props.number}
          </ThemedText>
          <ThemedText className="sml-4 text-xl font-semibold">{props.question}</ThemedText>
        </View>
        {props.emoji && props.hint && (
          <View className="flex-row justify-start gap-x-2">
            <ThemedText className="sml-4 text-md w-6 text-hintTxt">{props.emoji}</ThemedText>
            <ThemedText className="sml-4 text-md flex-1 text-hintTxt">{props.hint}</ThemedText>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => setShowPicker((p) => !p)}>
        <BorderedTextBox
          title={props.boxHeading}
          className={`w-full border-${props.colour}`}
          textClassName={`color-${props.colour}`}>
          <Pressable onPress={() => setShowPicker((p) => !p)}>
            <ThemedText
              className="w-full rounded-md p-4 text-lg font-bold"
              colour={`text-${props.value ? props.colour : 'hintTxt'}`}>
              {props.value
                ? props.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : props.placeholderText}
            </ThemedText>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              mode="time"
              value={props.value ?? new Date()}
              display="default"
              is24Hour
              onChange={(event, date) => {
                if (event.type === 'dismissed') {
                  setShowPicker(false);
                  return;
                }

                if (date && props.onChangeText) {
                  props.onChangeText(date);
                }
              }}
            />
          )}
        </BorderedTextBox>
      </TouchableOpacity>
    </View>
  );
};

const InfoModal = (props: {
  title: string;
  body: React.ReactNode;
  buttonText: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      animationType="slide"
      className="absolute bottom-0 left-0 right-0 top-0 z-50 h-full w-full"
      transparent
      visible={props.visible}
      onRequestClose={() => {
        props.setVisible(!props.visible);
      }}>
      <Pressable
        className="centered h-full w-full justify-center bg-gray/80"
        onPress={() => {
          props.setVisible(false);
        }}>
        <View className="m-6 gap-y-4 bg-background p-6 shadow-md">
          <ThemedText className="text-center text-4xl">{props.title}</ThemedText>
          {props.body}
          <Button
            title={props.buttonText}
            onPress={() => props.setVisible(!props.visible)}
            className="border border-primary bg-background shadow-none"
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default TimeScreen;
