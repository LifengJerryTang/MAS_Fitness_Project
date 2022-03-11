import React, {useState} from "react";
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
import Loading from "../../components/ui/Loading";

export default function SignUpForm({ props, setLoading }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [signupError, setSignupError] = useState("");
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const inputValid = () => {
        if (!firstName) {
            setSignupError("Please enter your firstName!");
            return false
        } else if (!lastName) {
            setSignupError("Please enter your lastName!");
            return false;
        } else if (!email) {
            setSignupError("Email cannot be empty!");
            return false;
        } else if (!password) {
            setSignupError("Password cannot be empty!")
            return false;
        }

        return true;

    }

    const userSignup = () => {
        if (!inputValid()) {
            return;
        }
        setLoading(true);
        signup(email, password, firstName, lastName).then(user => {
            clearInputs();
            setLoading(false);
            props.navigation.navigate("/Workouts", {user});
        }).catch(error => {
            setLoading(false);
            setSignupError(error.message);
        })
    }

    const displayError = () => {
        if (signupError) {
            return <AlertBox status={"error"} title={"ERROR!"} message={signupError}/>
        }
    }
    const clearInputs = () => {
        setConfirmPass("");
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
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
                            props.navigation.navigate("SignIn");
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
