import React, {useState, useRef, useEffect} from "react";
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
import {signup} from "../../firebase/FirebaseAPI";
import AlertBox from "../../components/ui/AlertBox";
import { useScrollToTop } from '@react-navigation/native';
import {getLocalData, removeLocalData, storeLocalData} from "../../components/persistence/AsyncStorageAPIs";

export default function SignUpForm({ props, setLoading }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [signupError, setSignupError] = useState("");
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    useEffect(() => {
        let isMounted = true;
        // Before the component gets mounted, we are want to check there's any server errors stored
        // after a user makes a failed login attempt.
        // If yes, we'll display it
        getLocalData("serverError").then(message => {
            if (isMounted) setSignupError(message);
        })
        return () => { isMounted = false };
    }, []);


    /**
     * A helper function that validates user inputs when the user attempts to sign up
     * @returns {boolean}
     */
    const inputValid = () => {

        if (!firstName) {
            setSignupError("Please enter your first name!");
            return false
        } else if (!lastName) {
            setSignupError("Please enter your last name!");
            return false;
        } else if (!checkEmailValidity(email)) {
            setSignupError("Please enter a valid email!");
            return false;
        } else if (password.length < 8) {
            setSignupError("Password must be at least 8 characters!")
            return false;
        } else if (confirmPass !== password) {
            setSignupError("Your passwords must match!")
            return false;
        } else {
            setSignupError("");
        }

        return true;

    }

    /**
     * Helper function that uses regex to validate an email format
     * @param email
     * @returns {RegExpMatchArray}
     */
    const checkEmailValidity = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }


    const userSignup = () => {
        if (!inputValid()) {
            return;
        }

        setLoading(true);

        signup(email, password, firstName, lastName).then((user) => {

            // Removes the server error first before signing in
            removeLocalData("serverError").then(() => {
                setLoading(false);
                props.navigation.navigate("EnterMoreInfo", {user});
            })
        }).catch(error => {
            // Since we got an error given by firebase, we use async storage
            // to store this error message locally
            storeLocalData("serverError", error.message).then(() => {
                setSignupError(error.message)
                setLoading(false);
            })
        })
    }

    const displayError = () => {

        if (signupError) {
            return <AlertBox status={"error"} title={"ERROR!"} message={signupError}/>
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
            <Text>
                {email}
            </Text>
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
                justifyContent="space-between"
                space="3"
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
                            Sign up to continue!
                        </Text>
                    </Hidden>
                    <VStack>
                        <VStack space="8">
                            <VStack
                                space={{
                                    base: "7",
                                    md: "4",
                                }}
                            >
                                {displayError()}
                                <FloatingLabelInput
                                    isRequired
                                    label="First Name"
                                    labelColor="#9ca3af"
                                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                                    borderRadius="4"
                                    defaultValue={firstName}
                                    onChangeText={(txt) => setFirstName(txt)}
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
                                    label="Last Name"
                                    labelColor="#9ca3af"
                                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                                    borderRadius="4"
                                    defaultValue={lastName}
                                    onChangeText={(txt) => setLastName(txt)}
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
                                                setShowPass(!showPass);
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

                                <FloatingLabelInput
                                    isRequired
                                    type={showConfirmPass ? "" : "password"}
                                    label="Confirm Password"
                                    borderRadius="4"
                                    labelColor="#9ca3af"
                                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                                    defaultValue={confirmPass}
                                    onChangeText={(txt) => setConfirmPass(txt)}
                                    InputRightElement={
                                        <IconButton
                                            variant="unstyled"
                                            icon={
                                                <Icon
                                                    size="4"
                                                    color="coolGray.400"
                                                    as={Entypo}
                                                    name={showConfirmPass ? "eye-with-line" : "eye"}
                                                />
                                            }
                                            onPress={() => {
                                                setShowConfirmPass(!showConfirmPass);
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
                            <Checkbox
                                alignItems="flex-start"
                                defaultIsChecked
                                value="demo"
                                colorScheme="primary"
                                accessibilityLabel="Remember me"
                            >
                                <HStack alignItems="center">
                                    <Text fontSize="sm" color="coolGray.400" pl="2">
                                        I accept the{" "}
                                    </Text>
                                    <Link
                                        _text={{
                                            fontSize: "sm",
                                            fontWeight: "semibold",
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
                                        Terms of Use
                                    </Link>
                                    <Text fontSize="sm"> & </Text>

                                    <Link
                                        _text={{
                                            fontSize: "sm",
                                            fontWeight: "semibold",
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
                                        Privacy Policy
                                    </Link>
                                </HStack>
                            </Checkbox>
                            <Button
                                size="md"
                                borderRadius="4"
                                _text={{
                                    fontSize: "sm",
                                    fontWeight: "medium",
                                }}
                                _light={{
                                    bg: "primary.900",
                                }}
                                _dark={{
                                    bg: "primary.700",
                                }}
                                onPress={() => {
                                    userSignup()
                                }}
                            >
                                SIGN UP
                            </Button>
                            <HStack
                                space="2"
                                mb={{
                                    base: "6",
                                    md: "7",
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
                                    fontSize="sm"
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
                    alignItems="center"
                    justifyContent="center"
                    mt={{
                        base: "auto",
                        md: "8",
                    }}
                >
                    <Text
                        fontSize="sm"
                        _light={{
                            color: "coolGray.800",
                        }}
                        _dark={{
                            color: "coolGray.400",
                        }}
                    >
                        Already have an account?
                    </Text>
                    {/* Opening Link Tag navigateTo:"SignIn" */}
                    <Link
                        _text={{
                            fontSize: "sm",
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
                                props.navigation.navigate("SignIn");
                            })
                        }}
                    >
                        Sign in
                    </Link>
                    {/* Closing Link Tag */}
                </HStack>
            </VStack>
        </KeyboardAwareScrollView>
    );
}
