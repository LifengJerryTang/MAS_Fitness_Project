import React, {useEffect, useState} from "react";
import {
  Box, HStack, Icon, Text, VStack, StatusBar, IconButton, Hidden, View, Card,
} from "native-base";


import {Agenda} from 'react-native-calendars';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {TouchableOpacity} from "react-native";
import {getCurrUserId, getDataFromDatabase} from "../../firebase/FirebaseAPI";

export default function WorkoutHistory(props) {

  const [historyItems, setHistoryItems] = useState({});

  useEffect(() => {
   loadHistoryData().then();
  }, [])

  const dateOfToday = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  const loadHistoryData = async () => {
      // Since the workout history is stored with the user, we need to get the user id first
    const userId = getCurrUserId();
    const historyData = await getDataFromDatabase(`users/${userId}/workoutHistory`);
    setHistoryItems(historyData);
  }


  const renderItem = (item) => {

    return (
        <TouchableOpacity style={{marginRight: 10, marginTop: 30}}>
          <Card backgroundColor={"white"}>
            <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text fontSize={"md"}>{item.workoutName}</Text>
                <Text fontSize={"md"}>{item.duration}</Text>
                <Text bold fontSize={"md"}>{item.caloriesBurned} cal</Text>
            </View>
          </Card>
        </TouchableOpacity>
    );
  };


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
                  Workout History
                </Text>
              </HStack>
            </HStack>
          </Hidden>
        </Box>
         <View style={{flex: 1}}>
           {/*  We are using the Agenda component provided by react native to display workout histories.
                Although the name "Agenda" doesn't sound fitting, it's by far the best component for displaying
                workout history data.*/}
           <Agenda
              items={historyItems}
              selected={dateOfToday()}
              renderItem={renderItem}
              loadItemsForMonth={loadHistoryData}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              futureScrollRange={1}
              maxDate={dateOfToday()}
          />
        </View>
      </VStack>
    </NativeBaseProvider>
  );
}
