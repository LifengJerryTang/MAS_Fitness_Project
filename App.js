import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Workouts from "./screens/Workout/Workouts";
import Pet from "./screens/Pet";
import SingleWorkout from "./screens/Workout/SingleWorkout";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Workout"
                         screenOptions={{
                           header: () => null
                         }}
        >
          <Stack.Screen
              name="Workouts"
              component={Workouts}
          />
            <Stack.Screen
                name="SingleWorkout"
                component={SingleWorkout}
            />
          <Stack.Screen
              name="Pet"
              component={Pet}/>
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
