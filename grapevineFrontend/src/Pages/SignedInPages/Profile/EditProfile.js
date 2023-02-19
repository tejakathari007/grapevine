import {
  Box,
  Text,
  TextArea,
  Button,
  Spinner,
  Center,
  Flex,
  Row,
  Pressable,
  Avatar,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Layout, Hooks } from "../../../Exports/index";
import UpdateUser from "../../../Hooks/User/updateUser";
import { AtomComponents } from "../../../Exports/index";
import GetInstagramInfo from "../../../Hooks/Instagram/getInstagramInfo";
import GetTiktokInfo from "../../../Hooks/Tiktok/getTiktokInfo";
import { connectAccount as connectTiktokAccount } from "../../../API/Tiktok/connectAccount";
import { connectAccount as connectInstagramAccount } from "../../../API/Instagram/connectAccount";
import { connectAccount as connectGoogleAccount } from "../../../API/Google/connectAccount";

import GetLoginUser from "../../../Hooks/User/getLoginUser";
import * as ImagePicker from "expo-image-picker";
import ChangeProfileImage from "../../../Hooks/User/changeProfileImage";
import mime from "mime";
import GetGoogleInfo from "../../../Hooks/Google/getGoogleInfo";
const { Input, RegularImage } = AtomComponents;
const EditProfile = (props) => {
  const user_info = GetLoginUser();
  const { tiktokLogin } = GetTiktokInfo();
  const InstagramLogin = GetInstagramInfo();
  const googleLogin = GetGoogleInfo();
  const { SignInLayout, BackLayout } = Layout;
  const [description, setDescription] = useState("");
  const updateUser = UpdateUser();

  const update = () => {
    console.log("here");
    if (!updateUser.isLoading) {
      updateUser.mutate({
        data: { description: description },
        user_uuid: user_info.data.uuid,
      });
    }
  };
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

  if (user_info.isLoading) {
    return (
      <Center h="100%" w="100%">
        <Spinner />
      </Center>
    );
  }
  if (user_info.isError || !user_info.data) {
    return (
      <Center h="100%" w="100%">
        <Text>Error</Text>
      </Center>
    );
  }
  useEffect(() => {
    setDescription(user_info.data?.description);
  }, [user_info.data]);
  return (
    <BackLayout navigation={props.navigation} color="#000" safeArea>
      <SignInLayout>
        <Box
          flex={1}
          mx={5}
          my={10}
          flexDirection="column"
          alignItems="flex-start"
        >
          <Center w="100%">
            <Pressable onPress={changeProfile}>
              <Avatar
                alignSelf="center"
                justifyContent="center"
                source={{
                  uri: user_info.data.profile_pic
                    ? `https://admin.grapevine-app.co/api/file/${user_info.data.profile_pic}`
                    : "https://wallpaperaccess.com/full/317501.jpg",
                }}
                size="20"
                m="0.5"
              />
            </Pressable>
            {/* <Box
              h="85"
              w="85"
              borderRadius={"full"}
              borderWidth={3}
              borderColor="primary"
            ></Box> */}
            <Text fontWeight={"800"} color="primary" mt={1}>
              Change profile photo
            </Text>
          </Center>
          <Box w="100%">
            <Box borderTopWidth={"1"} borderTopColor="#d3d3d3">
              <Text fontSize={12} color="gray.600" fontWeight={"800"}>
                About You
              </Text>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Name :
                </Text>
                <Box
                  flex={2}
                  px={2}
                  borderBottomColor="gray.300"
                  borderBottomWidth={2}
                  pb={1}
                >
                  <Text>
                    {user_info.data.fname + " " + user_info.data.lname}
                  </Text>
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Username :
                </Text>
                <Box
                  flex={2}
                  px={2}
                  borderBottomColor="gray.300"
                  borderBottomWidth={2}
                  pb={1}
                >
                  <Text>{user_info.data.username}</Text>
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Location :
                </Text>
                <Box
                  flex={2}
                  px={2}
                  borderBottomColor="gray.300"
                  borderBottomWidth={2}
                  pb={1}
                >
                  <Text>{user_info.data.address}</Text>
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Bio :
                </Text>
                {/* <Box
                  flex={2}
                  px={2}
                  borderBottomColor="gray.300"
                  borderBottomWidth={2}
                  pb={1}
                >
                  <Text>{user_info.data.description}</Text>
                </Box> */}
                <TextArea
                  flex={2}
                  px={2}
                  pb={1}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
              </Row>
            </Box>
            <Box borderTopWidth={"1"} borderTopColor="#d3d3d3" mt={3}>
              <Text fontSize={12} color="gray.600" fontWeight={"800"}>
                Social
              </Text>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Instagram:
                </Text>
                <Box flex={2} px={2}>
                  {user_info.data.instagram_token ? (
                    <RegularImage
                      h={20}
                      w={20}
                      image={require("../../../../assets/Icons/instagram_color.png")}
                    />
                  ) : (
                    <Pressable
                      onPress={() => InstagramLogin(connectInstagramAccount)}
                    >
                      <Text>Add Instagram to your profile</Text>
                    </Pressable>
                  )}
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Youtube:
                </Text>
                <Box flex={2} px={2}>
                  {user_info.data.google_token ? (
                    <RegularImage
                      h={20}
                      w={20}
                      image={require("../../../../assets/Icons/youtube_color.png")}
                    />
                  ) : (
                    <Pressable
                      onPress={() => googleLogin(connectGoogleAccount, false)}
                    >
                      <Text>Add Youtube to your profile</Text>
                    </Pressable>
                  )}
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Tiktok:
                </Text>
                <Box flex={2} px={2}>
                  {user_info.data.tiktok ? (
                    <RegularImage
                      h={20}
                      w={20}
                      image={require("../../../../assets/Icons/TikTok.png")}
                    />
                  ) : (
                    <Pressable
                      onPress={() => tiktokLogin(connectTiktokAccount)}
                    >
                      <Text>Add Toktok to your profile</Text>
                    </Pressable>
                  )}
                </Box>
              </Row>
            </Box>

            <Box mt={5}>
              <Text fontWeight={"800"} fontSize={16} color="primary" my={2}>
                Intrests
              </Text>
              <Flex direction="row">
                {user_info.data.intrests.map((intrest) => {
                  return (
                    <Text
                      key={intrest}
                      p={1}
                      m={1}
                      bg="primary"
                      color="white"
                      borderRadius={5}
                    >
                      {intrest}
                    </Text>
                  );
                })}
              </Flex>
            </Box>
            <Box mt={5}>
              <Text fontWeight={"800"} fontSize={16} color="primary" my={2}>
                Projects
              </Text>
            </Box>
          </Box>
          {description == user_info.data.description ? (
            <Button w="100%" bg="light">
              Update
            </Button>
          ) : (
            <Button bg="primary" w="100%" onPress={update}>
              {updateUser.isLoading ? (
                <Spinner accessibilityLabel="Loading posts" />
              ) : (
                "Update"
              )}
            </Button>
          )}
        </Box>
      </SignInLayout>
    </BackLayout>
  );
};

export default EditProfile;
