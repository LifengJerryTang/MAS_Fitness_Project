import React from 'react';
import {AlertDialog, Button, VStack, Text} from 'native-base';

/**
 * This component contains all the design details for a Dialog Box
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DialogBox = (props) => {

    const cancelRef = React.useRef(null);

    return  <AlertDialog leastDestructiveRef={cancelRef} isOpen={props.isOpen}
                         onClose={() => props.onClose("Cancel")}>
        <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>{props.title}</AlertDialog.Header>
            <AlertDialog.Body>
                <Text fontSize={"lg"}>
                    {props.description}
                </Text>
            </AlertDialog.Body>
            <AlertDialog.Footer>
                <Button.Group space={2}>
                    {/*The onPress function here passes the string "Cancel" that tells its parent component
                        that the Cancel button has been pressed.*/}
                    <Button variant='unstyled' colorScheme='coolGray'
                            onPress={() => props.onClose("Cancel")} ref={cancelRef}>
                        Cancel
                    </Button>
                    {/*The onPress function here passes the string "OK" that tells its parent component
                        that the OK button has been pressed.*/}
                    <Button colorScheme='success' onPress={() => props.onClose("OK")}>
                        OK
                    </Button>
                </Button.Group>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog>
};

export default DialogBox;
