import { StyleSheet } from "react-native";
import React from "react";
import {
  View,
  Text,
  Pressable,
  Spinner,
  Button,
  Box,
  Center,
} from "native-base";
import RoundImage from "../../AtomComponents/Image/RoundImage";
import { useNavigation } from "@react-navigation/native";
// import GetUser from '../../Hooks/User/getUserInfo';
import ConnectButton from "../User/ConnectButton";
import GetPartialUserInfo from "../../Hooks/User/getPartialUserInfo";

const FeatureBoxSecondary = (props) => {
  const {
    item: { item },
  } = props;

  const navigation = useNavigation();
  const featured_user = GetPartialUserInfo(item.uuid);
  if (featured_user.isLoading || featured_user.isRefetching) {
    return (
      <Box p={10}>
        <Spinner />
      </Box>
    );
  }

  if (featured_user.isError || !featured_user.data) {
    return (
      <Box p={1}>
        <Center w="100%">
          <Text>Error</Text>
        </Center>
      </Box>
    );
  }
  return (
    <Pressable
      w="200"
      m="2"
      p="5"
      alignItems="center"
      bg="#fff"
      shadow="3"
      borderRadius="xl"
      key={featured_user.data.uuid}
      onPress={() =>
        navigation.navigate("FriendProfile", {
          user_uuid: featured_user.data.uuid,
        })
      }
    >
      <RoundImage size="16" image={require("../../../assets/Images/1.png")} />
      <Text fontSize="md" fontWeight="bold" fontFamily="bold">
        {featured_user.data.brand_name ||
          featured_user.data.agency_name ||
          `${featured_user.data.fname} ${featured_user.data.lname}`}
      </Text>
      <Box
        display="flex"
        flexDir="row"
        justifyContent="space-evenly"
        width="full"
        mt="5"
      >
        <Box>
          <Text
            textAlign="center"
            fontWeight="900"
            fontSize="md"
            fontFamily="bold"
          >
            {featured_user.data._count?.posts || "0"}
          </Text>
          <Text textAlign="center" fontSize="10" fontFamily="light">
            Posts
          </Text>
        </Box>
        <Box>
          <Text
            textAlign="center"
            fontWeight="900"
            fontSize="md"
            fontFamily="bold"
          >
            {featured_user.data._count.connections || "0"}
          </Text>
          <Text textAlign="center" fontSize="10" fontFamily="light">
            Connections
          </Text>
        </Box>
        <Box>
          <Text
            textAlign="center"
            fontWeight="900"
            fontSize="md"
            fontFamily="bold"
          >
            {featured_user.data._count.followers || "0"}
          </Text>
          <Text textAlign="center" fontSize="10" fontFamily="light">
            Vouches
          </Text>
        </Box>
      </Box>
      <Text fontSize="10" my="5" fontFamily="light">
        #1 Featured in {`${featured_user.data.intrests[0]} & others`}
      </Text>

      <ConnectButton
        friendship_status={featured_user.data.friendship_status}
        user_uuid={featured_user.data.uuid}
        textAlign="center"
        bg="primary"
        w="3/4"
        height="8"
        p="0"
        rounded="md"
        _text={{
          color: "white",
          fontFamily: "bold",
        }}
      />
    </Pressable>
  );
};

export default FeatureBoxSecondary;
