import React, {useEffect, useState} from "react";
import { VStack, Center, NativeBaseProvider, ScrollView, Text } from "native-base";
import Card from '../components/ui/Card'
import {getDataFromDatabase} from "../firebase/FirebaseAPI";

const WorkoutList = (props) => {
    return (
            <ScrollView mt={75}>
                <VStack space={4} alignItems="center">
                    <Text bold fontSize="xl">
                        Workouts
                    </Text>
                    {props.workouts.map((workout) => {
                        return <Card
                            imageUrl={workout.imageUrl}
                            title={workout.name}
                            description={workout.description}/>
                    })}
                </VStack>
            </ScrollView>
         );
}

const Workouts = () => {

    const [workouts, setWorkouts] = useState([]);
    useEffect(() => {
      getDataFromDatabase("/workouts").then((allWorkouts) => {
          console.log(allWorkouts)
          setWorkouts(allWorkouts);
      })
    }, []);

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <WorkoutList workouts={workouts}/>
            </Center>
        </NativeBaseProvider>
    );
}

export default Workouts;
