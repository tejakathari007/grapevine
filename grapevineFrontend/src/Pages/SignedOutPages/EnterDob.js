import { Alert } from "react-native";
import React from "react";
import { Box, Text, Center, View, Select, Flex, Input } from "native-base";
import { AtomComponents, Layout, Hooks } from "../../Exports/index";

const EnterDob = ({ navigation }) => {
  const { ButtonDark, ButtonLight, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const ethinicity = [
    { value: "Asian or Asian British", disable: true },
    { value: "Indian", disable: false },
    { value: "Pakistani", disable: false },
    { value: "Bangladeshi", disable: false },
    { value: "Chinese", disable: false },
    { value: "Any other Asian background", disable: false },
    { value: "Black, Black British, Caribbean or African", disable: true },
    { value: "Caribbean", disable: false },
    { value: "African", disable: false },
    {
      value: "Any other Black, Black British, or Caribbean background",
      disable: false,
    },
    { value: "Mixed or multiple ethnic groups", disable: true },
    { value: "White and Black Caribbean", disable: false },
    { value: "White and Black African", disable: false },
    { value: "White and Asian", disable: false },
    {
      value: "Any other Mixed or multiple ethnic background",
      disable: false,
    },
    { value: "White", disable: true },
    {
      value: "English, Welsh, Scottish, Northern Irish or British",
      disable: false,
    },
    { value: "Irish", disable: false },
    { value: "Gypsy or Irish Traveller", disable: false },
    { value: "Roma", disable: false },
    { value: "Any other White background", disable: false },
    { value: "Other ethnic group", disable: true },
    { value: "Arab", disable: false },
    { value: "Any other ethnic group", disable: false },
  ];

  const validate = () => {
    if (
      // registerData.dob &&
      // registerData.dob.day &&
      // registerData.dob.day.length > 0 &&
      // registerData.dob.month &&
      // registerData.dob.month.length > 0 &&
      // registerData.dob.year &&
      // registerData.dob.year.length > 0 &&
      registerData.gender &&
      registerData.ethinicity
    ) {
      if (
        registerData.account_type == "Brand" ||
        registerData.account_type == "Employee"
      ) {
        navigation.navigate("SearchForBrand");
      } else {
        navigation.navigate("DescribeYouCreator");
      }
    } else {
      Alert.alert("Invalid", "Enter all values");
    }
  };

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation} next onPress={validate}>
          <Box pt="15%" px="5" pb="30">
            <View>
              <View w="100%" alignItems="center">
                <Logo />
              </View>
              <Center mt="15">
                <Text
                  color="#fff"
                  fontWeight={"800"}
                  m="3"
                  fontSize={14}
                  fontFamily="bold"
                >
                  Date Of Birth
                </Text>
                <Flex direction="row">
                  {/* <ButtonLight w={70} h={10} m={1} p={0}> */}
                  <Input
                    borderWidth="2"
                    borderColor="dark"
                    w="70"
                    h="10"
                    color="#fff"
                    placeholder="dd"
                    fontWeight={"800"}
                    fontSize={14}
                    p={0}
                    type="number"
                    keyboardType="number-pad"
                    maxLength={2}
                    textAlign="center"
                    value={registerData.dob ? registerData.dob.day : null}
                    onChangeText={(text) =>
                      setRegisterData({
                        ...registerData,
                        dob: { ...registerData.dob, day: text },
                      })
                    }
                    fontFamily="bold"
                    mr="2"
                  />
                  {/* </ButtonLight> */}
                  {/* <ButtonLight w={70} h={10} m={1} p={0}> */}
                  <Input
                    borderWidth="2"
                    borderColor="dark"
                    w="70"
                    h="10"
                    color="#fff"
                    placeholder="mm"
                    fontWeight={"800"}
                    fontSize={14}
                    p={0}
                    type="number"
                    keyboardType="number-pad"
                    maxLength={2}
                    textAlign="center"
                    value={registerData.dob ? registerData.dob.month : null}
                    onChangeText={(text) =>
                      setRegisterData({
                        ...registerData,
                        dob: { ...registerData.dob, month: text },
                      })
                    }
                    mr="2"
                    fontFamily="bold"
                  />
                  {/* </ButtonLight> */}
                  {/* <ButtonLight w={70} h={10} m={1} p={0}> */}
                  <Input
                    borderWidth="2"
                    borderColor="dark"
                    w={70}
                    h={10}
                    color="#fff"
                    placeholder="yyyy"
                    fontWeight={"800"}
                    fontSize={14}
                    p={0}
                    keyboardType="number-pad"
                    maxLength={4}
                    textAlign="center"
                    value={registerData.dob ? registerData.dob.year : null}
                    onChangeText={(text) =>
                      setRegisterData({
                        ...registerData,
                        dob: { ...registerData.dob, year: text },
                      })
                    }
                    fontFamily="bold"
                  />
                  {/* </ButtonLight> */}
                </Flex>
                <Text
                  color="#fff"
                  fontWeight={"800"}
                  mt="5"
                  mb="3"
                  fontSize={14}
                  fontFamily="bold"
                >
                  Gender
                </Text>
                <Flex w="100%" direction="row" justify="space-around">
                  <ButtonDark
                    w={"40%"}
                    h={10}
                    m={1}
                    rounded="xl"
                    onPress={() =>
                      setRegisterData({ ...registerData, gender: "Male" })
                    }
                    bg={registerData.gender == "Male" ? "dark" : "light"}
                  >
                    <Text
                      fontSize={14}
                      color="#fff"
                      fontWeight={"800"}
                      fontFamily="bold"
                    >
                      Male
                    </Text>
                  </ButtonDark>

                  <ButtonDark
                    w={"40%"}
                    h={10}
                    m={1}
                    rounded="xl"
                    onPress={() =>
                      setRegisterData({ ...registerData, gender: "Female" })
                    }
                    bg={registerData.gender == "Female" ? "dark" : "light"}
                  >
                    <Text
                      fontSize={14}
                      color="#fff"
                      fontWeight={"800"}
                      fontFamily="bold"
                    >
                      Female
                    </Text>
                  </ButtonDark>
                </Flex>
                <ButtonDark
                  w={"70%"}
                  h={10}
                  m={1}
                  onPress={() =>
                    setRegisterData({ ...registerData, gender: "Other" })
                  }
                  bg={registerData.gender == "Other" ? "dark" : "light"}
                  rounded="xl"
                >
                  <Text
                    fontSize={14}
                    color="#fff"
                    fontWeight={"800"}
                    fontFamily="bold"
                  >
                    Prefer not to say
                  </Text>
                </ButtonDark>
                <Text
                  color="#fff"
                  fontWeight={"800"}
                  mt="5"
                  mb="3"
                  fontSize={14}
                  fontFamily="bold"
                >
                  Ethnicity
                </Text>
                <Center>
                  <Select
                    bg="dark"
                    borderRadius={"md"}
                    height="10"
                    width={"70%"}
                    selectedValue={registerData.ethinicity}
                    minWidth="200"
                    color={"#fff"}
                    fontWeight="800"
                    fontFamily="bold"
                    accessibilityLabel="Choose "
                    placeholder="Choose "
                    _selectedItem={{
                      bg: "primary",
                      _text: { color: "white", fontFamily: "bold" },

                      // endIcon: <CheckIcon size="5" />,
                    }}
                    borderWidth="0"
                    mt={1}
                    onValueChange={(itemValue) =>
                      setRegisterData({
                        ...registerData,
                        ethinicity: itemValue,
                      })
                    }
                  >
                    {ethinicity.map((data) =>
                      data.disable ? (
                        <Select.Item
                          disabled
                          label={
                            <Text fontSize={20} fontWeight="800" color="#000">
                              {data.value}
                            </Text>
                          }
                          value={data.value}
                          key={data.value}
                          _text={{
                            fontFamily: "bold",
                          }}
                        />
                      ) : (
                        <Select.Item
                          label={data.value}
                          value={data.value}
                          key={data.value}
                          _text={{
                            fontFamily: "light",
                          }}
                        />
                      )
                    )}
                  </Select>
                </Center>
              </Center>
            </View>
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default EnterDob;
