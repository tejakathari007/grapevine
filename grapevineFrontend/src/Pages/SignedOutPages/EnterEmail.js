import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, View, Box, Center } from 'native-base';
import { grapevineBackend } from '../../API';
import Toast from 'react-native-root-toast';

import { AtomComponents, Layout, Hooks } from '../../Exports/index';
import ValidateEmail from '../../Hooks/Auth/isEmailValid';

const EnterEmail = ({ navigation }) => {
  const { ButtonLight, InputText, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const [email, setEmail] = useState('');
  const { registerData, setRegisterData } = Hooks.ContextHook();
  const validate = ValidateEmail(
    (response) => {
      setRegisterData({ ...registerData, email: email });
      navigation.navigate('EnterCode', {
        code: response.code,
      });
    },
    (error) => {
      Toast.show(error.message, {
        duration: Toast.durations.LONG,
      });
    }
  );
  const [loading, setLoading] = useState(false);
  const SendCode = () => {
    if (email.length > 0) {
      validate.mutate({ email: email });

      // grapevineBackend(
      //   "/auth/emailIsValid",
      //   {
      //     email: email.toLowerCase(),
      //   },
      //   "POST"
      // )
      //   .then(async (response) => {
      //     if (response.data.status) {
      //       setRegisterData({ ...registerData, email: email });
      //       navigation.navigate("EnterCode", {
      //         code: response.data.data.code + "1",
      //       });
      //     } else {
      //       Toast.show(response.data.message, {
      //         duration: Toast.durations.LONG,
      //       });
      //     }
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     console.log("Err", err);
      //     setLoading(false);
      //   });
    }
  };

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box pt='15%' px={5} pb='30'>
            <View>
              <View w='100%' alignItems='center'>
                <Logo />
                <Text
                  fontSize={17}
                  color='#fff'
                  fontWeight={'800'}
                  textAlign='center'
                  mt='5'
                  fontFamily='bold'
                >
                  We’ll send you a verification code
                </Text>
              </View>
              <View mt={15}>
                <Text
                  fontSize={12}
                  color='#f5f4ff'
                  fontWeight={'800'}
                  mb='2'
                  fontFamily='bold'
                >
                  Your Email{' '}
                </Text>
                <Center>
                  <InputText
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </Center>
                <View mt='5'>
                  {validate.isLoading ? (
                    <ButtonLight>
                      <ActivityIndicator size='small' color='#ffffff' />
                    </ButtonLight>
                  ) : (
                    <ButtonLight rounded='2xl' onPress={SendCode}>
                      Send Code
                    </ButtonLight>
                  )}
                </View>
              </View>
            </View>
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default EnterEmail;
