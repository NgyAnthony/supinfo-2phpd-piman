import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import hasValidBearerToken from './hooks/hasValidBearerToken';
import Navigation from './navigation';
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const validBearerToken = hasValidBearerToken();

  const app = <Navigation colorScheme={colorScheme} />;
  const login = <LoginScreen/>;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          {validBearerToken ? app : login}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
