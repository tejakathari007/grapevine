import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Flex,
  Center,
  Box,
  Radio,
  Pressable,
  Input,
  Spinner,
  Button,
  Image,
} from "native-base";
import { AtomComponents, Layout, Hooks } from "../../Exports/index";
import { ButtonDark } from "../../AtomComponents";
import GetBrandUser from "../../Hooks/User/getBrandUser";
import { search } from "react-native-country-picker-modal/lib/CountryService";

const SearchForBrand = ({ navigation }) => {
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { Logo, ButtonLight, InputUsername } = AtomComponents;
  const { registerData, setRegisterData } = Hooks.ContextHook();
  const [searchBrand, setSearchBrand] = useState("");
  const brands = GetBrandUser(1, 5, searchBrand);

  const selectEmployeer = (employerUuid) => {
    setRegisterData((previousData) => {
      return { ...previousData, employerUuid: employerUuid };
    });
    navigation.navigate("EnterJobTitle");
  };

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box pt={"15%"} px="2%" justifyContent={"space-between"} pb={30}>
            <Flex direction="column" justifyContent={"space-between"}>
              <View>
                <Box w="100%" alignItems={"center"}>
                  <Logo />
                  <Text
                    fontSize={17}
                    color="#fff"
                    fontWeight={"800"}
                    textAlign="center"
                    mt={5}
                    fontFamily="bold"
                  >
                    Search for brand
                  </Text>
                  <Text
                    fontSize={13}
                    fontWeight="300"
                    color="#fff"
                    mt={5}
                    fontFamily="light"
                    textAlign={"center"}
                  >
                    Categories help people find accounts like yours. You can
                    change this at any time
                  </Text>
                </Box>
                <Center>
                  <Input
                    mt={5}
                    color="#fff"
                    borderRadius={"md"}
                    bg="dark"
                    h={8}
                    w={"90%"}
                    placeholder="Brand Name"
                    borderWidth={0}
                    value={searchBrand}
                    onChangeText={(text) => setSearchBrand(text)}
                  />
                </Center>
                <Box my={5} p={2}>
                  {brands.isLoading ? (
                    <Center>
                      <Spinner accessibilityLabel="Loading posts" />
                    </Center>
                  ) : (
                    <>
                      {brands.isError ? (
                        <Text
                          textAlign={"center"}
                          fontWeight="600"
                          fontSize={12}
                        >
                          Something Went Wrong
                        </Text>
                      ) : (
                        <View>
                          {brands.data.length >= 1 ? (
                            <View>
                              {brands.data.map((brand) => {
                                return (
                                  <Flex
                                    key={brand.uuid}
                                    direction="row"
                                    justifyContent={"space-between"}
                                    alignItems="center"
                                  >
                                    <Flex
                                      key={brand.uuid}
                                      direction="row"
                                      justifyContent={"flex-start"}
                                      alignItems="center"
                                    >
                                      <Image
                                        source={require("../../../assets/Images/1.png")}
                                        alt="brand image"
                                        h={10}
                                        w={10}
                                        mr={5}
                                      />
                                      <Text
                                        fontWeight="600"
                                        fontSize={12}
                                        color="white"
                                      >
                                        {brand.brand_name}
                                      </Text>
                                    </Flex>

                                    <Button
                                      bg="dark"
                                      onPress={() =>
                                        selectEmployeer(brand.uuid)
                                      }
                                    >
                                      <Text
                                        fontWeight="600"
                                        fontSize={12}
                                        color="white"
                                      >
                                        Choose
                                      </Text>
                                    </Button>
                                  </Flex>
                                );
                              })}
                            </View>
                          ) : (
                            <Center>
                              <Text
                                fontWeight="600"
                                fontSize={12}
                                color="white"
                              >
                                No Brands
                              </Text>
                            </Center>
                          )}
                        </View>
                      )}
                    </>
                  )}
                </Box>
              </View>
            </Flex>
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default SearchForBrand;
