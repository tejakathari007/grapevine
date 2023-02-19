import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LeatherBoard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Leatherboard</Text>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.boxText}>Fashion</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Food</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Gaming</Text>
        </View>
      </View>
    </View>
  );
};

export default LeatherBoard;

const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 21,
    color: "#000",
    fontWeight: "800",
    marginLeft: 10,
    marginBottom: 10,
  },
  boxContainer: {
    alignItems: "center",
  },
  box: {
    width: 250,
    height: 50,
    backgroundColor:
      "linear-gradient(90deg, rgba(81,98,241,0.5) 0%, rgba(121,73,231,0.5) 100%)",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  boxText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "800",
  },
});
