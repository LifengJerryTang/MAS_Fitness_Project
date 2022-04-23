import {VStack, Center, NativeBaseProvider, Select, Text, Box, StatusBar, Button} from "native-base";
import {StyleSheet} from 'react-native';
import {getDataFromDatabase} from "../../firebase/FirebaseAPI";
import Header from "../../components/ui/Header";
import React, { useState, useEffect } from 'react';


const WorkoutList = (props) => {

    const goToWorkout = () => {
        const workoutObject = props.workouts.filter((theWorkout) => theWorkout.name === workout)[0];
        console.log(workoutObject)
        props.navigation.navigate('SingleWorkout', {workoutObject})
    }

    const [workout, setWorkout] = useState("");

    return (
        <VStack space={100} marginTop={100}>
            <Center>
                <Select
                    placeholder="Please choose an workout!"
                    selectedValue={workout}
                    width={300}
                    onValueChange={(item) => setWorkout(item)}
                >
                    {
                        props.workouts.map((exercise) => {
                            return (
                                <Select.Item label={exercise.name} value={exercise.name} />
                            )
                        })
                    }
                </Select>
            </Center>

            <Button
                onPress={() => goToWorkout()}
                title="Start workout"
                style={styles.ButtonContainer}>
                <Text style={styles.ButtonText}>{"Start workout"}</Text>
            </Button>
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
                <Text fontSize={"2xl"} textAlign={"center"} bold color={"primary.600"}
                    marginTop={10}>
                    Hello. Please choose an workout
                </Text>
                <WorkoutList workouts={workouts} navigation={props.navigation}/>
            </VStack>

        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    // ...
    ButtonContainer: {
      elevation: 30,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 30,
      paddingHorizontal: 12,
        marginHorizontal: 55,
    },

    ButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });

export default Workouts;
