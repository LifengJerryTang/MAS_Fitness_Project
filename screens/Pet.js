import React from "react";
import {VStack, Center, NativeBaseProvider, ScrollView, Text, Box, StatusBar} from "native-base";
import {TouchableOpacity} from "react-native";
import Card from "../components/ui/Card";
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

                </VStack>
            </NativeBaseProvider>
}

export default Pet;
