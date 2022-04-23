import {VStack, Center, NativeBaseProvider, ScrollView, Text, Box, StatusBar, Button} from "native-base";
import {Platform, TouchableOpacity} from 'react-native';
import Card from '../../components/ui/Card'
import {getCurrUserId, getDataFromDatabase, saveToDatabase} from "../../firebase/FirebaseAPI";
import Header from "../../components/ui/Header";
import React, {useState, useEffect, useRef} from 'react';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";


const WorkoutList = (props) => {

    const goToWorkout = (workout) => {
        props.navigation.navigate('SingleWorkout', {workout})
    }

    return (
        <VStack
            flex={1}
            _light={{
                bg: "white",
            }}
            _dark={{
                bg: "customGray",
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
                <Header title={"Workouts"}/>

            </Box>
            <ScrollView mt={5}>
                <VStack space={4} alignItems="center">
                    {props.workouts.map((workout) => {
                        return <TouchableOpacity key={workout.name}
                                                 onPress={() => goToWorkout(workout)}
                        >
                            <Card
                                imageUrl={workout.imageUrl}
                                title={workout.name}
                                description={workout.description}/>
                        </TouchableOpacity>

                    })}
                </VStack>
            </ScrollView>
        </VStack>
    );
}

const ReminderNotification = () => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        //
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        setReminderTimer();

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    })

    const setReminderTimer = () => {

        setInterval(async () => {
            const user = await getDataFromDatabase(`users/${getCurrUserId()}/`);
            const workoutHistory = user.workoutHistory;

            if (!workoutHistory) {
                return;
            }

            const workoutDates = Object.keys(workoutHistory);
            const dateStringOfLastWorkout = workoutDates.pop();
            const dateOfLastWorkout = new Date(dateStringOfLastWorkout);
            const dateOfToday = new Date();
            const diffTime = Math.abs(dateOfToday - dateOfLastWorkout);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays >= 1) {
                user.pet.health -= 10;
            }

            if (user.pet.health <= 0) {
                user.pet.health = 0;
            }

            if (user.pet.health <= 30 && expoPushToken) {
                await sendPushNotification(expoPushToken);
            }

            await saveToDatabase(`users/${getCurrUserId()}`, user);

        }, 86400000);

    }

    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
    async function sendPushNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Workout Reminder',
            body: "It's time to workout to feed your pet!",
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    return null;
}

const Workouts = (props) => {

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        // Before mounting any components, grab all the workouts from firebase first
      getDataFromDatabase("/workouts").then((allWorkouts) => {
          setWorkouts(allWorkouts);
      })
    }, []);

    return (
        <NativeBaseProvider>
            <ReminderNotification/>
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
            <WorkoutList workouts={workouts} navigation={props.navigation}/>
        </NativeBaseProvider>
    );
}

export default Workouts;
