import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import checkUserLoggedIn from './hooks/checkUserLoggedIn';
import Navigation from './navigation';
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const userLoggedIn = checkUserLoggedIn();

  const app = <Navigation colorScheme={colorScheme} />;
  const login = <LoginScreen/>;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          {userLoggedIn ? app : login}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
