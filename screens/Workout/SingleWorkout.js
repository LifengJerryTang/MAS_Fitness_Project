import React, {useEffect, useState} from "react";
import {Center, IconButton, VStack, NativeBaseProvider, Text, Button, HStack} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import {StyleSheet, Image, View} from "react-native";
import {getCurrUserId, getDataFromDatabase, saveToDatabase} from "../../firebase/FirebaseAPI";
import DialogBox from "../../components/ui/DialogBox";

const SingleWorkout = (props) => {


    const [workoutName] = useState(props.route.params.workoutObject.name);
    const [workoutGif] = useState(props.route.params.workoutObject.gif);
    const [workoutMET] = useState(props.route.params.workoutObject.MET);

    const [time, setTime] = useState({sec:0, min:0, hour:0});
    const [interv, setInterv] = useState(0);
    const [timerStarted, setTimerStarted] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        startTimer();
    }, [])

    const startTimer = () => {
        runTimer();
        setTimerStarted(true);
        setInterv(setInterval(runTimer, 1000));
    };

    let updatedS = time.sec, updatedM = time.min, updatedH = time.hour;

    const runTimer = () => {
        if(updatedM === 59){
            updatedH++;
            updatedM = 0;
        }
        if(updatedS === 59){
            updatedM++;
            updatedS = 0;
        }

        updatedS++;

        return setTime({sec:updatedS, min:updatedM, hour:updatedH});
    };

    const stopTimer = () => {
        clearInterval(interv);
        setTimerStarted(false)
    };

    const completeWorkout = (choice) => {

        if (choice !== "OK") {
            setOpenDialog(false)
            return;
        }

        const currUserId = getCurrUserId();
        const todayDate = dateOfToday();
        const userPath = `users/${currUserId}`;
        const totalWorkoutTime = `${time.hour} hrs ${time.min} mins ${time.sec} secs`;

        // Need some metadata from user for calculating calories and updating workout history
        getDataFromDatabase(userPath).then((user) => {
            let updatedHistory = []

            //Check if there's any workout histories already exist for today's date
            if (user.workoutHistory && user.workoutHistory[todayDate]) {
                updatedHistory = user.workoutHistory[todayDate];
            } else {
                user.workoutHistory = {};
                user.workoutHistory[todayDate] = [];
            }
            // Using a particular formula to calculate the calories burned
            const caloriesBurned = time.min * (workoutMET * 3.5 * (user.profileInfo.weight / 2.205)) / 200

            updatedHistory.push({
                duration: totalWorkoutTime,
                workoutName: workoutName,
                caloriesBurned: Math.round(caloriesBurned)
            })

            user.workoutHistory[todayDate] = updatedHistory;
            user.pet.health += Math.round(caloriesBurned);

            if (user.pet.health > 100) {
                user.pet.health = 100;
            }

            // save the updated workout history
            saveToDatabase(userPath, user);
            setOpenDialog(false)
            props.navigation.navigate("WorkoutSummary", {workoutDuration: totalWorkoutTime,
                                                            caloriesBurned: Math.round(caloriesBurned) });

        })

    }

    const makeMeTwoDigits = (n) => {
        return (n < 10 ? "0" : "") + n;
    }

    const displayTimer = () => {
        return `${makeMeTwoDigits(time.hour)}:${makeMeTwoDigits(time.min)}:${makeMeTwoDigits(time.sec)}`;
    }

    const dateOfToday = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    }

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3"
                    _light={{
                        bg: "white",
                    }}
            >
                <DialogBox onClose={(buttonChoice) => completeWorkout(buttonChoice)} isOpen={openDialog}
                           title={"Complete Workout"}
                           description={'If you choose to complete this workout, your results will be saved and reflected on your pet\'s health status.'}/>
                <VStack space={5} alignItems="center"
                >
                    <Image
                        style={{width: 410, height: 300}}
                        source={{uri: `${workoutGif}`}} />
                    <Text fontSize="2xl" bold
                          _light={{
                              color: "primary.600"
                          }} >
                        {workoutName + ""}
                    </Text>
                    <Text bold fontSize="6xl">
                        {displayTimer()}
                    </Text>

                    {timerStarted ?
                        <IconButton
                            onPress={stopTimer}
                            p={30}
                            borderRadius="full"
                            size={"lg"}
                            colorScheme="primary" key={"solid"} variant={"solid"} _icon={{
                            as: AntDesign,
                            name: "pause"
                        }} />
                        :
                        <HStack space={5}>
                            <IconButton
                                key={"start button"}
                                onPress={startTimer}
                                borderRadius="full"
                                p={30}
                                size={"lg"}
                                colorScheme="primary" variant={"solid"} _icon={{
                                as: AntDesign,
                                name: "play"
                            }} />
                            <IconButton
                                key={"complete button"}
                                borderRadius="full"
                                p={30}
                                size={"lg"}
                                colorScheme="success" variant={"solid"} _icon={{
                                as: AntDesign,
                                name: "check"
                            }} onPress={() => setOpenDialog(true)}/>
                        </HStack>

                    }
                </VStack>
            </Center>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: "#fff",
    },

    button: {
        borderRadius: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20
    },
});
export default SingleWorkout;
