import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Workouts from "./screens/Workout/Workouts";
import Pet from "./screens/Pet/Pet";
import SingleWorkout from "./screens/Workout/SingleWorkout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SignIn from "./screens/SignIn/SignIn"
import SignUp from "./screens/SignUp/SignUp"
import WorkoutHistory from "./screens/WorkoutHistory/WorkoutHistory";
import WorkoutStats from "./screens/WorkoutStats/WorkoutStats";
import EnterMoreInfo from "./screens/EnterMoreInfo/EnterMoreInfo";
import {useEffect} from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';

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

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        //
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        //
        //setReminderTimer();
        //
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    })

    const setReminderTimer = () => {
        if (expoPushToken) {
            setInterval(() => sendPushNotification(expoPushToken), 1000);
        }
    }

    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
    async function sendPushNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

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
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
