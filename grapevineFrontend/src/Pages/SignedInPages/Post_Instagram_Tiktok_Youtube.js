import { TextArea, Text, Box, Pressable, Flex, Image } from "native-base";
import React, { useState, useContext } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import PostHeader from "../../MoleculeComponents/Post/PostComponents/PostHeader";
import { UserValue } from "../../Context/UserContext";
import { grapevineBackend } from "../../API";
import Toast from "react-native-root-toast";
import { AtomComponents, Layout, PageComponent } from "../../Exports/index";
import UploadPost from "../../Hooks/Posts/uploadPost";
import { BackLayout } from "../../Layout";
import { MaterialIcons } from "@expo/vector-icons";
import mime from "mime";

const Post_Instagram_Tiktok_Youtube = ({ navigation, route }) => {
  const { Tiktokvideo, YoutubeVideo } = AtomComponents;
  const {
    Post_Instagram_Tiktok: { SelectOptions },
  } = PageComponent;
  const { SignInLayout } = Layout;
  const [option, setOption] = useState(null);
  const { tiktokVideo, youtubeVideo, type, instagramMedia } = route.params;
  const [user, setUser] = useContext(UserValue);
  const [caption, setCaption] = useState("");
  const [products, setProducts] = useState([]);
  const [inspo, setInspo] = useState("");
  const [persons, setPersons] = useState([]);
  const posts = UploadPost();
  const uploadPost = () => {
    let data = {
      title: "Title",
      post_type: type,
      user_uuid: user.uuid,
      post: caption,
      video_url:
        type == "tiktok"
          ? tiktokVideo.embed_link
          : type == "youtube"
          ? youtubeVideo.id.videoId
          : "",
      image_url: type == "instagram" ? instagramMedia.media_url : "",
      keys: user.intrests,
      username: user.username,
      products: products,
      persons: persons,
      inspo: inspo,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    products.forEach((_product) => {
      formData.append("image", {
        uri: _product.uri,
        type: mime.getType(_product.uri),
        name: _product.uri.split("/").pop(),
      });
    });
    setCaption("");
    posts.mutate(formData);
  };
  return (
    <BackLayout
      navigation={navigation}
      color="black"
      safeArea
      showBackIcon={option ? false : true}
    >
      <Box h="100%" w="100%" bg="#fff" mb={5}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          position="relative"
          pb="5"
          borderBottomWidth="1"
          borderBottomColor="gray.200"
        >
          <Box>
            <Text fontFamily="bold" textAlign="center">
              New Post
            </Text>
          </Box>
          {!option && (
            <Pressable onPress={uploadPost} position="absolute" right="5">
              <Box px="5" py="1" borderRadius="md" bg="primary">
                <Text fontFamily="bold" color="white">
                  Post
                </Text>
              </Box>
            </Pressable>
          )}
        </Box>
        <SelectOptions
          option={option}
          close={() => setOption(null)}
          products={products}
          setProducts={setProducts}
          persons={persons}
          setPersons={setPersons}
          inspo={inspo}
          setInspo={setInspo}
        />
        <SignInLayout>
          <Box p="2" flexDirection="row" mb="2">
            <Box width={81} height={70}>
              {type == "tiktok" && (
                <Tiktokvideo
                  uri={tiktokVideo.embed_link}
                  size={81}
                  buttonSize={20}
                />
              )}
              {type == "youtube" && (
                <YoutubeVideo
                  video_id={youtubeVideo.id.videoId}
                  height={81}
                  width={81}
                />
              )}
              {type == "instagram" && (
                <Image
                  source={{ uri: instagramMedia.media_url }}
                  height={81}
                  width={81}
                />
              )}
            </Box>

            <Box px="2" flex="1" ml="5">
              <Box display="flex" justifyContent="center" mb="2">
                <Text fontSize={14} fontFamily="bold">
                  Caption
                </Text>
                <Box w="10" h="1" bg="primary" ml="2" borderRadius="full"></Box>
              </Box>

              <TextArea
                placeholder="Write a Caption..."
                w="100%"
                h={10}
                fontFamily="light"
                bg="gray.100"
                borderWidth="1"
                _focus={{
                  bg: "gray.100",
                }}
                onChangeText={(text) => setCaption(text)}
                value={caption}
              />
            </Box>
          </Box>
          <Pressable onPress={() => setOption("product")}>
            <Flex
              borderWidth={1}
              borderColor="#d3d3d3"
              p={3}
              direction="row"
              justifyContent="space-between"
            >
              <Text fontWeight={"800"} fontSize={16} fontFamily="light">
                Products
              </Text>
              <MaterialIcons name="arrow-right-alt" size={24} color="black" />
            </Flex>
          </Pressable>
          <Pressable onPress={() => setOption("people")}>
            <Flex
              borderBottomWidth={1}
              borderBottomColor="#d3d3d3"
              p={3}
              direction="row"
              justifyContent="space-between"
            >
              <Text fontWeight={"800"} fontSize={16} fontFamily="light">
                People
              </Text>
              <MaterialIcons name="arrow-right-alt" size={24} color="black" />
            </Flex>
          </Pressable>
          <Pressable onPress={() => setOption("inspo")}>
            <Flex
              borderBottomWidth={1}
              borderBottomColor="#d3d3d3"
              p={3}
              direction="row"
              justifyContent="space-between"
            >
              <Text fontWeight={"800"} fontSize={16} fontFamily="light">
                Inspo
              </Text>
              <MaterialIcons name="arrow-right-alt" size={24} color="black" />
            </Flex>
          </Pressable>
          <Flex p={3} direction="row" justifyContent="space-between">
            <Text fontWeight={"800"} fontSize={16} fontFamily="light">
              Preview
            </Text>
          </Flex>

          <Box display="flex" justifyContent={"center"} alignItems="center">
            <Box
              w="70%"
              alignItems="center"
              style={{
                shadowColor: "gray.200",
                shadowOffset: { width: "0", height: "1" },
                shadowRadius: "1",
                elevation: 4,
                shadowOpacity: "0.5",
              }}
              borderRadius="10"
              bg="white"
            >
              <PostHeader username={user.username} type="tiktok" />

              <Box w="100%" mt="5">
                {type == "tiktok" && (
                  <Tiktokvideo uri={tiktokVideo.embed_link} />
                )}
                {type == "youtube" && (
                  <YoutubeVideo video_id={youtubeVideo.id.videoId} />
                )}
                {type == "instagram" && (
                  <Image
                    alt="instagram image"
                    source={{ uri: instagramMedia.media_url }}
                    height={200}
                  />
                )}
              </Box>
              <Box
                w="full"
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                p="2"
              >
                <Text mr="2" fontFamily="bold">
                  {user.username}
                </Text>
                <Text fontFamily="light">{caption}</Text>
              </Box>
            </Box>
          </Box>

          <Pressable onPress={uploadPost} alignItems="center" mb="10" mt="5">
            <Box
              bg="primary"
              p="1"
              pr="3"
              pl="3"
              w="80%"
              borderRadius={"md"}
              alignItems="center"
              _text={{
                fontFamily: "bold",
                color: "white",
              }}
            >
              Post
            </Box>
          </Pressable>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default Post_Instagram_Tiktok_Youtube;
