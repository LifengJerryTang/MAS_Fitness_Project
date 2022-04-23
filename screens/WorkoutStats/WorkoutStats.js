import {LineChart, BarChart} from "react-native-chart-kit";
import {Dimensions, StyleSheet} from "react-native";
import {Box, Hidden, HStack, ScrollView, StatusBar, Text, View, VStack} from "native-base";
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import React, {useEffect, useState} from "react";
import {getCurrUserId, getDataFromDatabase} from "../../firebase/FirebaseAPI";
import {useFocusEffect} from "@react-navigation/native";


const WorkoutStats = () => {

    const [caloriesData, setCaloriesData] = useState({});
    const [workoutFrequencyData, setWorkoutFrequencyData] = useState({});
    const [dataView, setDataView] = useState("By Days");
    const [workoutHistoryData, setWorkoutHistoryData] = useState({})

    useFocusEffect(
        React.useCallback(() => {
            loadHistoryData().then((workoutHistory) => {
                setWorkoutHistoryData(workoutHistory);
                setDataView("By Days");
                fillFrequencyDataByDays(workoutHistory)
                fillCaloriesDataByDays(workoutHistory);
            })
            return () => {};
        }, [])
    );

    const fillCaloriesDataByDays = (workoutHistory) => {

        let caloriesBurned = {}

        // For each day of the past 4 days, aggregate its calories burned and update calories dictionary accordingly
        for (let i = 0; i < 4; i++) {
            let currDate = new Date();
            let pastDay = new Date(currDate.setDate(currDate.getDate() - i)).toISOString().split('T')[0];

            if (workoutHistory && workoutHistory.hasOwnProperty(pastDay)) {
                let totalCaloriesBurned = 0;
                workoutHistory[pastDay].forEach((historyItem) => {
                    totalCaloriesBurned += parseInt(historyItem.caloriesBurned);
                })

                caloriesBurned[pastDay] = totalCaloriesBurned;
            } else {
                caloriesBurned[pastDay] = 0
            }

        }

        setCaloriesData(caloriesBurned);
    }

    const fillCaloriesDataByWeeks = (workoutHistory) => {

        let caloriesBurnedByWeeks = {};

        // We need to first get the monday of the past four weeks and initialize the frequencies dictionary
        for (let i = 3; i >= 0; i--) {
            let currDate = new Date()
            let monday = new Date(currDate
                .setDate(currDate.getDate() - currDate.getDay() - (i * 7) + 1))
                .toISOString().split('T')[0];

            caloriesBurnedByWeeks[monday] = 0

        }

        if (!workoutHistory) {
            setCaloriesData(caloriesBurnedByWeeks);
            return;
        }

        // Then for each day of the workout history, get the monday of that week, and increment frequencies accordingly
        for (let date of Object.keys(workoutHistory)) {
            let tempDateObj = new Date();
            let historyDate = new Date(date);
            let monday = new Date(tempDateObj
                .setDate(historyDate.getDate() - historyDate.getDay() + 1))
                .toISOString().split('T')[0];

            if (caloriesBurnedByWeeks.hasOwnProperty(monday)) {
                for (let historyData of workoutHistory[date]) {
                    caloriesBurnedByWeeks[monday] += historyData.caloriesBurned;
                }
            }

        }
       setCaloriesData(caloriesBurnedByWeeks);
    }

    const fillFrequencyDataByDays = (workoutHistory) => {

        let frequencyByDays = {}

        // For each day of the past 4 days, aggregate its calories burned and update calories dictionary accordingly
        for (let i = 0; i < 4; i++) {
            let currDate = new Date();
            let pastDay = new Date(currDate.setDate(currDate.getDate() - i)).toISOString().split('T')[0];

            if (workoutHistory.hasOwnProperty(pastDay)) {
                frequencyByDays[pastDay] = workoutHistory[pastDay].length;
            } else {
                frequencyByDays[pastDay] = 0;
            }

        }

        setWorkoutFrequencyData(frequencyByDays);
    }

    const fillFrequencyDataByWeeks = (workoutHistory) => {

        let frequencies = {};

        // We need to first get the monday of the past four weeks and initialize the frequencies dictionary
        for (let i = 3; i >= 0; i--) {
            let currDate = new Date()
            let monday = new Date(currDate
                .setDate(currDate.getDate() - currDate.getDay() - (i * 7) + 1))
                .toISOString().split('T')[0];

            frequencies[monday] = 0

        }

        if (!workoutHistory) {
            setWorkoutFrequencyData(frequencies);
            return;
        }

        // Then for each day of the workout history, get the monday of that week, and increment frequencies accordingly
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

        }
        setWorkoutFrequencyData(frequencies);
    }

    const loadHistoryData = async () => {
        // Since the workout history is stored with the user, we need to get the user id first
        const userId = getCurrUserId();
        return getDataFromDatabase(`users/${userId}/workoutHistory`);
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
                <ScrollView>
                    <ButtonToggleGroup
                        style={styles.buttonGroup}
                        highlightBackgroundColor={'#184c64'}
                        highlightTextColor={'white'}
                        inactiveBackgroundColor={'transparent'}
                        inactiveTextColor={'grey'}
                        values={['By Days', 'By Weeks']}
                        value={dataView}
                        onSelect={val => {
                            setDataView(val);
                            if (val === "By Weeks") {
                                fillFrequencyDataByWeeks(workoutHistoryData);
                                fillCaloriesDataByWeeks(workoutHistoryData);
                            } else {
                                fillFrequencyDataByDays(workoutHistoryData);
                                fillCaloriesDataByDays(workoutHistoryData);
                            }
                        }}
                    />
                    <Text fontSize={"xl"} style={styles.chartTitle} textAlign={"center"}>
                        Workout Frequency in Past 4 {dataView.split(' ')[1]}
                    </Text>
                    <View style={styles.chartContainer}>

                        {
                            Object.keys(workoutFrequencyData).length > 0
                            && // Data must exist first before rendering, hence the &&
                            <LineChart
                                data={{
                                    labels: Object.keys(workoutFrequencyData),
                                    datasets: [
                                        {
                                            data: Object.values(workoutFrequencyData)
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width - 50} // from react-native
                                height={220}
                                fromZero={true}
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 1, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    },
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        }

                    </View>

                    <Text fontSize={"xl"} style={styles.chartTitle} textAlign={"center"}>
                        Calories Burned in Past 4  {dataView.split(' ')[1]}
                    </Text>
                    <View style={styles.chartContainer}>

                        {

                            <BarChart
                                data={{
                                    labels: Object.keys(caloriesData),
                                    datasets: [
                                        {
                                            data: Object.values(caloriesData)
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width - 50} // from react-native
                                height={220}
                                yAxisInterval={1} // optional, defaults to 1
                                fromZero={true}
                                chartConfig={{
                                    backgroundColor: "#182c7c",
                                    backgroundGradientFrom: "#182c7c",
                                    backgroundGradientTo: "#2845a4",
                                    decimalPlaces: 1, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    },
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        }

                    </View>

                </ScrollView>
            </VStack>
        </NativeBaseProvider>
    )
}

export default WorkoutStats;

const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 15,
        marginBottom: 25,
        marginHorizontal: "3%",
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 5,
        width: "94%"
    },

    chartTitle: {
        marginTop: 10
    },

    buttonGroup: {
        margin: 20
    }
});



