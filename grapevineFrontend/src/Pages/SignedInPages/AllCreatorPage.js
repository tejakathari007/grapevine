import {
  View,
  Text,
  Box,
  Flex,
  Center,
  Image,
  Spinner,
  Button,
} from "native-base";
import React, { useEffect, useState } from "react";
import { grapevineBackend } from "../../API";
import { AntDesign } from "@expo/vector-icons";
import {
  MolecularComponents,
  Layout,
  AtomComponents,
  PageComponent,
} from "../../Exports/index";
import { Pressable } from "react-native";
import GetCreatorUser from "../../Hooks/User/getCreatorUser";
export default function AllCreatorPage({ navigation }) {
  const [filter, setShowFilter] = useState(false);
  const { SignInLayout, BackLayout } = Layout;
  const { RoundImage } = AtomComponents;
  const { DropDownMenu, UserCard } = MolecularComponents;
  const {
    FeaturedUser: { Filter },
  } = PageComponent;
  const [filterInformation, setFilterInformation] = useState({
    // gender: undefined,
    // intrests: undefined,
    // address: "",
  });
  const creatorUser = GetCreatorUser({
    page: 1,
    limit: 10,
    filter: { ...filterInformation },
  });
  if (creatorUser.isLoading || creatorUser.isRefetching) {
    return (
      <Center h="100%" w="100%">
        <Spinner accessibilityLabel="Loading" />
      </Center>
    );
  }
  if (creatorUser.isError || !creatorUser.data) {
    return <Text>Error</Text>;
  }
  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box w="100%" h="100%" alignItems={"center"} bg="#fff">
        <Text fontWeight="800" fontSize={16} textAlign="center" mb="5">
          All Creators
        </Text>
        {filter && (
          <Filter
            close={() => setShowFilter(false)}
            onChange={setFilterInformation}
            info={filterInformation}
            applyFilter={() => creatorUser.refetch()}
          />
        )}
        <Flex
          direction="row"
          alignItems={"center"}
          justifyContent="center"
          p={3}
          borderWidth={1}
          borderColor="#d3d3d3"
        >
          <Box flex={1} borderRightWidth={1} borderRightColor="#d3d3d3">
            <DropDownMenu
              icon={
                <Text fontWeight={"800"} fontSize={16} textAlign="center">
                  SORT
                </Text>
              }
              options={[
                {
                  text: "Recommended",
                  icon: (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
                { text: "Audience: Low to High" },
                { text: "Audience: High to Low" },
                { text: "Most Popular" },
              ]}
              textStyle={{
                textAlign: "left",

                width: "80%",
                padding: "2",
                borderBottomWidth: "1",
                borderBottomColor: "#d3d3d3",
              }}
            />
          </Box>
          <Box flex={1}>
            <Pressable onPress={() => setShowFilter(true)}>
              <Text fontWeight={"800"} fontSize={16} textAlign="center">
                FILTER
              </Text>
            </Pressable>
          </Box>
        </Flex>

        <>
          {creatorUser.data.length > 0 ? (
            <Box width={"100%"}>
              <Text my={3} fontWeight="800" textAlign={"center"}>
                {creatorUser.data.length} creator found
              </Text>
              {creatorUser.data.map((creator) => {
                return <UserCard key={creator.uuid} user={creator} />;
              })}
            </Box>
          ) : (
            <Center h="100%" w="100%">
              <Image
                source={require("../../../assets/Logo/Logo.png")}
                size={100}
                resizeMode="contain"
                p="5"
                alt="Image"
              />
              <Text fontSize="16" fontWidth="800" color="primary" mt="10">
                Sorry, Creator Found.
              </Text>
            </Center>
          )}
        </>

        <Text></Text>
      </Box>
    </BackLayout>
  );
}
