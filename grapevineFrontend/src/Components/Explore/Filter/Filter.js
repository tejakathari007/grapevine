import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Box from "./Box";
const demodata = [
  { id: 1, width: "20%" },
  { id: 2, width: "15%" },
  { id: 3, width: "20%" },
  { id: 4, width: "11%" },
  { id: 5, width: "22%" },
  { id: 6, width: "19%" },
  { id: 7, width: "15%" },
  { id: 8, width: "30%" },
  { id: 9, width: "33%" },
  { id: 10, width: "24%" },
  { id: 11, width: "33%" },
];
// 90% represents the total length of a row
const Filter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Filter by :</Text>
      {demodata.map((data) => (
        <Box key={data.id} width={data.width} />
      ))}
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 14,
    fontWeight: "300",
    // fontFamily: "Gilroy",
  },
});
