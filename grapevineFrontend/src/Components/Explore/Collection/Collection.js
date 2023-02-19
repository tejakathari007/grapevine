import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CollectionContainer,
  AllCreators,
} from "../../../MoleculeComponents/index";
const Collection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Collections</Text>
      <CollectionContainer />
      <AllCreators />
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
  headerText: {
    fontSize: 21,
    color: "#000",
    // fontFamily: "Gilroy",
    fontWeight: "800",
    marginLeft: 10,
  },
});
