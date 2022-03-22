import React, {useEffect, useState} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {
    Button, Center,
    Checkbox,
    Divider,
    Hidden,
    HStack,
    Icon,
    IconButton,
    Link, Pressable,
    Text,
    useColorModeValue,
    VStack
} from "native-base";
import FloatingLabelInput from "../../components/ui/FloatingLabelInput";
import {Entypo} from "@expo/vector-icons";
import IconFacebook from "../../components/ui/icons/IconFacebook";
import IconGoogle from "../../components/ui/icons/IconGoogle";
import {alreadySignedIn, signIn} from "../../firebase/FirebaseAPI";
import AlertBox from "../../components/ui/AlertBox";
import {getLocalData, removeLocalData, storeLocalData} from "../../components/persistence/AsyncStorageAPIs";

export default function SignInForm({ props, setLoading }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = React.useState(false);
    const [signInError, setSignInError] = useState("");

    useEffect(() => {

        if (alreadySignedIn()) {
            props.navigation.navigate("BottomTabNavScreens");
        }

        let isMounted = true;

        // Before the component gets mounted, we are want to check there's any server errors stored
        // after a user makes a failed login attempt.
        // If yes, we'll display it
        getLocalData("serverError").then(message => {
            if (isMounted) setSignInError(message);
        })

        // Clean up useEffect
        return () => { isMounted = false };
    }, []);

    /**
     * A helper function that validates user inputs when the user attempts to sign in
     * @returns {boolean}
     */
    const inputValid = () => {
        if (!email) {
            setSignInError("Please enter your email!");
            return false;
        } else if (!password) {
            setSignInError("Password enter your password!")
            return false;
        } else {
            setSignInError("");
        }

        return true;

    }

    /**
     * Function that signs a user in
     */
    const userSignIn = () => {

        if (!inputValid()) {
            return;
        }

        setLoading(true);

        signIn(email, password).then(user => {

            // Removes the server error first before signing in
            removeLocalData("serverError").then(() => {
                setLoading(false);
                props.navigation.navigate("BottomTabNavScreens", {user});
            })
        }).catch(error => {
            // Since we got an error given by firebase, we use async storage
            // to store this error message locally
            storeLocalData("serverError", error.message).then(() => {
                setLoading(false);
            })
        })
    }

    /**
     * Displays any error messages
     * @returns {JSX.Element}
     */
    const displayError = () => {
        if (signInError) {
            return <AlertBox status={"error"} title={"ERROR!"} message={signInError}/>
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flexGrow: 1,
            }}
            style={{
                flex: 1,
            }}
        >
            <VStack
                flex="1"
                px="6"
                py="9"
                _light={{
                    bg: "white",
                }}
                _dark={{
                    bg: "coolGray.800",
                }}
                space="3"
                justifyContent="space-between"
                borderTopRightRadius={{
                    base: "2xl",
                    md: "xl",
                }}
                borderBottomRightRadius={{
                    base: "0",
                    md: "xl",
                }}
                borderTopLeftRadius={{
                    base: "2xl",
                    md: "0",
                }}
            >
                <VStack space="7">
                    <Hidden till="md">
                        <Text fontSize="lg" fontWeight="normal">
                            Sign in to continue!
                        </Text>
                    </Hidden>
                    <VStack>
                        <VStack space="3">
                            <VStack
                                space={{
                                    base: "7",
                                    md: "4",
                                }}
                            >
                                {displayError()}
                                <FloatingLabelInput
                                    isRequired
                                    label="Email"
                                    labelColor="#9ca3af"
                                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                                    borderRadius="4"
                                    defaultValue={email}
                                    onChangeText={(txt) => setEmail(txt)}
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
                                <FloatingLabelInput
                                    isRequired
                                    type={showPass ? "" : "password"}
                                    label="Password"
                                    borderRadius="4"
                                    labelColor="#9ca3af"
                                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                                    defaultValue={password}
                                    onChangeText={(txt) => setPassword(txt)}
                                    InputRightElement={
                                        <IconButton
                                            variant="unstyled"
                                            icon={
                                                <Icon
                                                    size="4"
                                                    color="coolGray.400"
                                                    as={Entypo}
                                                    name={showPass ? "eye-with-line" : "eye"}
                                                />
                                            }
                                            onPress={() => {
                                                setShowPass(true);
                                            }}
                                        />
                                    }
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
                            <Link
                                ml="auto"
                                _text={{
                                    fontSize: "xs",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                }}
                                _light={{
                                    _text: {
                                        color: "primary.900",
                                    },
                                }}
                                _dark={{
                                    _text: {
                                        color: "primary.500",
                                    },
                                }}
                            >
                                Forgot password?
                            </Link>
                            <Checkbox
                                alignItems="flex-start"
                                mt="5"
                                isChecked
                                value="demo"
                                colorScheme="primary"
                                accessibilityLabel="Remember me"
                            >
                                <Text
                                    pl="3"
                                    fontWeight="normal"
                                    _light={{
                                        color: "coolGray.800",
                                    }}
                                    _dark={{
                                        color: "coolGray.400",
                                    }}
                                >
                                    Remember me and keep me logged in
                                </Text>
                            </Checkbox>
                            <Button
                                mt="5"
                                size="md"
                                borderRadius="4"
                                _text={{
                                    fontWeight: "medium",
                                }}
                                _light={{
                                    bg: "primary.900",
                                }}
                                _dark={{
                                    bg: "primary.700",
                                }}
                                onPress={() => {
                                    userSignIn()
                                }}
                            >
                                SIGN IN
                            </Button>
                            <HStack
                                mt="5"
                                space="2"
                                mb={{
                                    base: 6,
                                    md: 7,
                                }}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Divider
                                    w="30%"
                                    _light={{
                                        bg: "coolGray.200",
                                    }}
                                    _dark={{
                                        bg: "coolGray.700",
                                    }}
                                />
                                <Text
                                    fontWeight="medium"
                                    _light={{
                                        color: "coolGray.300",
                                    }}
                                    _dark={{
                                        color: "coolGray.500",
                                    }}
                                >
                                    or
                                </Text>
                                <Divider
                                    w="30%"
                                    _light={{
                                        bg: "coolGray.200",
                                    }}
                                    _dark={{
                                        bg: "coolGray.700",
                                    }}
                                />
                            </HStack>
                        </VStack>
                        <Center>
                            <HStack space="4">
                                <Pressable>
                                    <IconFacebook />
                                </Pressable>
                                <Pressable>
                                    <IconGoogle />
                                </Pressable>
                            </HStack>
                        </Center>
                    </VStack>
                </VStack>
                <HStack
                    mb="4"
                    space="1"
                    safeAreaBottom
                    alignItems="center"
                    justifyContent="center"
                    mt={{
                        base: "auto",
                        md: "8",
                    }}
                >
                    <Text
                        _light={{
                            color: "coolGray.800",
                        }}
                        _dark={{
                            color: "coolGray.400",
                        }}
                    >
                        Don't have an account?
                    </Text>
                    {/* Opening Link Tag navigateTo:"SignUp" */}
                    <Link
                        _text={{
                            fontWeight: "bold",
                            textDecoration: "none",
                        }}
                        _light={{
                            _text: {
                                color: "primary.900",
                            },
                        }}
                        _dark={{
                            _text: {
                                color: "primary.500",
                            },
                        }}
                        onPress={() => {
                            removeLocalData("serverError").then(() => {
                                props.navigation.navigate("SignUp");
                            })
                        }}
                    >
                        Sign up
                    </Link>
                    {/* Closing Link Tag */}
                </HStack>
            </VStack>
        </KeyboardAwareScrollView>
    );
}
