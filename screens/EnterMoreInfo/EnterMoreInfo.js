import React, {useEffect, useState} from "react";
import {
    Box,
    HStack,
    Icon,
    Text,
    VStack,
    StatusBar,
    IconButton,
    Hidden,
    View,
    Radio,
    Center,
    Container,
    Input,
    useColorModeValue
} from "native-base";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import { Ionicons} from "@expo/vector-icons";
import Stepper from 'react-native-stepper-ui';
import FloatingLabelInput from "../../components/ui/FloatingLabelInput";
import {set} from "firebase/database";

const ChooseGender = (props) =>{
    return (
        <Center marginBottom={10}>
            <Text fontSize={"2xl"}>
                Choose your gender
            </Text>
            <HStack space={5} marginTop={5}>
                <IconButton
                    key={"male"}
                    borderRadius="full"
                    p={30}
                    size={"lg"}
                    colorScheme={
                        props.gender === 'male' ? "success" : "primary"
                    }
                    variant={"solid"} _icon={{
                    as: Ionicons,
                    name: "male"
                }}
                    onPress={() => props.chooseGender("male")}/>
                <IconButton
                    key={"female"}
                    borderRadius="full"
                    p={30}
                    size={"lg"}
                    colorScheme={
                        props.gender === 'female' ? "success" : "primary"
                    }
                    variant={"solid"} _icon={{
                    as: Ionicons,
                    name: "female"
                }}
                    onPress={() => props.chooseGender("female")}/>
            </HStack>
        </Center>
    )
}

const EnterWeight = (props) => {

    return (
        <VStack space={5} marginBottom={10}>
            <Text textAlign={"center"} fontSize={"2xl"}>
                Input your weight.
            </Text>
            <FloatingLabelInput
                isRequired
                label="Weight"
                labelColor="#9ca3af"
                labelBGColor={useColorModeValue("#fff", "#1f2937")}
                borderRadius="4"
                defaultValue={""}
                onChangeText={(txt) => props.setWeight(txt)}
                _text={{
                    fontSize: "sm",
                    fontWeight: "medium",
                }}
                _dark={{
                    borderColor: "coolGray.700",
                }}
                _light={{
                    borderColor: "coolGray.300",
                }}
            />
        </VStack>

    )
}

export default function EnterMoreInfo(props) {
    const [gender, setGender] = React.useState('');
    const [weight, setWeight] = useState("");

    const [active, setActive] = useState(0);
    const [error, setError] = useState("");

    const content = [
        <ChooseGender chooseGender={(text) => setGender(text)} gender={gender}/>,
        <EnterWeight setWeight={(text) => setWeight(text)} weight={weight}/>
    ];



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
                    {/* Mobile header */}
                    <Hidden from="md">
                        <HStack space="2" justifyContent="space-between">
                            <HStack space="2" alignItems="center">
                                <Text color="coolGray.50" fontSize="lg">
                                    More Information
                                </Text>
                            </HStack>
                        </HStack>
                    </Hidden>
                </Box>
                <View style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 60 }}>
                    <Stepper
                        stepStyle={{backgroundColor: "#184c64"}}
                        buttonStyle={{backgroundColor: "#184c64"}}
                        active={active}
                        content={content}
                        onBack={() => setActive((p) => p - 1)}
                        onFinish={() => alert('Finish')}
                        onNext={() => setActive((p) => p + 1)}
                    />

                </View>
            </VStack>
        </NativeBaseProvider>
    );
}
