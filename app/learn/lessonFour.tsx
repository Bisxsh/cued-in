import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import Tired from '../../assets/mascots/tired.svg';

import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import ThemedText from '~/components/ThemedText';
import LightningBox from '~/components/learn/LightningBox';
import Pager from '~/components/learn/Pager';
import ProgressBar from '~/components/learn/ProgressBar';
import { StoreType, useStore } from '~/store/store';

const LessonFour = () => {
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
        <Heading svg={<Tired width={140} height={160} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">Breaking</ThemedText>
            <ThemedText className="text-5xl font-semibold">Bad</ThemedText>
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
              completedLessons[3] = true;

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
        We all have habits that we'd like to break - mindless scrolling, skipping workouts,
        excessive snacking. The first step to breaking a habit is understanding how it works.
        {'\n\n'}Most habits follow a pattern:{'\n\n'}
        <ThemedText className="font-bold">cue → routine → reward</ThemedText>
        {'\n\n'}As we now know, the cue triggers the behavior and the routine is the action.{'\n\n'}
        The reward is what your brain gets out of it. It can be comfort, a dopamine hit, or simply a
        distraction.{'\n\n'}It can be easy to think that breaking a habit is reliant on eliminating
        the urge altogether, but all you need to do is interrupt this pattern!{'\n\n'}Here's how:
        {`\n`}- <ThemedText className="font-bold">Identify the cue</ThemedText>: When does the habit
        usually happen? What's going on around you? As we discussed earlier the cue could be almost
        anything in your environment; time of day, location, mood, and even people nearby.{`\n`}-{' '}
        <ThemedText className="font-bold">Understand the reward</ThemedText>: What are you really
        getting from the habit? Are you bored? Stressed? Tired? Identifying the true reward helps
        you find better alternatives and understand why you may be reliant on the behaviour.{`\n`}-{' '}
        <ThemedText className="font-bold">Replace, don't erase</ThemedText>: Instead of just trying
        to stop the behavior, swap it with something healthier that offers a similar reward. For
        example, if you scroll your phone to relieve stress, try a quick breathing exercise or a
        short walk instead. An app like Opal can help you disrupt the cue by prompting you to
        breathe every time you open a restricted app.{'\n\n'}Change won't happen overnight and it
        will require constant effort, but every time you resist the old pattern or choose a new
        response, you weaken the habit's hold. Over time, the brain rewires.{'\n\n'}Breaking bad
        habits isn't about being perfect—it's about being consistent. Every time you resist this
        pattern, you weaken the habit's hold. Small shifts repeated often can create a big change.
      </ThemedText>
    </View>
  );
};

const PageTwo = () => {
  return (
    <View className="mt-8 h-full flex-1 gap-y-4">
      <ThemedText className="text-2xl font-light">
        Breaking a bad habit can sometimes seem impossible. But small changes can take you a long
        way.
      </ThemedText>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Bad habits often follow the{' '}
          <ThemedText className="font-bold">cue → routine → reward</ThemedText> pattern. and
          wellbeing
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[85%] text-xl">
          Identifying the <ThemedText className="font-bold">cue</ThemedText> and{' '}
          <ThemedText className="font-bold">reward</ThemedText> for your habit can help you begin to
          resist it’s automatic nature
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          <ThemedText className="font-bold">Replacing</ThemedText> the behaviour when prompted by
          the cue is a great method for breaking bad habits
        </ThemedText>
      </LightningBox>
    </View>
  );
};

export default LessonFour;
