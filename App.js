import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import Workouts from "./screens/Workout/Workouts";
import Pet from "./screens/Pet/Pet";
import SingleWorkout from "./screens/Workout/SingleWorkout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SignIn from "./screens/SignIn/SignIn"
import SignUp from "./screens/SignUp/SignUp"
import WorkoutHistory from "./screens/WorkoutHistory/WorkoutHistory";
import WorkoutStats from "./screens/WorkoutStats/WorkoutStats";
import EnterMoreInfo from "./screens/EnterMoreInfo/EnterMoreInfo";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import {getCurrUserId, getDataFromDatabase, saveToDatabase} from "./firebase/FirebaseAPI";
import WorkoutSummary from "./screens/Workout/WorkoutSummary";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


const BottomTabNavScreens = () => {


    return <Tab.Navigator initialRouteName="Workouts"
                           screenOptions={{
                               header: () => null,
                               tabBarActiveBackgroundColor: "#184c64",
                               tabBarActiveTintColor: "#fff",
                           }}>
        <Tab.Screen
            name="Workouts"
            component={Workouts}
            options={{
                tabBarLabel: 'Workouts',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Pet"
            component={Pet}
            options={{
                tabBarLabel: 'Pet',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="paw" color={color} size={size} />
                ),
            }}
        />

        <Tab.Screen name="WorkoutHistory"
                    component={WorkoutHistory}
                    options={{
                        tabBarLabel: "Workout History",
                        tabBarIcon: ({ color , size }) => (
                            <MaterialCommunityIcons name="history" color={color} size={size} />
                        ),
                    }}
        />
        <Tab.Screen
            name="WorkoutStats"
            component={WorkoutStats}
            options={{
                tabBarLabel: 'Stats',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>
}


export default function App() {
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn"
                           screenOptions={{
                               header: () => null
                           }}
          >

              <Stack.Screen
                  name="SignIn"
                  component={SignIn}
              />
              <Stack.Screen
                  name="SignUp"
                  component={SignUp}
              />
              <Stack.Screen
                  name="EnterMoreInfo"
                  component={EnterMoreInfo}
              />
              <Stack.Screen
                  name="BottomTabNavScreens"
                  component={BottomTabNavScreens}
              />
              <Stack.Screen
                  name="SingleWorkout"
                  component={SingleWorkout}
              />
              <Stack.Screen
                  name="WorkoutSummary"
                  component={WorkoutSummary}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
