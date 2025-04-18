import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import Stack from '../../assets/mascots/stack.svg';

import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import ThemedText from '~/components/ThemedText';
import LightningBox from '~/components/learn/LightningBox';
import Pager from '~/components/learn/Pager';
import ProgressBar from '~/components/learn/ProgressBar';
import { StoreType, useStore } from '~/store/store';

const LessonSeven = () => {
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
        <Heading svg={<Stack width={132} height={132} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">Habit</ThemedText>
            <ThemedText className="text-5xl font-semibold">Stacking</ThemedText>
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
              completedLessons[6] = true;
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
        One of the easiest ways to build a new habit? Attach it to one you already have.{`\n\n`}This
        technique is called habit stacking, and it works because your brain already trusts the
        existing habit—it's consistent, automatic, and reliable. This makes it the perfect cue to
        build the new habit on!{`\n\n`}Here's the idea: instead of trying to carve out new time or
        mental energy, you simply say, “After I do X, I'll do Y.” This is called an{' '}
        <ThemedText className="font-bold color-accent">implementation intention</ThemedText>.
        {`\n\n`}
        For example:{`\n`}- After I finish work, I'll drive straight to the gym.
        {`\n`}- After I start the coffee, I'll write one line in my journal.{`\n`}- After I close my
        laptop, I'll stretch for 30 seconds.{`\n\n`}The first habit acts as a cue for the second
        one. Over time, the two become linked in your brain, like dominoes falling—one naturally
        leads to the other.{`\n\n`}A few tips for effective stacking:{`\n`}- Choose an anchor habit
        that's already strong and <ThemedText className="font-bold">consistent</ThemedText>. A{' '}
        <ThemedText className="font-bold color-accent">stable cue</ThemedText> will make your new
        habit stick much quicker.{`\n`}- <ThemedText className="font-bold">Start small</ThemedText>{' '}
        with the new behaviour. Once it becomes a habit you can build on it later. Meditating for a
        minute will make it much easier to build the habit than going for an hour right away!{`\n`}-
        Keep it in the <ThemedText className="font-bold">same context</ThemedText> (time, place,
        environment) to strengthen the connection.{`\n\n`}
        Habit stacking removes the friction of starting from scratch. Instead, it lets you piggyback
        on momentum you already have.{`\n\n`}Small wins, chained together, lead to lasting change.
      </ThemedText>
    </View>
  );
};

const PageTwo = () => {
  return (
    <View className="mt-8 h-full flex-1 gap-y-4">
      <ThemedText className="text-2xl font-light">
        Want an easier way to start a habit? Attach it to one you already do. Habit stacking uses
        your existing routines to cue new behaviours - like dominoes, one leads to the next.
      </ThemedText>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Pair a new habit with a strong, consistent{' '}
          <ThemedText className="font-bold">anchor</ThemedText> habit
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[85%] text-xl">
          Use <ThemedText className="font-bold">implementation intentions</ThemedText> to reinforce
          them. “After I X, I'll Y”
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Habit stacking is great for piggybacking on{' '}
          <ThemedText className="font-bold">momentum</ThemedText> you already have
        </ThemedText>
      </LightningBox>
    </View>
  );
};

export default LessonSeven;
