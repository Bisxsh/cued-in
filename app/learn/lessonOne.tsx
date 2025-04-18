import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import Reading from '../../assets/mascots/reading.svg';

import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import ThemedText from '~/components/ThemedText';
import LightningBox from '~/components/learn/LightningBox';
import Pager from '~/components/learn/Pager';
import ProgressBar from '~/components/learn/ProgressBar';
import { StoreType, useStore } from '~/store/store';

const LessonOne = () => {
  const [pageNum, setPageNum] = useState(1);
  const maxPageNum = 2;
  const progress = (pageNum / maxPageNum) * 100;
  const navigation = useNavigation();

  const { completedLessons, setCompletedLessons, setCompletedLessonsCount } = useStore(
    (state: StoreType) => ({
      completedLessons: state.completedLessons,
      setCompletedLessons: state.setCompletedLessons,
      setCompletedLessonsCount: state.setCompletedLessonsCount,
    })
  );

  return (
    <SafeAreaView className="relative mx-6 mt-4 h-full flex-1 bg-background">
      <ScrollView className="flex-1">
        <ProgressBar progress={progress} />
        <Heading svg={<Reading width={160} height={120} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">What are</ThemedText>
            <ThemedText className="text-5xl font-semibold">Habits</ThemedText>
          </View>
        </Heading>
        {pageNum === 1 && <PageOne />}
        {pageNum === 2 && <PageTwo />}
        <Pager pageNum={pageNum} maxNum={maxPageNum} setPageNum={setPageNum} />
        {pageNum === maxPageNum && (
          <Button
            title="Finish Lesson"
            className="rounded-md bg-primary px-5 py-3 shadow-sm"
            textClassName="font-light"
            onPress={() => {
              navigation.goBack();
              completedLessons[0] = true;
              const lessonsComplete = completedLessons.filter((lesson) => lesson === true).length;
              setCompletedLessonsCount(lessonsComplete);
              setCompletedLessons(completedLessons);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const PageOne = () => {
  return (
    <View className="mt-8 h-full flex-1">
      <ThemedText className="text-xl font-light">
        Habits are the small decisions and actions we repeat{' '}
        <ThemedText className="font-bold">regularly</ThemedText>
        —often without even thinking about them. From brushing your teeth in the morning to checking
        your phone at night, habits shape much of our daily lives.{'\n\n'}Because so much of our day
        is driven by habits, they have a powerful impact on our health, productivity, and overall
        wellbeing. Good habits help us move closer to our goals with minimal mental effort. Bad
        habits, on the other hand, can silently pull us in the opposite direction.{'\n\n'}Within
        psychology, habits are defined as{' '}
        <ThemedText className="font-bold color-primary">automatic responses </ThemedText>
        to <ThemedText className="font-bold color-accent">contextual cues</ThemedText> acquired
        through consistent and repeated performance of the behaviour when stimulated by the cue in
        the past.{'\n\n'}This means that when a behaviour is repeated in a consistent context (like
        drinking water every time you sit at your desk), your brain begins to automate it.
        {'\n\n'}Not all habits are created equal. Some are helpful (like daily exercise), while
        others may hold us back (like late-night snacking).
      </ThemedText>
    </View>
  );
};

const PageTwo = () => {
  return (
    <View className="mt-8 h-full flex-1 gap-y-4">
      <ThemedText className="text-2xl font-light">
        Understanding how habits work is the first step toward using them to your advantage.{'\n\n'}
        In the next few lessons, we'll dive deeper into context cues and why they're so important
        for habits!
      </ThemedText>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Habits can have a <ThemedText className="font-bold">strong </ThemedText>impact on our
          health, productivity and wellbeing
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[85%] text-xl">
          Habits are automatic responses to{' '}
          <ThemedText className="font-bold text-accent">contextual cues </ThemedText>
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Consistently repeating a behaviour in a{' '}
          <ThemedText className="font-bold">consistent</ThemedText> context builds habits
        </ThemedText>
      </LightningBox>
    </View>
  );
};

export default LessonOne;
