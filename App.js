import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Workouts from "./screens/Workouts";
import Pet from "./screens/Pet";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Workouts"
                         screenOptions={{
                           header: () => null
                         }}
        >
          <Stack.Screen
              name="Workouts"
              component={Workouts}
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
