import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/ui/useColorScheme';
import {BottomTabParamList, AccueilParamList, ListesParamList, ParametresParamList} from '../types';
import AccueilScreen from "../screens/AccueilScreen";
import ListesScreen from "../screens/ListesScreen";
import ParametresScreen from "../screens/ParametresScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Accueil"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Accueil"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Listes"
        component={ListesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Paramètres"
        component={ParametresNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AccueilStack = createStackNavigator<AccueilParamList>();

function TabOneNavigator() {
  return (
    <AccueilStack.Navigator>
      <AccueilStack.Screen
        name="AccueilScreen"
        component={AccueilScreen}
        options={{ headerTitle: 'Accueil' }}
      />
    </AccueilStack.Navigator>
  );
}

const ListesStack = createStackNavigator<ListesParamList>();

function ListesNavigator() {
  return (
    <ListesStack.Navigator>
      <ListesStack.Screen
        name="ListesScreen"
        component={ListesScreen}
        options={{ headerTitle: 'Mes listes' }}
      />
    </ListesStack.Navigator>
  );
}

const ParametresStack = createStackNavigator<ParametresParamList>();

function ParametresNavigator() {
    return (
        <ParametresStack.Navigator>
            <ParametresStack.Screen
                name="ParametresScreen"
                component={ParametresScreen}
                options={{ headerTitle: 'Paramètres' }}
            />
        </ParametresStack.Navigator>
    );
}
