import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import Changes from '../../assets/mascots/changes.svg';

import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import ThemedText from '~/components/ThemedText';
import LightningBox from '~/components/learn/LightningBox';
import Pager from '~/components/learn/Pager';
import ProgressBar from '~/components/learn/ProgressBar';
import { StoreType, useStore } from '~/store/store';

const LessonEight = () => {
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
        <Heading svg={<Changes width={140} height={160} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">Life</ThemedText>
            <ThemedText className="text-5xl font-semibold">Changes</ThemedText>
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
              completedLessons[7] = true;
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
        Big life changes—like moving house, starting a new job, or beginning university—can feel
        overwhelming. But they also present a powerful opportunity to break old habits and form new
        ones.{`\n\n`}This is what researchers call a{' '}
        <ThemedText className="font-bold color-accent">life discontinuity</ThemedText>—a moment when
        the routines, environments, and cues that usually drive our habits are disrupted. When those
        familiar triggers are removed, habits lose their automatic pull, and we're more open to
        change.
        {`\n\n`}In a 2016 study, psychologist Bas Verplanken tested this idea through what's called
        the <ThemedText className="font-bold">habit discontinuity hypothesis</ThemedText>. The
        research found that people who had recently moved were significantly more responsive to
        interventions promoting sustainable behaviors, compared to those whose routines were stable.
        Why? Because their habits were already “unfrozen”—their behavior wasn't being driven by the
        same automatic cues as before.{`\n\n`}
        You've probably experienced this yourself as supermarkets do this all the time! Ever walked
        into your regular grocer and all the items have been shuffled about? This is done to{' '}
        <ThemedText className="font-bold">disrupt </ThemedText>
        people's habitual routine, encouraging them to explore more in hopes of buying something
        they usually wouldn't.{`\n\n`}This insight doesn't just apply to environmental
        behaviors—it's true for health and wellbeing habits, too. If you're in a transition period,
        it's the perfect time to reset.
        {`\n\n`}Here's how to use it:{`\n`}- Take advantage of the fresh start—set{' '}
        <ThemedText className="font-bold">intentions</ThemedText> before new routines settle in.
        {`\n`}- Be mindful of <ThemedText className="font-bold">new cues</ThemedText>. They'll shape
        the habits that follow.
        {`\n`}- Use small, <ThemedText className="font-bold">intentional</ThemedText> actions to
        build the identity you want in your new context.
        {`\n\n`}Life changes don't just disrupt habits, they create{' '}
        <ThemedText className="font-bold">space</ThemedText> to design better ones. Lean into it.
      </ThemedText>
    </View>
  );
};

const PageTwo = () => {
  return (
    <View className="mt-8 h-full flex-1 gap-y-4">
      <ThemedText className="text-2xl font-light">
        Big changes shake up your routines, and that's your window of opportunity. When old cues
        disappear, you're more open to doing things differently. Use transitions to reset, reframe,
        and build habits that truly serve you.
      </ThemedText>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Life changes <ThemedText className="font-bold">disrupt</ThemedText> automatic habits and
          open the door for new ones
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[85%] text-xl">
          Set <ThemedText className="font-bold">intentions</ThemedText> before new routines settle
          in
        </ThemedText>
      </LightningBox>
      <LightningBox>
        <ThemedText className="w-[90%] text-xl">
          Use small, <ThemedText className="font-bold">mindful</ThemedText> actions to build your
          identity in the new context
        </ThemedText>
      </LightningBox>
    </View>
  );
};

export default LessonEight;
