import Hoop from '@assets/mascots/hoop.svg';
import { MaterialIcons } from '@expo/vector-icons';
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
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { COLOURS } from '~/Constants';
import { Habit } from '~/Types';
import BorderedTextBox from '~/components/BorderedTextBox';
import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import Separator from '~/components/Separator';
import ThemedText from '~/components/ThemedText';
import LearnBox from '~/components/learn/LearnBox';
import { StoreType, useStore } from '~/store/store';

const IntentionScreen = () => {
  const [action, setAction] = useState('');
  const [context, setContext] = useState('');
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
        intention: `${context}, I will ${action}.`,
      };
      setHabitBeingCreated(null);
      addHabit(newHabit);
    }
    setAction('');
    setContext('');
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
        <View className="h-full flex-1">
          <QuestionBox
            colour="secondary"
            value={action}
            onChangeText={(text) => setAction(text)}
            number="1. "
            question="Pick a small action to progress with this habit"
            emoji="💡"
            hint="Start tiny and specific. The goal is consistency, not intensity!"
            boxHeading="I WILL ..."
            placeholderText="Drink one glass of water"
          />
          <View className="relative">
            <TouchableOpacity
              className="absolute right-0 top-[40%] mr-2 mt-2"
              onPress={() => setShowInfo(true)}>
              <MaterialIcons size={24} name="info-outline" color={COLOURS.primary} />
            </TouchableOpacity>
            <QuestionBox
              colour="primary"
              value={context}
              onChangeText={(text) => setContext(text)}
              number="2. "
              question="Choose a context that you will perform this action in"
              emoji="🧠"
              hint="Habits stick best when tied to a stable cue in your environment."
              boxHeading="I WILL DO THIS ..."
              placeholderText="Every time I sit at my desk"
            />
          </View>
          <QuestionBox
            colour="tertiary"
            value={String(target)}
            onChangeText={(text) => setTarget(Number(text))}
            number="3. "
            question="Set a target for this habit"
            emoji="📈"
            hint="How many times do you want to do this action?"
            boxHeading="I WILL DO THIS ..."
            placeholderText="6 times a day"
            isNumber
          />
        </View>
        <Separator text="YOUR NEW HABIT" className="mt-8" />
        {action && context && target && (
          <View className="flex flex-1 items-center justify-center">
            <Text className="text-2xl font-bold text-primary">{context},</Text>
            <Text className="text-2xl font-bold text-secondary">I will {action}.</Text>
            <Button
              title="Let's Go!"
              className="m-4 w-[50%] rounded-md bg-accent text-background shadow-sm"
              onPress={createHabit}
            />
          </View>
        )}
      </ScrollView>
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
    </SafeAreaView>
  );
};

const QuestionBox = (props: {
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

export default IntentionScreen;
