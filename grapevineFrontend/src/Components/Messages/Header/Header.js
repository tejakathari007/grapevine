import React from "react";
import { Flex, Text, Image, Pressable, Box } from "native-base";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GetLoginUser from "../../../Hooks/User/getLoginUser";
const Header = ({ goBack }) => {
  const user = GetLoginUser();
  const navigation = useNavigation();
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      pr="5"
      pl="5"
    >
      <TouchableOpacity onPress={goBack}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>

      <Text fontSize={14} fontWeight="800">
        Messages
      </Text>
      {user.data?.engagement_type == "Creator" ? (
        <Pressable onPress={() => navigation.navigate("CreateGroup")}>
          <Image
            alt="image"
            source={require("../../../../assets/Icons/add_dark.png")}
            h="5"
            w="5"
          />
        </Pressable>
      ) : (
        <Box h={1} w={1}></Box>
      )}
    </Flex>
  );
};

export default Header;
