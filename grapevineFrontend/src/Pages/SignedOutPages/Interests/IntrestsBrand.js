import React, { useState } from 'react';
import { View, Text, Flex, Center, Box } from 'native-base';
import { AtomComponents, Layout, Hooks } from '../../../Exports/index';

const InterestsBrand = ({ navigation }) => {
  const { ButtonDark, InputIntrests, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const [showInput, setShowInput] = useState(false);
  const [inputData, setInputData] = useState('');

  const select = (tag) => {
    let index = registerData.intrests.indexOf(tag);
    let temp = registerData.intrests;
    if (index == -1) {
      temp.push(tag);
    } else {
      temp.splice(index, 1);
    }
    setRegisterData({ ...registerData, intrests: temp });
  };

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout
          navigation={navigation}
          navigate='ConnectNetworks'
          next
          nextDisabled={registerData.intrests.length <= 0}
        >
          <Box pt={'15%'} px='2%' justifyContent={'space-between'} pb={30}>
            <View>
              <Box w='100%' alignItems={'center'}>
                <Logo />
                <Text
                  fontSize={17}
                  color='#fff'
                  fontWeight={'800'}
                  textAlign='center'
                  mt={10}
                  fontFamily='bold'
                >
                  What is the nature of your brand?
                </Text>
                <Text
                  fontSize={13}
                  fontWeight='300'
                  color='#fff'
                  mt={5}
                  fontFamily='bold'
                >
                  We’ll personalise your expreience based on your answers
                </Text>
              </Box>
              <Box my={10} alignItems='center'>
                <Flex direction='row' justifyContent='space-around' w='100%'>
                  <ButtonDark
                    h={10}
                    w='30%'
                    onPress={() => select('Fashion')}
                    bg={
                      registerData.intrests &&
                      registerData.intrests.indexOf('Fashion') != -1
                        ? 'dark'
                        : 'light'
                    }
                  >
                    <Text
                      fontSize={11}
                      color='#fff'
                      fontWeight={'800'}
                      fontFamily='bold'
                    >
                      Fashion
                    </Text>
                  </ButtonDark>
                  <ButtonDark
                    h={10}
                    w='35%'
                    onPress={() => select('Beauty')}
                    bg={
                      registerData.intrests &&
                      registerData.intrests.indexOf('Beauty') != -1
                        ? 'dark'
                        : 'light'
                    }
                  >
                    <Text fontSize={11} color='#fff' fontWeight={'800'}>
                      Beauty & Wellness
                    </Text>
                  </ButtonDark>
                  <ButtonDark
                    h={10}
                    w='30%'
                    onPress={() => select('Fitness')}
                    bg={
                      registerData.intrests &&
                      registerData.intrests.indexOf('Fitness') != -1
                        ? 'dark'
                        : 'light'
                    }
                  >
                    <Text fontSize={11} color='#fff' fontWeight={'800'}>
                      Fitness
                    </Text>
                  </ButtonDark>
                </Flex>
                <Flex direction='row' justifyContent='center' w='100%' mt='5'>
                  <ButtonDark
                    h={10}
                    w='30%'
                    onPress={() => select('Entertaintment')}
                    bg={
                      registerData.intrests &&
                      registerData.intrests.indexOf('Entertaintment') != -1
                        ? 'dark'
                        : 'light'
                    }
                  >
                    <Text fontSize={11} color='#fff' fontWeight={'800'}>
                      Entertaintment
                    </Text>
                  </ButtonDark>
                  <View w='5%'></View>
                  <ButtonDark
                    h={10}
                    w='30%'
                    onPress={() => select('Lifestyle')}
                    bg={
                      registerData.intrests &&
                      registerData.intrests.indexOf('Lifestyle') != -1
                        ? 'dark'
                        : 'light'
                    }
                  >
                    <Text fontSize={11} color='#fff' fontWeight={'800'}>
                      Lifestyle
                    </Text>
                  </ButtonDark>
                </Flex>
                <Flex
                  direction='row'
                  justifyContent='space-around'
                  w='100%'
                  mt='5'
                >
                  <ButtonDark
                    h={10}
                    w='30%'
                    onPress={() => setShowInput(!showInput)}
                    bg={showInput ? 'dark' : 'light'}
                  >
                    <Text fontSize={11} color='#fff' fontWeight={'800'}>
                      Other
                    </Text>
                  </ButtonDark>
                </Flex>

                {showInput && (
                  <Center w='100%' mt='5'>
                    <InputIntrests
                      color='#fff'
                      value={inputData}
                      onChangeText={(text) => setInputData(text)}
                    />
                  </Center>
                )}
              </Box>
            </View>
            {/* <Center w='100%'>
              {registerData.brand_type && registerData.brand_type.length > 0 ? (
                <ButtonDark
                  w='80%'
                  h={10}
                  onPress={() => navigation.navigate('ConnectNetworks')}
                >
                  <Text fontSize='14' color='#fff' fontWeight='800'>
                    Next
                  </Text>
                </ButtonDark>
              ) : (
                <ButtonDark w='80%' h={10} bg='buttonDarkClick'>
                  <Text fontSize='14' color='#fff' fontWeight='800'>
                    Next
                  </Text>
                </ButtonDark>
              )}
            </Center> */}
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default InterestsBrand;
