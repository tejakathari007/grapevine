import { View, Text, Flex, Center, Button, TextArea } from "native-base";
import React, { useState } from "react";

const Inspo = ({ inspo, setInspo, close }) => {
  const [text, setText] = useState(inspo);
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
          Inspo
        </Text>

        <TextArea
          h={20}
          placeholder="Search"
          value={text}
          onChangeText={(_text) => setText(_text)}
        />

        {/* <Input
          h={8}
          bg={"gray.200"}
          placeholder="Search"
          value={text}
          onChangeText={(_text) => setText(_text)}
          w={"30%"}
        /> */}
      </Flex>
      <Center>
        <Button
          bg="primary"
          my={5}
          h={6}
          py={0}
          px={2}
          borderRadius="md"
          onPress={() => {
            setInspo(text);
            close();
          }}
        >
          <Text fontSize={12} fontWeight="800" color="white">
            Done
          </Text>
        </Button>
      </Center>
    </View>
  );
};

export default Inspo;
