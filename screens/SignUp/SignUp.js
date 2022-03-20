import React, { useState } from "react";
import {
  Image,
  HStack,
  VStack,
  Text,
  Icon,
  IconButton,
  Hidden,
  Center,
  StatusBar,
  Box,
  Stack,
} from "native-base";
import { AntDesign} from "@expo/vector-icons";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import SignUpForm from "./SignUpForm";
import Loading from "../../components/ui/Loading";

export default function SignUp(props) {

    const [loading, setLoading] = useState(false);

    /**
     * Displays the loading icon if we are waiting for server response
     */
    if (loading) {
        return (
            <NativeBaseProvider>
                <Loading/>
            </NativeBaseProvider>
        )
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
      <Center
        my="auto"
        _dark={{
          bg: "coolGray.900",
        }}
        _light={{
          bg: "primary.900",
        }}
        flex="1"
      >
        <Stack
          flexDirection={{
            base: "column",
            md: "row",
          }}
          w="100%"
          maxW={{
            md: "1016px",
          }}
          flex={{
            base: "1",
            md: "none",
          }}
        >
          <Hidden from="md">
            <VStack px="4" mt="4" mb="5" space="9">
              <HStack space="2" alignItems="center">
                <Text color="coolGray.50" fontSize="lg">
                  Sign Up
                </Text>
              </HStack>
              <VStack space="2">
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
                  Welcome!
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="normal"
                  _dark={{
                    color: "coolGray.400",
                  }}
                  _light={{
                    color: "primary.300",
                  }}
                >
                  Sign up to continue
                </Text>
              </VStack>
            </VStack>
          </Hidden>
          <Hidden till="md">
            <Center
              flex="1"
              bg="primary.700"
              borderTopLeftRadius={{
                base: "0",
                md: "xl",
              }}
              borderBottomLeftRadius={{
                base: "0",
                md: "xl",
              }}
            >
            </Center>
          </Hidden>
          <SignUpForm props={props} setLoading={setLoading} />
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}
