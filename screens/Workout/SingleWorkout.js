import React, {useEffect, useState} from "react";
import {Center, IconButton, VStack, NativeBaseProvider, Text, Button, HStack} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import {StyleSheet, ImageBackground} from "react-native";

const SingleWorkout = (props) => {

    const [time, setTime] = useState({s:0, m:0, h:0});
    const [workoutName] = useState(props.route.params.workoutName);
    const [interv, setInterv] = useState();
    const [timerStarted, setTimerStarted] = useState(false);

    const start = () => {
        run();
        setTimerStarted(true);
        setInterv(setInterval(run, 1000));
    };

    let updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {
        if(updatedM === 60){
            updatedH++;
            updatedM = 0;
        }
        if(updatedS === 60){
            updatedM++;
            updatedS = 0;
        }

        updatedS++;
        return setTime({s:updatedS, m:updatedM, h:updatedH});
    };

    const stop = () => {
        clearInterval(interv);
        setTimerStarted(false)
    };

    const complete = () => {

    }

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <VStack space={10} alignItems="center">
                    <Text fontSize="5xl">
                        {workoutName}
                    </Text>

                    <Text bold fontSize="6xl">
                        {`${time.h}:${time.m}:${time.s}`}
                    </Text>

                    {timerStarted ?
                        <IconButton
                            onPress={stop}
                            p={30}
                            borderRadius="full"
                            size={"lg"}
                            colorScheme="indigo" key={"solid"} variant={"solid"} _icon={{
                            as: AntDesign,
                            name: "pause"
                        }} />
                        :
                        <HStack space={5}>
                            <IconButton
                                key={"start button"}
                                onPress={start}
                                borderRadius="full"
                                p={30}
                                size={"lg"}
                                colorScheme="indigo" key={"solid"} variant={"solid"} _icon={{
                                as: AntDesign,
                                name: "play"
                            }} />
                            <IconButton
                                key={"complete button"}
                                borderRadius="full"
                                p={30}
                                size={"lg"}
                                colorScheme="success" key={"solid"} variant={"solid"} _icon={{
                                as: AntDesign,
                                name: "check"
                            }} />
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
