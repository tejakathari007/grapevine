import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Box = ({ width }) => {
  return <View style={[styles.container, { width: width }]}></View>;
};

export default Box;

const styles = StyleSheet.create({
  container: {
    height: 23,
    borderRadius: 5,
    borderWidth: 1,
    borderColor:
      "linear-gradient(90deg, rgba(81,98,241,1) 0%, rgba(121,73,231,1) 100%)",
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
});
