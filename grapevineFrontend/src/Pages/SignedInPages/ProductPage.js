import {
  View,
  Text,
  Flex,
  Box,
  Input,
  TextArea,
  Button,
  Center,
  Spinner,
  Link,
  Image,
} from "native-base";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Keyboard } from "react-native";
import { UserValue } from "../../Context/UserContext";
import { AtomComponents, Layout } from "../../Exports/index";
import UploadComment from "../../Hooks/Comment/uploadComment";
import GetPost from "../../Hooks/Posts/getPost";

const { RoundImage } = AtomComponents;
const { SignInLayout, BackLayout } = Layout;

const ProductPage = ({ navigation, route }) => {
  const {
    params: { post_uuid },
  } = route;
  const post = GetPost(post_uuid);

  if (post.isLoading) {
    return (
      <Center h="100%" w="100%">
        <Spinner accessibilityLabel="Loading" />
      </Center>
    );
  }
  if (post.isError) {
    return (
      <Center h="100%" w="100%">
        <Image
          source={require("../../../assets/Logo/Logo.png")}
          size={100}
          resizeMode="contain"
          p="5"
          alt="Image"
        />
        <Text
          fontSize="16"
          fontWidth="800"
          color="primary"
          mt="10"
          fontFamily="bold"
        >
          Sorry, no post yet.
        </Text>
      </Center>
    );
  }

  return (
    <BackLayout navigation={navigation} color="black" safeArea>
      <Box h="full" w="full" bg="white">
        <Text
          fontWeight="800"
          fontSize={16}
          textAlign="center"
          mb="2"
          fontFamily="bold"
        >
          Products
        </Text>
        <SignInLayout>
          {post.data?.products?.length > 0 ? (
            post.data.products.map((_product) => {
              return (
                <Flex
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems="center"
                  p={1}
                  key={_product.uuid}
                  borderBottomColor={"#d3d3d3"}
                  borderBottomWidth={1}
                  borderTopColor="#d3d3d3"
                  borderTopWidth={1}
                >
                  <Link href={_product.link} h={"20"} w={"20"}>
                    <Image
                      source={{
                        uri: `https://admin.grapevine-app.co/api/file/${_product.image}`,
                      }}
                      alt="img"
                      h={"20"}
                      w={"20"}
                      flex={1}
                      resizeMethod="resize"
                      resizeMode="contain"
                    />
                  </Link>
                  <Box flex={4} px={2}>
                    <Text fontWeight={"800"} fontSize="16">
                      {_product.name}
                    </Text>
                  </Box>
                </Flex>
              );
            })
          ) : (
            <Box alignItems="center" m="10" fontFamily="bold">
              No Products
            </Box>
          )}
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default ProductPage;
