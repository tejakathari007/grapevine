import {
  Box,
  Text,
  Avatar,
  Divider,
  Button,
  Flex,
  Pressable,
  Select,
  Center,
  View,
} from "native-base";
import {
  Feather,
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { DropDownMenu } from "../../MoleculeComponents";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import ChangeProfileImage from "../../Hooks/User/changeProfileImage";
import mime from "mime";
import { Dimensions } from "react-native";
const HeaderContainer = (props) => {
  const {
    user: {
      username,
      image,
      profile_pic,
      engagement_type,
      fname,
      lname,
      id,
      uuid,
      description,
      about,
      _count,
      brand_name,
    },
    navigation,
    logout,
  } = props;
  const changeProfileImage = ChangeProfileImage();

  const changeProfile = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!image.cancelled) {
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        type: mime.getType(image.uri),
        name: image.uri.split("/").pop(),
      });
      changeProfileImage.mutate(formData);
    }
  };
  return (
    <Box w="full" p="5" pb="0">
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        flex="1"
      >
        <Box>
          <Box
            borderWidth="3"
            borderColor="primary"
            rounded="full"
            display="flex"
            flex="0.3"
          >
            <Pressable onPress={changeProfile}>
              <Avatar
                alignSelf="center"
                justifyContent="center"
                source={{
                  uri: profile_pic
                    ? `https://admin.grapevine-app.co/api/file/${profile_pic}`
                    : "https://wallpaperaccess.com/full/317501.jpg",
                }}
                size="20"
                m="0.5"
              />
            </Pressable>
          </Box>
          <Box
            textAlign="center"
            bg="primary"
            borderRadius="md"
            mt="2"
            display="flex"
            justifyContent="center"
            flexDirection="row"
          >
            <Text color="white" fontSize="14" fontFamily="bold">
              {engagement_type}{" "}
              <FontAwesome name="check" size={12} color="white" />
            </Text>
          </Box>
          <Text
            fontSize="14"
            mt="2"
            textAlign="center"
            fontFamily="bold"
          >{`${fname.charAt(0)?.toUpperCase()}${fname.slice(1)} ${lname
            .charAt(0)
            ?.toUpperCase()}${lname.slice(1)}`}</Text>
        </Box>
        <Box flex="1" ml="10">
          <Text fontFamily="bold" mb="2">
            @{username}
          </Text>
          <Box flex="1" flexDir="row" mb="0">
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontFamily="bold">
                {_count.posts ?? "2K"}
              </Text>
              <Text fontSize="12" fontFamily="light">
                Posts
              </Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontFamily="bold">
                {_count.followers ?? "4M"}
              </Text>
              <Text fontSize="12" fontFamily="light">
                Followers
              </Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontFamily="bold">
                {_count.connections ?? "100+"}
              </Text>
              <Text fontSize="12" fontFamily="light">
                Connections
              </Text>
            </Box>
          </Box>
          <Box flex="1">
            <Text fontSize="10" fontFamily="light" mb="1">
              Top 5.8% of all creators
            </Text>

            <Flex direction="row" alignItems={"center"} justifyContent="center">
              <Button
                h="7"
                pt="0"
                pb="0"
                bg="primary"
                flex={1}
                onPress={() =>
                  navigation.navigate("Edit_Profile", {
                    description: description,
                    about: about,
                  })
                }
                _text={{
                  fontFamily: "bold",
                }}
              >
                Edit Profile
              </Button>
              <Center>
                <Box maxW="300">
                  <Select
                    accessibilityLabel="Choose Service"
                    placeholder=""
                    value=""
                    borderWidth={0}
                    dropdownIcon={
                      <Feather name="more-vertical" size={24} color="black" />
                    }
                    onValueChange={() => {}}
                  >
                    <Select.Item
                      key={1}
                      label={
                        <Pressable
                          onPress={() => {
                            navigation.navigate("Setting");
                          }}
                        >
                          <Flex direction="row" width="100%">
                            <AntDesign
                              name="setting"
                              size={24}
                              color="black"
                              alignItems="center"
                              justifyContent="space-between"
                            />
                            <Text fontSize={18} ml={5}>
                              Setting
                            </Text>
                          </Flex>
                        </Pressable>
                      }
                      value=""
                    />
                    <Select.Item
                      key={2}
                      label={
                        <Pressable
                          onPress={() => navigation.navigate("MyActivity")}
                        >
                          <Flex direction="row" width="100%">
                            <AntDesign name="hearto" size={24} color="black" />
                            <Text fontSize={18} ml={5}>
                              Your Activity
                            </Text>
                          </Flex>
                        </Pressable>
                      }
                      value=""
                    />
                    <Select.Item
                      key={3}
                      label={
                        <Pressable
                          onPress={() => navigation.navigate("Insights")}
                        >
                          <Flex direction="row" width="100%">
                            <Feather
                              name="bar-chart-2"
                              size={24}
                              color="black"
                            />
                            <Text fontSize={18} ml={5}>
                              Insights
                            </Text>
                          </Flex>
                        </Pressable>
                      }
                      value=""
                    />

                    <Select.Item
                      key={4}
                      label={
                        <Pressable
                          onPress={() => navigation.navigate("Wallet")}
                        >
                          <Flex direction="row" width="100%">
                            <AntDesign name="wallet" size={24} color="black" />
                            <Text fontSize={18} ml={5}>
                              Wallet
                            </Text>
                          </Flex>
                        </Pressable>
                      }
                      value=""
                    />
                    <Select.Item
                      key={5}
                      label={
                        <Pressable
                          onPress={() =>
                            navigation.navigate("CollaborationHistory")
                          }
                        >
                          <Flex direction="row" width="100%">
                            <MaterialIcons
                              name="history"
                              size={24}
                              color="black"
                            />
                            <Text fontSize={18} ml={5}>
                              Collaboration History
                            </Text>
                          </Flex>
                        </Pressable>
                      }
                      value=""
                    />
                    <Select.Item
                      key={6}
                      label={
                        <Flex direction="row" width="100%">
                          <Ionicons
                            name="people-outline"
                            size={24}
                            color="black"
                          />
                          <Text fontSize={18} ml={5}>
                            Discover People
                          </Text>
                        </Flex>
                      }
                      value=""
                    />
                    <Select.Item
                      key={6}
                      label={
                        <Pressable
                          onPress={() => navigation.navigate("AddGrapes")}
                        >
                          <Flex direction="row" width="100%">
                            <MaterialCommunityIcons
                              name="fruit-grapes-outline"
                              size={24}
                              color="blue"
                            />
                            <Text fontSize={18} ml={5}>
                              Add Grapes
                            </Text>
                          </Flex>
                        </Pressable>
                      }
                      value=""
                    />
                    <Select.Item
                      key={7}
                      p={0}
                      label={
                        <Center flex={1} w={"100%"} py={4}>
                          <Pressable onPress={logout}>
                            <Text
                              fontSize={22}
                              textAlign="center"
                              fontWeight={"800"}
                              color="primary"
                              width={Dimensions.get("window").width}
                            >
                              Logout
                            </Text>
                          </Pressable>
                        </Center>
                      }
                      value=""
                    />
                  </Select>
                </Box>
              </Center>

              {/* <DropDownMenu
                icon={<Feather name="more-vertical" size={24} color="black" />}
                options={[
                  {
                    text: "Logout",
                    onPress: logout,
                    icon: (
                      <Ionicons
                        name="information-circle-outline"
                        size={16}
                        color="gray"
                      />
                    ),
                  },
                ]}
              /> */}
            </Flex>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text fontSize="12" color="gray.700" fontFamily="light">
          {description
            ? description
            : " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrycenturies, but also the leap into electronic typesetting, has been the industrycenturies, but als has been the industrycenrem …more"}
        </Text>
      </Box>
    </Box>
  );
};

export default HeaderContainer;
