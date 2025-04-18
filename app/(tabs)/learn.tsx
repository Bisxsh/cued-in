import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import Teach from '../../assets/mascots/teach.svg';

import Heading from '~/components/Heading';
import { ScreenContent } from '~/components/ScreenContent';
import Separator from '~/components/Separator';
import ThemedText from '~/components/ThemedText';
import LearnBox from '~/components/learn/LearnBox';
import { StoreType, useStore } from '~/store/store';

export default function Learn() {
  const { completedLessons } = useStore((state: StoreType) => ({
    completedLessons: state.completedLessons,
  }));

  return (
    <SafeAreaView className="relative mx-6 mt-4 h-full flex-1">
      <ScrollView className="flex-1">
        <Heading svg={<Teach width={160} height={120} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">Habit</ThemedText>
            <ThemedText className="text-5xl font-semibold">Theory</ThemedText>
          </View>
        </Heading>
        <View className="h-full flex-1">
          <Separator text="INTRO" className="mt-6" />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_1.png')}
            title="What are Habits?"
            isComplete={completedLessons[0]}
            href="/learn/lessonOne"
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_2.png')}
            title="Context Cues"
            isComplete={completedLessons[1]}
            href="/learn/lessonTwo"
          />
          <Separator text="GETTING INTO IT" className="mt-6" />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_3.png')}
            title="Identifying Context Cues"
            isComplete={completedLessons[2]}
            href="/learn/lessonThree"
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_4.png')}
            title="Breaking Bad Habits"
            isComplete={completedLessons[3]}
            href="/learn/lessonFour"
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_5.png')}
            title="How Long it Really Takes"
            isComplete={completedLessons[4]}
            href="/learn/lessonFive"
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_6.png')}
            title="Missing a Day"
            isComplete={completedLessons[5]}
            href="/learn/lessonSix"
          />
          <Separator text="ADVANCED TECHNIQUES" className="mt-6" />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_7.png')}
            title="Habit Stacking"
            isComplete={completedLessons[6]}
            href="/learn/lessonSeven"
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_8.png')}
            title="Life Discontinuities"
            isComplete={completedLessons[7]}
            href="/learn/lessonEight"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
