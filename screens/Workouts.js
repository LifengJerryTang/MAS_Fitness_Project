import React, {useEffect, useState} from "react";
import { VStack, Center, NativeBaseProvider } from "native-base";
import Card from '../components/ui/Card'
import {getDataFromDatabase} from "../firebase/FirebaseAPI";

const WorkoutList = (props) => {
    return (<VStack space={4} alignItems="center">
                {props.workouts.map((workout) => {
                    return <Card
                                imageUrl={workout.imageUrl}
                                title={workout.name}
                                description={workout.description}/>
                })}
                <Card/>
            </VStack>);
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
