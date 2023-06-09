import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '../src/constants/Colors';
import { Provider } from 'react-redux';
import { store } from '../src/store';


export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const background = Colors[colorScheme ?? 'light']?.background

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Provider store={store}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{
              presentation: 'modal',
              headerShown: false
            }} />
          </Stack>
        </Provider>
      </ThemeProvider>
    </>
  );
}
