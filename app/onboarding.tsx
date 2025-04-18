import Wave from '@assets/mascots/wave.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';

import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import ThemedText from '~/components/ThemedText';
import { StoreType, useStore } from '~/store/store';

const Onboarding = () => {
  const [slide, setSlide] = useState(1);
  const { setDateStarted } = useStore((state: StoreType) => ({
    setDateStarted: state.setDateStarted,
  }));

  return (
    <SafeAreaView className="relative mx-6 mt-4 h-full flex-1 bg-background">
      <ScrollView className="flex-1">
        <Heading
          svg={<Wave width={160} height={120} />}
          className="mb-6 flex border-b-2 border-primary">
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-4xl font-semibold">Welcome To</ThemedText>
            <ThemedText className="text-5xl font-semibold color-primary">CuedIn</ThemedText>
          </View>
        </Heading>
        <View className="h-full flex-1">
          {slide == 1 && (
            <View className="flex h-full w-full items-center justify-center">
              <FirstSlide />
            </View>
          )}
          {slide == 2 && <SecondSlide />}
          {slide == 3 && <ThirdSlide />}
          {slide == 4 && <FourthSlide />}

          <View className="my-4 flex-row gap-x-4">
            {slide !== 1 && (
              <Button
                title="Back"
                className="rounded-lg bg-gray px-6 py-4 text-2xl font-semibold"
                textClassName="color-txt"
                onPress={() => {
                  if (slide > 1) setSlide((p) => p - 1);
                }}
              />
            )}
            <Button
              title={slide === 4 ? "Let's Go!" : 'Next'}
              className="flex-1 rounded-lg bg-accent px-6 py-4 text-2xl font-semibold"
              onPress={() => {
                if (slide < 4) setSlide((p) => p + 1);
                else {
                  AsyncStorage.setItem('hasLaunched', 'true');
                  setDateStarted(new Date());
                  router.replace('/home');
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const FirstSlide = (props: { className?: string }) => {
  return (
    <View className={`flex-1 items-center justify-center bg-background ${props.className}`}>
      <Image source={require('@assets/icon.png')} style={{ width: 100, height: 100 }} />
      <ThemedText className="text-center text-6xl font-semibold">Welcome to CuedIn!</ThemedText>
      <ThemedText className="mt-8 text-center text-3xl font-light color-gray">
        Your journey to better habits starts here.
      </ThemedText>
    </View>
  );
};

const SecondSlide = (props: { className?: string }) => {
  return (
    <View className={`flex-1 items-center justify-center bg-background ${props.className}`}>
      <ThemedText className="mb-6 text-center text-5xl font-semibold">Create Habits</ThemedText>

      <Image
        source={require('@assets/onboarding/Create.png')}
        style={{ width: 440, height: 440, resizeMode: 'contain' }}
      />

      <ThemedText className="mb-6 mt-6 px-4 text-center text-3xl font-light color-gray">
        Create Habits using the plus icon
      </ThemedText>
    </View>
  );
};

const ThirdSlide = (props: { className?: string }) => {
  return (
    <View className={`flex-1 items-center justify-center bg-background ${props.className}`}>
      <ThemedText className="mb-6 text-center text-5xl font-semibold">Track Progress</ThemedText>

      <Image
        source={require('@assets/onboarding/Progress.png')}
        style={{ width: 440, height: 440, resizeMode: 'contain' }}
      />

      <ThemedText className="mb-6 mt-6 px-4 text-center text-3xl font-light color-gray">
        Tap on habits to add progress, long hold to take away.
      </ThemedText>
    </View>
  );
};

const FourthSlide = (props: { className?: string }) => {
  return (
    <View className={`flex-1 items-center justify-center bg-background ${props.className}`}>
      <ThemedText className="mb-6 text-center text-5xl font-semibold">
        Report Your Progress
      </ThemedText>

      <Image
        source={require('@assets/onboarding/Report.png')}
        style={{ width: 440, height: 440, resizeMode: 'contain' }}
      />

      <ThemedText className="mb-6 mt-6 px-4 text-center text-3xl font-light color-gray">
        Report your progress in the report screen
      </ThemedText>
    </View>
  );
};

export default Onboarding;
