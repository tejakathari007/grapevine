import React, { useState } from "react";
import { View, Flex, Text, Box, Pressable, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { DropDownMenu } from "../../MoleculeComponents/index";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
const Filter = ({ close, onChange, info, applyFilter }) => {
  const [selectCountryVisible, setSelectCountryVisible] = useState(false);
  return (
    <View w="100%" h="100%" bg="white" px={5}>
      <CountryPicker
        theme={DARK_THEME}
        {...{
          withFilter: true,
          withFlag: true,
          withCountryNameButton: false,
          withAlphaFilter: true,
          withCallingCode: true,
          withEmoji: true,
          withCountryNameButton: true,
          withCountryNameButton: true,
          withCallingCodeButton: true,
          withCountryNameButton: true,
          withFlagButton: false,

          onSelect: (selectData) => {
            console.log(selectData.name, "country");
            onChange({ ...info, address: selectData.name });
            setSelectCountryVisible(false);
          },
        }}
        visible={selectCountryVisible}
      />
      <Flex
        direction="column"
        alignItems={"center"}
        justifyContent="space-between"
        height={"90%"}
      >
        <Box w="100%">
          <Flex
            direction="row"
            alignItems={"center"}
            justifyContent="flex-start"
          >
            <Pressable onPress={close} p={2}>
              <AntDesign name="close" size={18} color="black" />
            </Pressable>
          </Flex>
          <Flex
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
            px={2}
            py={5}
            mt={2}
            borderBottomColor="#d3d3d3"
            borderBottomWidth={1}
          >
            <Text fontSize={16} fontWeight="800">
              Gender
            </Text>
            <DropDownMenu
              icon={
                <Text fontSize={14} fontWeight="600" color="#a6a6a6">
                  {info.gender == undefined ? "All" : info.gender}
                </Text>
              }
              options={[
                {
                  text: "All",
                  onPress: () => onChange({ ...info, gender: undefined }),
                  icon: info.gender == undefined && (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
                {
                  text: "Male",
                  onPress: () => onChange({ ...info, gender: "Male" }),
                  icon: info.gender == "Male" && (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
                {
                  text: "Female",
                  onPress: () => onChange({ ...info, gender: "Female" }),
                  icon: info.gender == "Female" && (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
              ]}
              textStyle={{
                textAlign: "left",
                width: "80%",
                padding: "2",
              }}
            />
          </Flex>
          <Flex
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
            px={2}
            py={5}
            mt={2}
            borderBottomColor="#d3d3d3"
            borderBottomWidth={1}
          >
            <Text fontSize={16} fontWeight="800">
              Content Type
            </Text>
            {/* <Text fontSize={14} fontWeight="600" color="#a6a6a6">
              Skincare, Health & We ...
            </Text> */}
            <DropDownMenu
              icon={
                <Text fontSize={14} fontWeight="600" color="#a6a6a6">
                  {info.intrests == undefined ? "All" : info.intrests}
                </Text>
              }
              options={[
                {
                  text: "All",
                  onPress: () => onChange({ ...info, intrests: undefined }),
                  icon: info.intrests == undefined && (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
                {
                  text: "tv",
                  onPress: () => onChange({ ...info, intrests: "tv" }),
                  icon: info.intrests == "tv" && (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
                {
                  text: "football",
                  onPress: () => onChange({ ...info, intrests: "football" }),
                  icon: info.intrests == "football" && (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
                {
                  text: "Fashion",
                  onPress: () => onChange({ ...info, intrests: "Fashion" }),
                  icon: info.intrests == "Fashion" && (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
                {
                  text: "Fitness",
                  onPress: () => onChange({ ...info, intrests: "Fitness" }),
                  icon: info.intrests == "Fitness" && (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
              ]}
              textStyle={{
                textAlign: "left",
                width: "80%",
                padding: "2",
              }}
            />
          </Flex>
          <Flex
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
            px={2}
            py={5}
            mt={2}
            borderBottomColor="#d3d3d3"
            borderBottomWidth={1}
          >
            <Text fontSize={16} fontWeight="800">
              Audience Size
            </Text>
            <Text fontSize={14} fontWeight="600" color="#a6a6a6">
              25k-50k
            </Text>
          </Flex>
          <Pressable onPress={() => setSelectCountryVisible(true)}>
            <Flex
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
              px={2}
              py={5}
              mt={2}
              borderBottomColor="#d3d3d3"
              borderBottomWidth={1}
            >
              <Text fontSize={16} fontWeight="800">
                City
              </Text>

              <Text fontSize={14} fontWeight="600" color="#a6a6a6">
                {info.address}
              </Text>
            </Flex>
          </Pressable>
        </Box>
        <Box width={"100%"}>
          <Button
            bg="primary"
            width="100%"
            height={10}
            _text={{
              fontWeight: "800",
            }}
            onPress={() => {
              applyFilter();
              close();
            }}
          >
            Apply Filter
          </Button>
        </Box>
      </Flex>
    </View>
  );
};

export default Filter;
