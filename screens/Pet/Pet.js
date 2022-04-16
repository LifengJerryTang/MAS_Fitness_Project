import React, {useEffect, useState} from "react";
import {VStack, Center, NativeBaseProvider, Progress, Box, StatusBar, Text} from "native-base";
import {Image, StyleSheet} from "react-native";
import Header from "../../components/ui/Header";
import {getCurrUserId, getDataFromDatabase} from "../../firebase/FirebaseAPI";
import {useFocusEffect} from "@react-navigation/native";

const Pet = () => {

    const [petHealth, setPetHealth] = useState(0);


    useFocusEffect(
        React.useCallback(() => {
            getDataFromDatabase(`users/${getCurrUserId()}/pet`).then((pet) => {
                setPetHealth(pet.health);
            })
            return () => {};
        }, [])
    );

    const getHealthBarColor = () => {
        if (petHealth > 60) {
            return "primary"
        } else if (petHealth > 30) {
            return "warning";
        } else {
            return "error";
        }
    }

    return <NativeBaseProvider>
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
                    space={10}
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
                        <Header title={"Pet"}/>

                    </Box>
                    <Center>
                        <Image
                            style={{width: 300, height: 300}}
                            source={{uri: `https://i.pinimg.com/originals/f9/8f/c2/f98fc2fc9a9e290580817a3ab118f593.gif`}}/>
                    </Center>
                    <Center>
                        <Text fontSize={'xl'} textAlign={"center"}>
                            Health: {petHealth}
                        </Text>
                        <Progress min={0} max={100} colorScheme={getHealthBarColor()}
                                  value={petHealth} style={styles.progress} m="auto"/>
                    </Center>

                </VStack>
            </NativeBaseProvider>
}


const styles = StyleSheet.create({

    progress: {
        height: 20,
        width: 350,
        marginTop: 15,
    }
});

export default Pet;
