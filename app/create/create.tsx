import Flex from '@assets/mascots/flex.svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { COLOURS, HABITS } from '~/Constants';
import { Habit, HabitOption } from '~/Types';
import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import Separator from '~/components/Separator';
import ThemedText from '~/components/ThemedText';
import ReanimatedCheckbox from '~/components/index/Checkbox';
import { StoreType, useStore } from '~/store/store';

const CreateScreen = () => {
  const [active, setActive] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  const { setHabitBeingCreated } = useStore((state: StoreType) => ({
    setHabitBeingCreated: state.setHabitBeingCreated,
  }));

  return (
    <SafeAreaView className="relative mx-6 h-full flex-1">
      <ScrollView className="flex-1">
        <Heading svg={<Flex width={120} height={144} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-4xl font-semibold">Pick Your</ThemedText>
            <View className="flex-row">
              <ThemedText className="text-4xl font-semibold color-primary">Daily</ThemedText>
              <ThemedText className="text-4xl font-semibold"> Habit</ThemedText>
            </View>
          </View>
        </Heading>
        <View className="h-full flex-1">
          {HABITS.map((habit) => (
            <View key={habit.id}>
              {habit.id === 1 && <Separator text="BUILD" className="mt-8" />}
              {habit.id === 4 && <Separator text="BREAK" className="mt-8" />}
              <TouchableOpacity
                key={habit.id}
                className="relative mt-4 w-full flex-row items-center rounded-md border border-primary p-4"
                onPress={() => setActive(habit.id)}>
                <HabitChoice habit={habit} active={active} setActive={setActive} />
                <ThemedText className="sml-4 max-w-[90%] flex-1 text-xl">{habit.title}</ThemedText>
                {habit.id === 1 && (
                  <TouchableOpacity
                    className="absolute right-0 top-0 mr-2 mt-2"
                    onPress={() => setShowInfo(true)}>
                    <MaterialIcons size={32} name="info" color={COLOURS.primary} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Link
          href="/create/intention"
          asChild
          onPress={() => setHabitBeingCreated(HABITS.find((h) => h.id === active) as Habit)}>
          <Button title="Next" className="my-4 rounded-lg bg-primary p-5 shadow-sm" />
        </Link>
      </ScrollView>
      <InfoModal
        visible={showInfo}
        setVisible={setShowInfo}
        title="About"
        buttonText="Close"
        body={ABOUT_BODY}
      />
    </SafeAreaView>
  );
};

const HabitChoice = (props: {
  habit: HabitOption;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <ReanimatedCheckbox
      isChecked={props.habit.id === props.active}
      onPress={() => props.setActive(props.habit.id)}
    />
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

const ABOUT_BODY = (
  <ThemedText>
    {`20 minutes of moderate-intensity aerobic physical activity is described as activity makes you feel warmer, breathe harder and your heart beat faster. 
It can include (but is not limited to):
- Brisk walking
- Swimming
- Organised sports
- Household jobs like cleaning, vacuuming or mopping

10 minutes of vigorous-intensity aerobic physical activity is described as the most intense. When you do it, you won't be able to say more than a few words without pausing for breath. It can include (but is not limited to):
- Jogging
- High Intensity Interval Training (HIIT)
- Aerobics

More information is available at:`}{' '}
    <Link
      href="https://www.heartfoundation.org.nz/wellbeing/being-active/physical-activity"
      style={{ color: 'blue' }}
      className="">
      https://www.heartfoundation.org.nz/wellbeing/being-active/physical-activity
    </Link>
    {`\n\nYou may pick your own activity for this habit if you feel it matches the description provided.
  `}
  </ThemedText>
);

export default CreateScreen;
