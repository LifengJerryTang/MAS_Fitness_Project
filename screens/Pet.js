import React from "react";
import { VStack, Center, NativeBaseProvider, ScrollView, Text } from "native-base";
import {TouchableOpacity} from "react-native";
import Card from "../components/ui/Card";

const Pet = () => {
    return <NativeBaseProvider>
                <Center flex={1} px="3">
                    <VStack space={4} alignItems="center">
                        <Text bold fontSize="5xl">
                            Pet is here.
                        </Text>
                    </VStack>
                </Center>
            </NativeBaseProvider>
}

export default Pet;
