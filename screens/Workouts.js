import React from "react";
import { VStack, Center, NativeBaseProvider } from "native-base";

const WorkoutList = () => {
    return (<VStack space={4} alignItems="center">
                <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3} />
                <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3} />
                <Center w="64" h="20" bg="indigo.700" rounded="md" shadow={3} />
            </VStack>);
}

const Workouts = () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <WorkoutList/>
            </Center>
        </NativeBaseProvider>
    );
}

export default Workouts;
