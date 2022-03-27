import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import Workouts from "./screens/Workout/Workouts";
import Pet from "./screens/Pet";
import SingleWorkout from "./screens/Workout/SingleWorkout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SignIn from "./screens/SignIn/SignIn"
import SignUp from "./screens/SignUp/SignUp"
import WorkoutHistory from "./screens/WorkoutHistory/WorkoutHistory";
import EnterMoreInfo from "./screens/EnterMoreInfo/EnterMoreInfo";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavScreens = () => {
    return <Tab.Navigator initialRouteName="Workouts"
                           screenOptions={{
                               header: () => null,
                               tabBarActiveBackgroundColor: "#184c64",
                               tabBarActiveTintColor: "#fff"
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
