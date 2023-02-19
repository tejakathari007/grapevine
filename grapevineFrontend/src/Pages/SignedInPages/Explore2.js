import React from "react";
import { StyleSheet, View } from "react-native";
import { Box } from "native-base";
import { AtomComponents, Layout, PageComponent } from "../../Exports/index";
const Explore2Page = () => {
  const {
    Explore2: { Tagged, Features, Collection, LeatherBoard },
  } = PageComponent;
  const { Search } = AtomComponents;
  const { SignInLayout } = Layout;

  return (
    <SignInLayout>
      <Box h="100%" w="100%">
        <View>
          <View style={styles.searchContainer}>
            <Search />
          </View>
          <View style={styles.taggedContainer}>
            <Tagged />
          </View>
          <View style={styles.taggedContainer}>
            <Tagged />
          </View>
          <View style={styles.featuresContainer}>
            <Features />
          </View>
          <View style={styles.collectionsContainer}>
            <Collection />
          </View>
          <View style={styles.leatherBoardConainer}>
            <LeatherBoard />
          </View>
        </View>
      </Box>
    </SignInLayout>
  );
};

export default Explore2Page;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchContainer: { paddingLeft: 30, paddingRight: 30, marginTop: 20 },
  taggedContainer: { marginTop: 30 },
  leatherBoardConainer: { marginTop: 30 },
  featuresContainer: {
    marginTop: 30,
  },
  collectionsContainer: {
    marginTop: 30,
  },
});
