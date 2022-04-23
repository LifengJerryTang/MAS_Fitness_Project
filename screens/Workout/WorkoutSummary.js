import {Center, HStack, IconButton, NativeBaseProvider, Text, VStack} from "native-base";
import DialogBox from "../../components/ui/DialogBox";
import {Image} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";

const WorkoutSummary = (props) => {

    const {workoutDuration, caloriesBurned} = props.route.params;

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3"
                    _light={{
                        bg: "white",
                    }}
            >
                <VStack space={5} alignItems="center">
                    <Text fontSize={"3xl"} bold color={"primary.600"} marginBottom={5}>
                        Workout Summary
                    </Text>
                    <Image
                        style={{width: 200, height: 200}}
                        source={{uri: `https://i.pinimg.com/originals/f9/8f/c2/f98fc2fc9a9e290580817a3ab118f593.gif`}}/>
                    <Text fontSize={"2xl"} >
                        Duration: {workoutDuration}
                    </Text>
                    <Text fontSize={"2xl"}>
                        Calories Burned: {caloriesBurned}
                    </Text>
                    <Text fontSize={"2xl"} color={"secondary.500"} bold>
                        Health Boost: +{caloriesBurned} pts
                    </Text>

                    <IconButton
                        key={"home button"}
                        marginTop={5}
                        borderRadius="full"
                        p={30}
                        size={"lg"}
                        colorScheme="success" variant={"solid"} _icon={{
                        as: AntDesign,
                        name: "home"}}
                        onPress={() => props.navigation.navigate("BottomTabNavScreens")}
                    />
                </VStack>
            </Center>
        </NativeBaseProvider>
    )
}

export default WorkoutSummary;
