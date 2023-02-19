import { ScrollView } from "react-native";
import React from "react";
import CollectionBox from "./CollectionBox";
import { View } from "native-base";

const CollectionContainer = () => {
  const tempData1 = [
    { title: "Icons", des: "Fashion" },
    { title: "Poker Face", des: "Models" },
    { title: "Cosplay", des: "Gaming" },
    { title: "Stand Up", des: "Comedy" },
    { title: "Cool Kids", des: "Lifestyle" },
    { title: "Art", des: "Art & Design" },
  ];
  return (
    <View style={{ marginTop: 15 }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {tempData1.map((data) => (
          <CollectionBox key={data.title} data={data} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CollectionContainer;
