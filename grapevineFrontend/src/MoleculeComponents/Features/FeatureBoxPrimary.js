import React from "react";
import { StyleSheet } from "react-native";
import { Text, Image, View, Flex } from "native-base";
import RoundImage from "../../AtomComponents/Image/RoundImage";
import RegularImage from "../../AtomComponents/Image/RegularImage";

const FeatureBoxPrimary = () => {
  return (
    <View
      w={117}
      ml={5}
      borderRadius={"md"}
      alignItems="center"
      bg="#fff"
      borderWidth={3}
      borderColor=" rgba(81,98,241,0.5)"
      p="5"
    >
      <RoundImage size={30} image={require("../../../assets/Images/1.png")} />
      <Text style={styles.name}>Molly-Mae</Text>
      <Text style={styles.number}>65 +</Text>
      <Text style={styles.collab}>Collabs</Text>
      <Text style={styles.number}>500 +</Text>
      <Text style={styles.collab}>Connections</Text>
      <Text style={styles.number}>3,051</Text>
      <Text style={styles.collab}>Vouches</Text>
      <Flex direction="row" mt={2}>
        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Icons/Instagram.png")}
        />
        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Icons/Youtube.png")}
        />
        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Icons/TikTok.png")}
        />
      </Flex>
    </View>
  );
};

export default FeatureBoxPrimary;

const styles = StyleSheet.create({
  name: {
    fontSize: 11,
    color: "#000",
    fontWeight: "800",
    marginTop: 3,
  },
  number: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 4,
  },
  collab: {
    fontSize: 9,
    fontWeight: "300",
    textAlign: "center",
    lineHeight: 9,
  },
});
