import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FeatureBoxPrimary } from "../../../MoleculeComponents/index";
const Features = () => {
  const tempData1 = [1, 2, 3, 4, 5, 6];
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> This Week Features</Text>
      <View style={{ marginTop: 10 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {tempData1.map((data) => (
            <FeatureBoxPrimary key={data} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 21,
    color: "#000",
    // fontFamily: "Gilroy",
    fontWeight: "800",
    marginLeft: 10,
  },
});
