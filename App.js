import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import Workouts from "./screens/Workout/Workouts";
import Pet from "./screens/Pet";
import SingleWorkout from "./screens/Workout/SingleWorkout";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavScreen = () => {
    return <Tab.Navigator initialRouteName="Workouts"
                          tabBarOptions={{
                              style: {
                                  position: 'absolute',
                                  bottom: 25,
                                  left: 20,
                                  right: 20,
                                  elevation: 0,
                                  backgroundColor: '#ffffff',
                                  borderRadius: 15,
                                  height: 90
                              }
                          }}
                           screenOptions={{
                               header: () => null
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
    </Tab.Navigator>
}

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="BottomTabNavScreens"
                           screenOptions={{
                               header: () => null
                           }}
          >
              <Stack.Screen
                  name="BottomTabNavScreens"
                  component={BottomTabNavScreen}
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
