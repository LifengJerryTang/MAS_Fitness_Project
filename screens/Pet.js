import React from "react";
import {VStack, Center, NativeBaseProvider, Progress, Box, StatusBar, Text} from "native-base";
import {Image, StyleSheet} from "react-native";
import Header from "../components/ui/Header";

const Pet = () => {
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
                            style={{width: 410, height: 300}}
                            source={{uri: `https://c.tenor.com/b1DVdUGztTIAAAAC/cartoon-dog.gif`}} />
                    </Center>
                    <Center>
                        <Text fontSize={'xl'} textAlign={"center"}>
                            Health
                        </Text>
                        <Progress colorScheme="warning" min={0} max={ 100}
                                  value={100} style={styles.progress} m="auto"/>
                    </Center>

                </VStack>
            </NativeBaseProvider>
}



const styles = StyleSheet.create({

    progress: {
        height: 20,
        width:350,
        marginTop: 15
    }
});

export default Pet;
