import {Hidden, HStack, Icon, IconButton, Text} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import React from "react";

export default function Header (props) {
    return (
        <Hidden from="md">
            <HStack space="2" justifyContent="space-between">
                <HStack space="2" alignItems="center">
                    <Text color="coolGray.50" fontSize="lg">
                        {props.title}
                    </Text>
                </HStack>
            </HStack>
        </Hidden>
    )
}
