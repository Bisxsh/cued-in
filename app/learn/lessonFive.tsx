import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import Clock from '../../assets/mascots/clock.svg';

import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import ThemedText from '~/components/ThemedText';
import LightningBox from '~/components/learn/LightningBox';
import Pager from '~/components/learn/Pager';
import ProgressBar from '~/components/learn/ProgressBar';
import { StoreType, useStore } from '~/store/store';

const LessonFive = () => {
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
        <Heading svg={<Clock width={140} height={120} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">How Long</ThemedText>
            <ThemedText className="text-5xl font-semibold">It Really</ThemedText>
            <ThemedText className="text-5xl font-semibold">Takes</ThemedText>
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
              completedLessons[4] = true;
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
        How long does it really take to form a habit?{`\n\n`}You've probably heard it takes 21 days
        to form a habit. It's a nice idea—but not quite true.{`\n\n`}In reality, the time it takes
        to form a habit varies widely depending on the person, the behavior, and the context. A
        well-known study from University College London found that, on average, it takes{' '}
        <ThemedText className="font-bold">66 days</ThemedText> for a new habit to feel automatic.
        {`\n\n`}Some habits form faster, like drinking a glass of water after waking up, and others
        take longer, like going for a run every morning. And that's okay!{`\n\n`}The point isn't to
        hit a magic number. The point is to show up consistently. Habits are built through{' '}
        <ThemedText className="font-bold">repetition</ThemedText>, not perfection.{`\n\n`}Here's
        what helps:{`\n\n`}- Keep the habit small and manageable.{`\n\n`}- Anchor it to an existing
        routine (see: habit stacking).{`\n\n`}- Be patient with the process. Missing a day won't
        ruin your progress—it's about the long-term trend.{`\n\n`}So instead of counting the days,
        count your reps until eventually, it becomes part of who you are.
      </ThemedText>
    </View>
  );
};

const PageTwo = () => {
  return (
    <View className="mt-8 h-full flex-1 gap-y-4">
      <ThemedText className="text-2xl font-light">
        Habit formation takes time, and it's different for everyone. What really matters isn't the
        number of days, but how often you show up. Habits are built through repetition, not
        perfection.
      </ThemedText>
      <LightningBox>
        <ThemedText className="w-[85%] text-xl">
          Habit formation averages around <ThemedText className="font-bold">66 days</ThemedText>,
          but can vary depending on the habit
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          <ThemedText className="font-bold">Consistency</ThemedText> matters more than hitting a
          specific number
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          <ThemedText className="font-bold">Start small</ThemedText>, anchor it to routines, and
          stay patient
        </ThemedText>
      </LightningBox>
    </View>
  );
};

export default LessonFive;
