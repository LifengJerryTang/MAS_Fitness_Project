import React, {useEffect, useState} from "react";
import {Center, IconButton, VStack, NativeBaseProvider, Text, Button, HStack} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import {StyleSheet, Image, View} from "react-native";
import LottieView from "lottie-react-native";
import {getCurrUserId, getDataFromDatabase, saveToDatabase} from "../../firebase/FirebaseAPI";
import DialogBox from "../../components/ui/DialogBox";

const SingleWorkout = (props) => {

    const [time, setTime] = useState({sec:0, min:0, hour:0});
    const [workoutName] = useState(props.route.params.workoutName);
    const [workoutGif] = useState(props.route.params.workoutGif);
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
        if(updatedM === 60){
            updatedH++;
            updatedM = 0;
        }
        if(updatedS === 60){
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
        const path = `users/${currUserId}/workoutHistory/${todayDate}`;
        const totalWorkoutTime = `${time.hour} hours ${time.min} mins ${time.sec} secs`;

        getDataFromDatabase(path).then((workoutHistory) => {
            let updatedHistory = workoutHistory

            if (!workoutHistory) {
                updatedHistory = [];
            }

            updatedHistory.push({
                duration: totalWorkoutTime,
                workoutName: workoutName
            })

            saveToDatabase(path, updatedHistory);
            setOpenDialog(false)
            props.navigation.navigate("BottomTabNavScreens");
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
                    <Text fontSize="2xl" bold color={"primary"}
                          _light={{
                              color: "primary.300"
                          }} _dark={{
                        color: "coolGray.400"}}>
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
