import {LineChart} from "react-native-chart-kit";
import {Dimensions, StyleSheet} from "react-native";
import {Box, Center, Hidden, HStack, StatusBar, Text, View, VStack} from "native-base";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import React, {useEffect, useState} from "react";
import {getCurrUserId, getDataFromDatabase} from "../../firebase/FirebaseAPI";

const WorkoutStats = () => {

    const [frequenciesByWeek, setFrequenciesByWeek ] = useState({})

    useEffect(() => {


        loadHistoryData().then((workoutHistory) => {
            // We need to first get the monday of the past four weeks
            let frequencies = {};
            for (let i = 3; i >= 0; i--) {
                let currDate = new Date()
                let monday = new Date(currDate
                    .setDate(currDate.getDate() - currDate.getDay() - (i * 7) + 1))
                    .toISOString().split('T')[0];

                frequencies[monday] = 0

            }

            console.log("----------------")
            for (let date of Object.keys(workoutHistory)) {
                    let tempDateObj = new Date();

                    let historyDate = new Date(date);
                    let monday = new Date(tempDateObj
                        .setDate(historyDate.getDate() - historyDate.getDay() + 1))
                        .toISOString().split('T')[0];

                    if (frequencies.hasOwnProperty(monday)) {
                        frequencies[monday] += 1;
                    } else {
                        frequencies[monday] = 1;
                    }

                    console.log(frequencies)

            }
            setFrequenciesByWeek(frequencies);
        })


    }, [])

    const loadHistoryData = async () => {
        // Since the workout history is stored with the user, we need to get the user id first
        const userId = getCurrUserId();
        return await getDataFromDatabase(`users/${userId}/workoutHistory`);
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
            <VStack
                flex={1}
                _light={{
                    bg: "primary.50",
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
                    {/* Mobile header */}
                    <Hidden from="md">
                        <HStack space="2" justifyContent="space-between">
                            <HStack space="2" alignItems="center">
                                <Text color="coolGray.50" fontSize="lg">
                                    Workout Statistics
                                </Text>
                            </HStack>
                        </HStack>
                    </Hidden>
                </Box>
                <Center>
                    <Text fontSize={"2xl"} style={styles.chartTitle}>Workout Frequency</Text>
                    <View style={styles.chartContainer}>
                        <LineChart
                            data={{
                                labels: Object.keys(frequenciesByWeek),
                                datasets: [
                                    {
                                        data: Object.values(frequenciesByWeek)
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width - 50} // from react-native
                            height={220}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>

                </Center>
            </VStack>
        </NativeBaseProvider>
    )
}

export default WorkoutStats;

const styles = StyleSheet.create({
    chartContainer: {
        marginVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 5,
        width: "95%"
    },

    chartTitle: {
        marginTop: 10
    }
});



