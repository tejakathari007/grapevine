import React, { useState } from "react";
import {
  Button,
  Input,
  View,
  Flex,
  Box,
  Text,
  Image,
  Select,
  Center,
} from "native-base";
import { Pressable } from "react-native";
import { DropDownMenu } from "../../MoleculeComponents";

const People = ({ persons, setPersons }) => {
  const [role, setRole] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [network, setNetwork] = useState("Instagram");

  const addPeople = () => {
    if (role && profileLink) {
      setPersons((p) => [
        { role: role, network: network, link: profileLink },
        ...p,
      ]);
      setRole("");
      setProfileLink("");
    }
  };
  const removePeople = (index) => {
    let temp = [...persons];
    temp.splice(index, 1);
    setPersons(temp);
  };
  return (
    <View py={5}>
      <Flex
        direction="column"
        justifyContent={"center"}
        alignItems="flex-start"
      >
        <Text
          fontWeight={"800"}
          fontSize={12}
          fontFamily="light"
          width={"100%"}
          textAlign="left"
        >
          Network
        </Text>
        <Select
          bg="gray.200"
          borderRadius={"md"}
          fontFamily="bold"
          height="10"
          width={"30%"}
          selectedValue={network}
          color={"#000"}
          fontWeight="800"
          accessibilityLabel="Choose "
          placeholder="Choose "
          _selectedItem={{
            bg: "gray.200",
          }}
          borderWidth="0"
          mt={1}
          onValueChange={(itemValue) => {
            setNetwork(itemValue);
          }}
        >
          <Select.Item label={"Instagram"} value={"Instagram"} />
          <Select.Item label={"Tiktok"} value={"Tiktok"} />
          <Select.Item label={"Youtube"} value={"Youtube"} />
        </Select>
        <Text
          fontWeight={"800"}
          fontSize={12}
          fontFamily="light"
          width={"100%"}
          textAlign="left"
          mt={2}
        >
          Role
        </Text>
        <Input
          h={8}
          bg={"gray.200"}
          placeholder="Search"
          value={role}
          onChangeText={(text) => setRole(text)}
          w={"30%"}
        />
        <Text
          fontWeight={"800"}
          fontSize={12}
          fontFamily="light"
          width={"100%"}
          textAlign="left"
          mt={2}
        >
          {network} Profile Link
        </Text>
        <Input
          h={8}
          bg={"gray.200"}
          placeholder="Search"
          value={profileLink}
          onChangeText={(text) => setProfileLink(text)}
        />
        {/* <Button bg="primary" my={5} borderRadius="md" onPress={addProduct}>
          Add
        </Button> */}
      </Flex>
      <Center>
        <Button
          bg="primary"
          my={5}
          h={6}
          py={0}
          px={2}
          borderRadius="md"
          onPress={addPeople}
        >
          <Text fontSize={12} fontWeight="800" color="white">
            Add
          </Text>
        </Button>
      </Center>
      <Box borderBottomColor={"#d3d3d3"} borderBottomWidth={1}>
        <Text fontWeight={"800"} fontSize={16} fontFamily="light">
          Total:
          <Text fontWeight={"400"}>{" " + persons.length} people</Text>
        </Text>
      </Box>
      {persons.map((_people, index) => {
        return (
          <Flex
            direction="row"
            justifyContent={"space-between"}
            alignItems="center"
            p={1}
            key={index}
            borderBottomColor={"#d3d3d3"}
            borderBottomWidth={1}
          >
            <Image
              source={require("../../../assets/Images/2.png")}
              alt="img"
              h={"20"}
              w={"20"}
              // flex={1}
            />
            <View>
              <Text>{_people.role}</Text>
              <Text>{_people.network}</Text>
            </View>
            <Pressable onPress={() => removePeople(index)}>
              <View bg="red.600" py={1} px={1} borderRadius="md">
                <Text fontSize={12} fontWeight="800" color="white">
                  Remove
                </Text>
              </View>
            </Pressable>
          </Flex>
        );
      })}
    </View>
  );
};

export default People;
