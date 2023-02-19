import React, { useState } from "react";
import {
  Box,
  Text,
  Center,
  View,
  Select,
  CheckIcon,
  Pressable,
} from "native-base";
import { AtomComponents, Layout, Hooks } from "../../Exports/index";
import { ButtonLight } from "../../AtomComponents";
const AccountType = ({ navigation }) => {
  // console.log(Hooks, 'hooks');
  const { ButtonDark, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const [showDropDown, setShowDropDown] = useState(false);
  const type = ["Brand", "Agency"];
  const SetAccountType = (type) => {
    if (type == registerData.account_type) {
      setRegisterData({ ...registerData, account_type: null });
    } else {
      setRegisterData({ ...registerData, account_type: type });
    }
  };

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout
          // navigation={navigation}
          // navigate={
          //   registerData.account_type &&
          //   (registerData.account_type == 'Creator'
          //     ? 'Register'
          //     : registerData.account_type == 'Brand'
          //     ? 'Register_Brand'
          //     : 'Register_Agency')
          // }
          // next
          nextDisabled={registerData.account_type ? false : true}
        >
          <Box pt="5%" px={5}>
            <View>
              <View w="100%" alignItems={"center"}>
                <Logo />
                <Text
                  fontSize={17}
                  color="#fff"
                  fontWeight={"800"}
                  textAlign="center"
                  mt="2"
                  fontFamily="bold"
                >
                  What brings you here
                </Text>
                <Text fontSize="12" color="white">
                  Help us understand what your goal is with GrapeVine.
                </Text>
                <Text fontSize="12" mb="10" color="white">
                  We'll use this to customize your experience.
                </Text>
              </View>
              <Center mt="15" paddingX="10">
                <Pressable
                  w="100%"
                  onPress={() => {
                    setRegisterData({
                      ...registerData,
                      account_type: "Creator",
                    });
                    navigation.navigate("Register");
                  }}
                  bg={"dark"}
                  borderWidth="2"
                  borderColor="dark"
                  borderRadius="lg"
                >
                  <Box padding="2">
                    <Text
                      fontSize={14}
                      color="#fff"
                      fontWeight={"800"}
                      fontFamily="bold"
                      mb="2"
                    >
                      Creator Account
                    </Text>
                    <Text fontSize={12} color="white">
                      I am an independent user looking to connect & collaborate
                      with other creatives and brands.
                    </Text>
                  </Box>
                </Pressable>
                <Pressable
                  w="100%"
                  onPress={() => {
                    navigation.navigate("BusinessAccountOptions");
                  }}
                  bg={"dark"}
                  borderWidth="2"
                  borderColor="dark"
                  borderRadius="lg"
                  mt="5"
                >
                  <Box padding="2">
                    <Text
                      fontSize={14}
                      color="#fff"
                      fontWeight={"800"}
                      fontFamily="bold"
                      mb="2"
                    >
                      Business Account
                    </Text>
                    <Text fontSize={12} color="white">
                      I am a business or a team member within a business, that
                      wishes to connect & collborate with creatives.
                    </Text>
                  </Box>
                </Pressable>
                {/* <ButtonDark
                  w='50%'
                  h={10}
                  bg={showDropDown ? 'dark' : 'light'}
                  onPress={() => {
                    SetAccountType('');
                    setShowDropDown(!showDropDown);
                  }}
                >
                  <Text
                    fontSize={14}
                    color='#fff'
                    fontWeight={'800'}
                    fontFamily='bold'
                  >
                    Business Account
                  </Text>
                </ButtonDark>
                {showDropDown && (
                  <Center>
                    <Select
                      bg='dark'
                      borderRadius={'md'}
                      height='10'
                      width='70%'
                      selectedValue={
                        registerData.account_type
                          ? registerData.account_type
                          : ' '
                      }
                      minWidth='200'
                      color='white'
                      fontWeight='800'
                      fontFamily='bold'
                      accessibilityLabel='Choose '
                      placeholder='Choose '
                      _text={{
                        fontFamily: 'bold',
                      }}
                      _selectedItem={{
                        bg: 'primary',
                        endIcon: <CheckIcon size='5' color='white' />,
                        color: 'white',
                        _text: {
                          color: 'white',
                          fontFamily: 'bold',
                        },
                      }}
                      borderWidth='0'
                      mt={1}
                      onValueChange={(itemValue) => SetAccountType(itemValue)}
                    >
                      {type.map((t) => (
                        <Select.Item
                          label={t}
                          value={t}
                          key={t}
                          _text={{
                            fontFamily: 'light',
                          }}
                        />
                      ))}
                    </Select>
                  </Center>
                        )} */}
              </Center>
            </View>
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default AccountType;
