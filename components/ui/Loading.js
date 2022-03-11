import React from "react";
import { Spinner, HStack, Heading } from "native-base";

const Loading = (props) => {
    return <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" size="lg"/>
        <Heading color="primary.500" fontSize="3xl">
            {props.message}
        </Heading>
    </HStack>;
};

export default Loading;
