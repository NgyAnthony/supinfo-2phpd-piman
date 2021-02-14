import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/ui/useCachedResources';
import useColorScheme from './hooks/ui/useColorScheme';
import Navigation from './navigation';
import getTokenBearerName from "./hooks/auth/getTokenBearerName";
import {Text, View} from "./components/Themed";
import {Button, Image, StyleSheet, TextInput} from "react-native";

/**
 * AuthContext is used to provide a memo that can be called from screens
 */
const AuthContext = React.createContext({});

//region Login - Main screen
export function LoginScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    // @ts-ignore
    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('./assets/images/supinfo-logo-2020-quadri-png.png')}
            />
            <Text style={styles.title}>Bienvenue sur Todolist</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={{ justifyContent:"center"}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <Button
                title="Se connecter"
                onPress={() => signIn({email, password})}
            />
        </View>
    );
}
//endregion

//region Login - Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    logo: {
        width: 150,
        height: 150
    },
    textInput: {
        height: 50,
        width: 250,
    },
});
//endregion

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

  const app = <Navigation colorScheme={colorScheme} userToken={state.token}/>;

  React.useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
          let userToken;

          try {
              userToken = await AsyncStorage.getItem('@bearer_token');
          } catch (e) {
              // Restoring token failed
          }

          // After restoring token, we may need to validate it in production apps

          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
          console.log(userToken);
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
          signOut: () => dispatch({ type: 'SIGN_OUT' }),
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
                  (<LoginScreen/>) : app
              }
              <StatusBar />
          </SafeAreaProvider>
      </AuthContext.Provider>
    );
  }
}
