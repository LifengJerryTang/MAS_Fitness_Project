import React from "react";
import { Alert, VStack, HStack, IconButton, CloseIcon, Box, Text } from "native-base";

export default function AlertBox(props) {
    return  <Alert w="100%" maxW="400" status={props.status} colorScheme={props.status}>
        <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                <HStack flexShrink={1} space={2} alignItems="center">
                    <Alert.Icon />
                    <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                        {props.title}
                    </Text>
                </HStack>
                <IconButton variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" />} />
            </HStack>
            <Box pl="6" _text={{
                color: "coolGray.600"
            }}>
                {props.message}
            </Box>
        </VStack>
    </Alert>
}
