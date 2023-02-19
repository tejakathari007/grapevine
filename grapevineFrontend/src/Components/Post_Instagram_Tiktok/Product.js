import React, { useState } from "react";
import {
  Button,
  Input,
  View,
  Flex,
  Box,
  Text,
  Image,
  Center,
  useToast,
} from "native-base";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Product = ({ products, setProducts }) => {
  const [productName, setProductName] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productImage, setProductImage] = useState({});
  const toast = useToast();
  const addProduct = () => {
    if (productName && productLink && productImage.uri) {
      setProducts((_products) => [
        {
          name: productName,
          link: productLink,
          uri: productImage.uri,
        },
        ..._products,
      ]);
      setProductImage({});
      setProductName("");
      setProductLink("");
    } else {
      toast.show({
        description: "Enter all parameters",
      });
    }
  };
  const removeProduct = (index) => {
    let _products = [...products];
    _products.splice(index, 1);
    setProducts([..._products]);
  };
  const addProductImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!image.cancelled) {
      console.log(image);
      setProductImage({ ...image });
    }
  };
  return (
    <View py={5}>
      <Flex direction="row" justifyContent={"flex-start"} alignItems="center">
        <Flex
          flex={2}
          direction="column"
          justifyContent="flex-start"
          alignItems={"center"}
          height={"100%"}
          pr={5}
        >
          <Text
            fontWeight={"800"}
            fontSize={12}
            fontFamily="light"
            width={"100%"}
            textAlign="center"
          >
            Product Photo
          </Text>
          <Center
            h="95"
            w="100%"
            bg={productImage.uri ? "transparent" : "gray.200"}
            borderRadius={"md"}
            mt={1}
          >
            <Pressable onPress={addProductImage}>
              {productImage.uri ? (
                <Image
                  source={{ uri: productImage.uri }}
                  alt="product image"
                  h="100"
                  w="100"
                />
              ) : (
                <Entypo name="plus" size={42} color="#d3d3d3" />
              )}
            </Pressable>
          </Center>
        </Flex>
        <Flex
          direction="column"
          justifyContent={"center"}
          alignItems="center"
          flex={4}
        >
          <Text
            fontWeight={"800"}
            fontSize={12}
            fontFamily="light"
            width={"100%"}
            textAlign="left"
          >
            Product Name
          </Text>
          <Input
            placeholder=""
            h={8}
            bg={"gray.200"}
            value={productName}
            onChangeText={(text) => setProductName(text)}
          />
          <Text
            fontWeight={"800"}
            fontSize={12}
            fontFamily="light"
            width={"100%"}
            textAlign="left"
            mt={2}
          >
            Product Link
          </Text>
          <Input
            placeholder="http://..."
            h={8}
            bg={"gray.200"}
            value={productLink}
            onChangeText={(text) => setProductLink(text)}
          />
        </Flex>
      </Flex>
      <Center>
        <Button
          bg="primary"
          my={5}
          h={6}
          py={0}
          px={2}
          borderRadius="md"
          onPress={addProduct}
        >
          <Text fontSize={12} fontWeight="800" color="white">
            Add
          </Text>
        </Button>
      </Center>

      <Box borderBottomColor={"#d3d3d3"} borderBottomWidth={1}>
        <Text fontWeight={"800"} fontSize={16} fontFamily="light">
          Total:
          <Text fontWeight={"400"}>{" " + products.length} products</Text>
        </Text>
      </Box>
      {products.map((_product, index) => {
        return (
          <Flex
            direction="row"
            justifyContent={"flex-start"}
            alignItems="center"
            p={1}
            key={index}
            borderBottomColor={"#d3d3d3"}
            borderBottomWidth={1}
          >
            <Image
              source={{ uri: _product.uri }}
              alt="img"
              h={"20"}
              w={"20"}
              resizeMethod="resize"
              resizeMode="contain"
              flex={1}
            />
            <Box flex={4} px={2} h="100%" pt={3}>
              <Text fontWeight={"400"} fontSize="16">
                {_product.name}
              </Text>
            </Box>
            <Pressable onPress={() => removeProduct(index)}>
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

export default Product;
