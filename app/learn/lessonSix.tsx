import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import Stopwatch from '../../assets/mascots/stopwatch.svg';

import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import ThemedText from '~/components/ThemedText';
import LightningBox from '~/components/learn/LightningBox';
import Pager from '~/components/learn/Pager';
import ProgressBar from '~/components/learn/ProgressBar';
import { StoreType, useStore } from '~/store/store';

const LessonSix = () => {
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
        <Heading svg={<Stopwatch width={120} height={160} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">Missing A</ThemedText>
            <ThemedText className="text-5xl font-semibold">Day</ThemedText>
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
              completedLessons[5] = true;

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
        Missed a workout? Skipped journaling? Forgot to meditate? It happens—and it's totally
        normal.{`\n\n`}The truth is: missing a day won't break your habit. What matters most is what
        you do next.{`\n\n`}Here's how to bounce back without the guilt:{`\n\n`}
        <ThemedText className="font-bold">Don't let it spiral</ThemedText>
        {`\n`}Missing once is a mistake. Missing twice can become the start of a new (unwanted)
        pattern. Catch it early and reset.{`\n\n`}
        <ThemedText className="font-bold">Look for the cause, not the flaw</ThemedText>
        {`\n`}Instead of beating yourself up, ask: What got in the way? Was it timing, energy,
        environment? Understanding the cause helps you plan better next time.{`\n\n`}
        <ThemedText className="font-bold">Make the next step tiny</ThemedText>
        {`\n`}If you're struggling to restart, shrink the habit. Just 1 push-up, 1 sentence, or 1
        minute. Rebuilding momentum is the goal—not perfection.{`\n\n`}
        <ThemedText className="font-bold">Focus on identity, not streaks</ThemedText>
        {`\n`}You're not building a streak, you're becoming someone who shows up—even when it's not
        perfect. That's what real progress looks like.{`\n\n`}So if you fall off track, no worries.
        Just step back on.{`\n\n`}
        Success isn't about never missing—it's about always returning.
      </ThemedText>
    </View>
  );
};

const PageTwo = () => {
  return (
    <View className="mt-8 h-full flex-1 gap-y-4">
      <ThemedText className="text-2xl font-light">
        Missed a habit? No big deal. It's not about being perfect—it's about getting back on track.
        What matters most is how you respond, not that you slipped.
      </ThemedText>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Missing once is fine—don't let it become a{' '}
          <ThemedText className="font-bold">pattern</ThemedText>
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[85%] text-xl">
          Understand what caused the miss so you can{' '}
          <ThemedText className="font-bold">adjust</ThemedText>
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Restart small. <ThemedText className="font-bold">Momentum</ThemedText> beats perfection
        </ThemedText>
      </LightningBox>
    </View>
  );
};

export default LessonSix;
