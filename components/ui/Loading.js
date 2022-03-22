import React from "react";
import {Spinner, VStack, Heading, Center} from "native-base";

/**
 * This component displays a spinner that presents the loading state
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Loading = (props) => {
    return (
        <Center>
            <VStack space={4} alignItems="center" mt={300}>
                <Spinner accessibilityLabel="Loading posts" size="lg"/>
                <Heading color="primary.500" fontSize="3xl">
                    {props.message}
                </Heading>
            </VStack>
        </Center>

    );
};

export default Loading;
