import React, {useEffect, useState} from "react";
import { VStack, Center, NativeBaseProvider, ScrollView, Text } from "native-base";
import { TouchableOpacity } from 'react-native';
import Card from '../../components/ui/Card'
import {getDataFromDatabase} from "../../firebase/FirebaseAPI";

const WorkoutList = (props) => {

    const goToWorkout = (workoutName) => {
        props.navigation.navigate('SingleWorkout', {workoutName})
    }

    return (
            <ScrollView mt={75}>
                <VStack space={4} alignItems="center">
                    <Text bold fontSize="xl">
                        Workouts
                    </Text>
                    {props.workouts.map((workout) => {
                        return <TouchableOpacity key={workout.name}
                                onPress={() => goToWorkout(workout.name)}
                                >
                                    <Card
                                        imageUrl={workout.imageUrl}
                                        title={workout.name}
                                        description={workout.description}/>
                                </TouchableOpacity>

                    })}
                </VStack>
            </ScrollView>
         );
}

const Workouts = (props) => {

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
      getDataFromDatabase("/workouts").then((allWorkouts) => {
          setWorkouts(allWorkouts);
      })
    }, []);

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <WorkoutList workouts={workouts} navigation={props.navigation}/>
            </Center>
        </NativeBaseProvider>
    );
}

export default Workouts;
