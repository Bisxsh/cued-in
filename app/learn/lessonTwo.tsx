import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import Book from '../../assets/mascots/book.svg';

import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import ThemedText from '~/components/ThemedText';
import LightningBox from '~/components/learn/LightningBox';
import Pager from '~/components/learn/Pager';
import ProgressBar from '~/components/learn/ProgressBar';
import { StoreType, useStore } from '~/store/store';

const LessonTwo = () => {
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
        <Heading svg={<Book width={160} height={120} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">Context</ThemedText>
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
              completedLessons[1] = true;
              console.log(completedLessons);
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
        Ever noticed how certain environments or times of day seem to trigger certain behaviors?
        That's no accident, those are{' '}
        <ThemedText className="font-bold color-accent">context cues</ThemedText> at work.{'\n\n'}
        Context cues are <ThemedText className="font-bold color-primary">signals</ThemedText> in
        your environment that prompt your brain to initiate a habit. They can be anything: a
        location, a time, a mood/feeling, a person, or even an action you just completed.{'\n\n'}For
        example, seeing snacks on a table might make you want to eat them. Changing into your
        pajamas can cue you to get into bed.{'\n\n'}Over time, your brain links these cues to
        specific behaviors. The more a behaviour is repeated{' '}
        <ThemedText className="font-bold color-primary">consistently</ThemedText> to a{' '}
        <ThemedText className="font-bold color-accent">stable cue</ThemedText>, the more
        <ThemedText className="font-bold color-primary"> automatic</ThemedText> the habit becomes.
        {'\n\n'}This is why context is so important when trying to build new habits. Want to start
        journaling every night? Leave your journal on your pillow. Want to drink more water? Keep a
        bottle on your desk.{'\n\n'}By designing your environment to support the habit, you're
        giving your brain a consistent nudge in the right direction.
        {'\n\n'}In short, habits don't just form in your mind—they form in context. Master the cues,
        and you're halfway to mastering the habit.
      </ThemedText>
    </View>
  );
};

const PageTwo = () => {
  return (
    <View className="mt-8 h-full flex-1 gap-y-4">
      <ThemedText className="text-2xl font-light">
        Context cues are an integral component of habits. You can now explore how context cues can
        help you build or break habits in the upcoming lessons!
      </ThemedText>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Context cues are <ThemedText className="font-bold color-accent">signals</ThemedText> in
          your environment that prompt habitual behaviour
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[85%] text-xl">
          Repeating a behaviour <ThemedText className="font-bold">consistently</ThemedText> to a{' '}
          <ThemedText className="font-bold text-accent">stable cue</ThemedText> makes it more
          automatic (and more habitual)
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Designing your environment with{' '}
          <ThemedText className="font-bold text-accent">supportive cues</ThemedText> for your habit
          can help form it quicker
        </ThemedText>
      </LightningBox>
    </View>
  );
};

export default LessonTwo;
