import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import Search from '../../assets/mascots/search.svg';

import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import ThemedText from '~/components/ThemedText';
import LightningBox from '~/components/learn/LightningBox';
import Pager from '~/components/learn/Pager';
import ProgressBar from '~/components/learn/ProgressBar';
import { StoreType, useStore } from '~/store/store';

const LessonThree = () => {
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
        <Heading svg={<Search width={120} height={120} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">Identifying</ThemedText>
            <ThemedText className="text-5xl font-semibold">Cues</ThemedText>
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
              completedLessons[2] = true;

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
        As we know, every habit starts with a cue—a trigger that prompts the habitual behaviour to
        be performed. If you want to build better habits or break unhelpful ones, learning to spot
        these cues is key.{'\n\n'}Cues can be subtle and can be anything in your environment, but
        they tend to fall into five main categories:{'\n'}-{' '}
        <ThemedText className="font-bold">Time</ThemedText> - A specific time of day or part of your
        routine (e.g. "after lunch").{'\n'}- <ThemedText className="font-bold">Location</ThemedText>{' '}
        - Where you are (e.g. "when I sit at my desk").{'\n'}-{' '}
        <ThemedText className="font-bold">Emotional state</ThemedText> - How you feel (e.g. "when
        I'm stressed").{'\n'}- <ThemedText className="font-bold">Other people</ThemedText> - Who
        you're with (e.g. "when I'm with friends").{'\n'}-{' '}
        <ThemedText className="font-bold">Previous action</ThemedText> - What you just did (e.g.
        "after I check my email").{'\n\n'}To identify your cues, track your habit for a few days.
        When you do the behavior, ask yourself the following questions:
        {'\n'}-Where am I? {'\n'}-What time is it? {'\n'}-How do I feel? {'\n'}-Who's around? {'\n'}
        -What just happened?{'\n\n'}Patterns will start to emerge—and once you recognize them, you
        can plan for them.{'\n\n'}Why does this matter? Because if you can spot the cue, you can
        change the response. You can pause, disrupt the loop, or use the cue to trigger a new,
        better habit.
        {'\n\n'}Awareness is the first step to control.Know your cues, and you can shape your
        habits—on purpose.
      </ThemedText>
    </View>
  );
};

const PageTwo = () => {
  return (
    <View className="mt-8 h-full flex-1 gap-y-4">
      <ThemedText className="text-2xl font-light">
        Every habit starts with a trigger—and spotting it is the first step to change. Cues are
        often hidden in your environment, emotions, or routine. Once you notice the pattern, you can
        start to take control.
      </ThemedText>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Habits are grounded on <ThemedText className="font-bold">stable</ThemedText> cues
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[85%] text-xl">
          Cues can be <ThemedText className="font-bold text-accent">anything</ThemedText>, such as
          time, place, emotion, people and actions
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Learning to <ThemedText className="font-bold text-accent">identify</ThemedText> these cues
          lets you build or break habits with intention
        </ThemedText>
      </LightningBox>
    </View>
  );
};

export default LessonThree;
