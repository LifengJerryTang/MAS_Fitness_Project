import React, {useEffect, useState} from "react";
import {VStack, Center, NativeBaseProvider, ScrollView, Text, Box, StatusBar} from "native-base";
import { TouchableOpacity } from 'react-native';
import Card from '../../components/ui/Card'
import {getDataFromDatabase} from "../../firebase/FirebaseAPI";
import Header from "../../components/ui/Header";

const WorkoutList = (props) => {

    const goToWorkout = (workoutName, workoutGif) => {
        props.navigation.navigate('SingleWorkout', {workoutName, workoutGif})
    }

    return (
        <VStack
            flex={1}
            _light={{
                bg: "white",
            }}
            _dark={{
                bg: "customGray",
            }}
        >
            <Box
                px={{
                    base: "4",
                    md: "8",
                }}
                pt={{
                    base: "4",
                    md: "3",
                }}
                pb={{
                    base: "5",
                    md: "3",
                }}
                borderBottomWidth={{
                    md: "1",
                }}
                _dark={{
                    bg: "coolGray.900",
                    borderColor: "coolGray.700",
                }}
                _light={{
                    bg: {
                        base: "primary.900",
                        md: "white",
                    },
                    borderColor: "coolGray.200",
                }}
            >
                <Header title={"Workouts"}/>

            </Box>
            <ScrollView mt={5}>
                <VStack space={4} alignItems="center">
                    {props.workouts.map((workout) => {
                        return <TouchableOpacity key={workout.name}
                                                 onPress={() => goToWorkout(workout.name, workout.gif)}
                        >
                            <Card
                                imageUrl={workout.imageUrl}
                                title={workout.name}
                                description={workout.description}/>
                        </TouchableOpacity>

                    })}
                </VStack>
            </ScrollView>

        </VStack>

         );
}

const Workouts = (props) => {

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        // Before mounting any components, grab all the workouts from firebase first
      getDataFromDatabase("/workouts").then((allWorkouts) => {
          setWorkouts(allWorkouts);
      })
    }, []);

    return (
        <NativeBaseProvider>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <Box
                safeAreaTop
                _light={{
                    bg: "primary.900",
                }}
                _dark={{
                    bg: "coolGray.900",
                }}
            />
            <WorkoutList workouts={workouts} navigation={props.navigation}/>
        </NativeBaseProvider>
    );
}

export default Workouts;
