import React, {useState} from "react";
import {
  Box, HStack, Icon, Text, VStack, StatusBar, Avatar, Image, Input, useColorMode, ScrollView,
  Pressable, Center, Divider, Button, IconButton, Stack, Link, Hidden, Menu, Container, View, Card,
} from "native-base";
import {
  AntDesign, Entypo, EvilIcons, Feather, FontAwesome, Ionicons,
} from "@expo/vector-icons";

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {TouchableOpacity} from "react-native";



const reviews = [
  {
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Laura Jones",
    time: "12 May 2021",
    review:
      "I loved the quality of their products. Highly recommended to everyone who is looking for comfortable bodysuits for their kids.",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Laura Jones",
    time: "02 Jan 2021",
    review:
      "I loved the quality of their products. Highly recommended to everyone who is looking for comfortable bodysuits for their kids.",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Rati Agarwal",
    time: "31 Aug 2021",
    review:
      "I loved the quality of their products. Highly recommended to everyone who is looking for comfortable bodysuits for their kids.",
  },
];

// Might need the following styled button later, so commenting out for right now

// const AddToCartButton = (props) => {
//   return (
//     <HStack
//       mt="5"
//       space="4"
//       alignItems="center"
//       display={{
//         base: props.base,
//         md: props.md,
//       }}
//     >
//       <Center
//         p="2"
//         borderRadius="4"
//         _light={{
//           bg: "primary.100",
//         }}
//         _dark={{
//           bg: "coolGray.900",
//         }}
//       >
//         <Icon
//           size="8"
//           name="heart"
//           as={EvilIcons}
//           _dark={{
//             color: "violet.500",
//           }}
//           _light={{
//             color: "primary.900",
//           }}
//         />
//       </Center>
//       <Button
//         flex={1}
//         h="100%"
//         py={3}
//         borderRadius="4"
//         _dark={{
//           bg: "violet.700",
//         }}
//         _light={{
//           bg: "primary.900",
//         }}
//         _text={{
//           fontSize: "md",
//           fontWeight: "semibold",
//         }}
//       >
//         Add To Cart
//       </Button>
//     </HStack>
//   );
// };

export default function WorkoutHistory(props) {
  // const router = useRouter(); //use incase of Nextjs
  const [tabName, setTabName] = React.useState("Reviews");
  const { colorMode } = useColorMode();

  const [historyItems, setHistoryItems] = useState([]);

  const [items, setItems] = useState({});

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
        <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
          <Card>
            <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
              <Text>{item.name}</Text>
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
                <IconButton
                  variant="ghost"
                  colorScheme="light"
                  icon={
                    <Icon
                      size="6"
                      as={AntDesign}
                      name="arrowleft"
                      color="coolGray.50"
                    />
                  }
                />
                <Text color="coolGray.50" fontSize="lg">
                  Workout History
                </Text>
              </HStack>
            </HStack>
          </Hidden>
        </Box>
         <View style={{flex: 1}}>
           <Agenda
              items={items}
              loadItemsForMonth={loadItems}
              selected={'2017-05-16'}
              renderItem={renderItem}
          />
        </View>
      </VStack>
    </NativeBaseProvider>
  );
}
