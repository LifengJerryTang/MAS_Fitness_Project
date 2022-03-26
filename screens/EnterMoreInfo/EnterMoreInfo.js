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
    useColorModeValue,
} from "native-base";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import { Ionicons} from "@expo/vector-icons";
import Stepper from 'react-native-stepper-ui';
import FloatingLabelInput from "../../components/ui/FloatingLabelInput";
import {StyleSheet} from "react-native";
import AlertBox from "../../components/ui/AlertBox";
import {getCurrUserId, saveToDatabase} from "../../firebase/FirebaseAPI";

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
                Enter your weight (lb).
            </Text>
            <FloatingLabelInput
                isRequired
                label={!props.weight ? "Weight" : null}
                labelColor={!props.weight ? "#9ca3af" : null}
                labelBGColor={!props.weight ? useColorModeValue("#fff", "#1f2937") : null}
                borderRadius="4"
                defaultValue={props.weight}
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

    // Saves which step we are currently on
    const [active, setActive] = useState(0);
    const [error, setError] = useState("");

    const content = [
        <ChooseGender chooseGender={(text) => setGender(text)} gender={gender}/>,
        <EnterWeight setWeight={(text) => setWeight(text)} weight={weight}/>
    ];

    const validateInput = () => {
        if (active === 0) {
            if (gender) {
                setError("");
                return true;
            } else {
                setError("Please choose your gender!");
                return false;
            }
        } else if (active === 1) {
            if (weight) {
                setError("");
                return true;
            } else {
                setError("Please enter your weight!");
                return false
            }
        }

        return true;
    }

    const goToNextStep = () => {

        // Check for any errors first
        const inputValid = validateInput();

        if (!inputValid) {
            return;
        }

        setActive((p) => p + 1)

    }

    const finishSteps = async () => {
        const inputValid = validateInput();

        if (!inputValid) {
            return;
        }

        // saves the profile information to the user's object in the database
        await saveToDatabase(`users/${getCurrUserId()}/profileInfo`, {
            gender: gender,
            weight: weight,
        });

        props.navigation.navigate("BottomTabNavScreens");

    }

    const goBackOneStep = () => {
        setError("");
        setActive((p) => p - 1)
    }

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

                {/*We are going to use the stepper component to ask user to enter profile information*/}
                <View style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 60 }}>
                    <Stepper
                        stepStyle={{backgroundColor: "#fff",
                                    width: 50,
                                    height: 50,
                                    borderColor: "#184c64", borderWidth: 5}}
                        stepTextStyle={{color: "#184c64" }}
                        buttonStyle={styles.button}
                        buttonTextStyle={styles.buttonText}
                        showButton={true}
                        active={active}
                        content={content}
                        onBack={() => goBackOneStep()}
                        onFinish={() => finishSteps()}
                        onNext={() => goToNextStep()}
                    />

                    {
                        error ? <AlertBox status={"error"} title={"Error"}  message={error}/> : <Text/>
                    }

                </View>
            </VStack>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#184c64",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
    },

    buttonText: {
        fontSize: 16
    },

    stepperContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 60
    },

});

