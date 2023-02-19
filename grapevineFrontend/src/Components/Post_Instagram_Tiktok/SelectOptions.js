import React, { useMemo, useState } from "react";
import { View, Flex, Text, Box, Pressable, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import Product from "./Product";
import People from "./People";
import Inspo from "./Inspo";
const SelectOptions = ({
  close,
  option,
  products,
  setProducts,
  persons,
  setPersons,
  inspo,
  setInspo,
}) => {
  const layout = useMemo(() => {
    switch (option) {
      case "people":
        return <People persons={persons} setPersons={setPersons} />;

      case "product":
        return <Product products={products} setProducts={setProducts} />;

      case "inspo":
        return <Inspo inspo={inspo} setInspo={setInspo} close={close} />;
    }
  }, [option, products, persons]);
  if (option)
    return (
      <View
        w="100%"
        h="100%"
        bg="white"
        px={5}
        position="absolute"
        zIndex={99999}
      >
        <Flex
          direction="column"
          alignItems={"center"}
          justifyContent="space-between"
          height={"100%"}
          pb={2}
        >
          <Box w="100%">
            <Flex
              direction="row"
              alignItems={"center"}
              justifyContent="flex-start"
            >
              <Text
                fontWeight={"800"}
                fontSize={16}
                fontFamily="light"
                width={"100%"}
                textAlign="center"
              >
                {option}
              </Text>
              <Pressable onPress={close} position="absolute" zIndex={110000}>
                <AntDesign name="arrowleft" size={28} color={"#000"} p="2" />
              </Pressable>
            </Flex>
            <Box width="100%">{layout}</Box>
          </Box>

          <Box width={"100%"}>
            <Button
              bg="primary"
              width="100%"
              height={10}
              _text={{
                fontWeight: "800",
              }}
              onPress={close}
            >
              Done
            </Button>
          </Box>
        </Flex>
      </View>
    );
  return <></>;
};

export default SelectOptions;
