import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/ui/useCachedResources';
import useColorScheme from './hooks/ui/useColorScheme';
import Navigation from './navigation';
import getTokenBearerName from "./hooks/auth/getTokenBearerName";
import {LoginScreen} from "./screens/LoginScreen";

/**
 * AuthContext is used to provide a memo that can be called from screens
 */
const AuthContext = React.createContext({});

// @ts-ignore
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

    /**
     * Reducer to manage events
     */
  const [state, dispatch] = React.useReducer(
      // @ts-ignore
      (prevState, action) => {
          switch (action.type) {
              case 'RESTORE_TOKEN':
                  return {
                      ...prevState,
                      userToken: action.token,
                      isLoading: false,
                  };
              case 'SIGN_IN':
                  return {
                      ...prevState,
                      isSignout: false,
                      userToken: action.token,
                  };
              case 'SIGN_OUT':
                  return {
                      ...prevState,
                      isSignout: true,
                      userToken: null,
                  };
          }
      },
      {
          isLoading: true,
          isSignout: false,
          userToken: null,
      }
  );

    /**
     * Main navigation that leads to the Application once logged in
     */
  const app = <Navigation colorScheme={colorScheme} authContext={AuthContext}/>;

    /**
     * Check if bearer token is already persisted and store it into our reducer
     */
  React.useEffect(() => {
      const bootstrapAsync = async () => {
          let userToken;

          try {
              userToken = await AsyncStorage.getItem('@bearer_token');
          } catch (e) {
              // Restoring token failed
          }
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      };
      bootstrapAsync();
  }, []);

    /**
     * Login a user, set the bearer token inside AsyncState and into current State with Dispatch
     * @param email
     * @param password
     * @param deviceName
     */
  const login = (email: string, password: string, deviceName: string) => {
      console.log(email);
      console.log(password);
      console.log(deviceName);
      (async () => {
          const rawResponse = await fetch('http://127.0.0.1:8000/api/token', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: email,
                  password: password,
                  device_name: deviceName
              })
          });
          if(rawResponse.ok){
              // Get token
              const token = await rawResponse.text();

              // Persist token
              await AsyncStorage.setItem('@bearer_token', token).then(() =>{
                      dispatch({ type: 'SIGN_IN', token: token })
                      console.log(token)
                  }
              )
          }
      })();
  }

    /**
     * Remove bearer token, used on logout
     */
  const removeBearerToken = async () => {
      try {
          await AsyncStorage.removeItem('@bearer_token')
      } catch (e) {
          // saving error
      }
  }

    /**
     * Get the name of the device
     */
  const deviceName = getTokenBearerName();

    /**
     * Memo of AuthContext for login, logout and register
     */
  const authContext = React.useMemo(
      () => ({
          // @ts-ignore
          signIn: async data => {
              login(data.email, data.password, deviceName)
          },
          signOut: () => {
              removeBearerToken();
              dispatch({ type: 'SIGN_OUT' });
              console.log("HEEEEREEE")
              console.log(state.userToken)
          },
          // @ts-ignore
          signUp: async data => {
              // register
              // login
          },
      }),
      []
  );

    /**
     * Show app or login screen if user is logged in (bearer token is here)
     */
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthContext.Provider value={authContext}>
          <SafeAreaProvider>
              {state.userToken == null ?
                  (<LoginScreen AuthContext={AuthContext}/>) : app
              }
              <StatusBar />
          </SafeAreaProvider>
      </AuthContext.Provider>
    );
  }
}
