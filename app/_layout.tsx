import { Stack } from 'expo-router';
import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ presentation: 'modal', title: 'Welcome!', headerBackVisible: false }}
        />
        <Stack.Screen name="create/create" options={{ title: 'Start a new Habit' }} />
        <Stack.Screen name="create/intention" options={{ title: 'Start a new Habit' }} />
        <Stack.Screen
          name="learn/lessonOne"
          options={{ title: 'What are Habits', headerShown: false }}
        />
        <Stack.Screen
          name="learn/lessonTwo"
          options={{ title: 'Context Cues', headerShown: false }}
        />
        <Stack.Screen
          name="learn/lessonThree"
          options={{ title: 'Identifying Cues', headerShown: false }}
        />
        <Stack.Screen
          name="learn/lessonFour"
          options={{ title: 'Breaking Bad Habits', headerShown: false }}
        />
        <Stack.Screen
          name="learn/lessonFive"
          options={{ title: 'How Long It Really Takes', headerShown: false }}
        />
        <Stack.Screen
          name="learn/lessonSix"
          options={{ title: 'Missing a Day', headerShown: false }}
        />
        <Stack.Screen
          name="learn/lessonSeven"
          options={{ title: 'Habit Stacking', headerShown: false }}
        />
        <Stack.Screen
          name="learn/lessonEight"
          options={{ title: 'Life Discontinuities', headerShown: false }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
