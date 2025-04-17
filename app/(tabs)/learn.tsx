import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import Teach from '../../assets/mascots/teach.svg';

import Heading from '~/components/Heading';
import { ScreenContent } from '~/components/ScreenContent';
import Separator from '~/components/Separator';
import ThemedText from '~/components/ThemedText';
import LearnBox from '~/components/learn/LearnBox';

export default function Learn() {
  return (
    <SafeAreaView className="relative mx-6 h-full flex-1">
      <ScrollView className="flex-1">
        <Heading svg={<Teach width={120} height={144} />} className="flex">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-xl font-semibold">Habit</ThemedText>
            <ThemedText className="text-5xl font-semibold">Theory</ThemedText>
          </View>
        </Heading>
        <View className="h-full flex-1">
          <Separator text="INTRO" className="mt-6" />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_1.png')}
            title="What are Habits?"
            isComplete={false}
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_2.png')}
            title="Context Cues"
            isComplete={false}
          />
          <Separator text="GETTING INTO IT" className="mt-6" />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_3.png')}
            title="Identifying Context Cues"
            isComplete={false}
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_4.png')}
            title="Breaking Bad Habits"
            isComplete={false}
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_5.png')}
            title="How Long it Really Takes"
            isComplete={false}
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_6.png')}
            title="Missing a Day"
            isComplete={false}
          />
          <Separator text="ADVANCED TECHNIQUES" className="mt-6" />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_7.png')}
            title="Habit Stacking"
            isComplete={false}
          />
          <LearnBox
            imagePath={require('../../assets/learn/lesson_8.png')}
            title="Life Discontinuities"
            isComplete={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
