import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "native-base";
import { Box, Text } from "native-base";

import {
  AtomComponents,
  MolecularComponents,
  Layout,
  PageComponent,
} from "../../Exports/index";
const data = [1, 2, 3, 4, 5, 6];
const Explore4 = () => {
  const { Box2 } = MolecularComponents;
  const { Search } = AtomComponents;
  const {
    Explore: { Features },
  } = PageComponent;
  const { SignInLayout } = Layout;
  return (
    <SignInLayout>
      <Box h="100%" w="100%" mb={70}>
        <View>
          <View pl={30} pr={30} mt={20}>
            <Search />
          </View>

          <View mt={30}>
            <Text fontSize={22} fontWeight="800" ml={3} mb={1}>
              Resources
            </Text>
            <Text fontSize={16} fontWeight="800" ml={5} mb={1}>
              Engagement
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.map((d) => (
                <Box2 key={d} />
              ))}
            </ScrollView>
            <Text fontSize={16} fontWeight="800" ml={5} mb={1}>
              Content Creation
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.map((d) => (
                <Box2 key={d} />
              ))}
            </ScrollView>
          </View>
          <View mt={30}>
            <Features />
          </View>
        </View>
      </Box>
    </SignInLayout>
  );
};

export default Explore4;
