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
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="create/create" options={{ title: 'Start a new Habit' }} />
        <Stack.Screen name="create/intention" options={{ title: 'Start a new Habit' }} />
        <Stack.Screen
          name="learn/lessonOne"
          options={{ title: 'What are Habits', headerShown: false }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
