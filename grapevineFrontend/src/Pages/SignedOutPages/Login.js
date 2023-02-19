import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Center,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
} from 'native-base';
import { grapevineBackend } from '../../API/index';
import { Formik } from 'formik';
import Toast from 'react-native-root-toast';
import { ActivityIndicator } from 'react-native';
import { AtomComponents, Layout, Hooks, Modal } from '../../Exports/index';

const { SignupSchema } = require('../../FormValidationSchema');
const Login = ({ navigation }) => {
  const { ButtonDark, Input, InputPassword } = AtomComponents;
  const { SignoutLayout, BackLayout } = Layout;
  const { LoadingMessageModal } = Modal;
  const { user, setUser } = Hooks.ContextHook();
  const [loading, setLoading] = useState(false);
  const logIn = (data) => {
    setLoading(true);
    grapevineBackend(
      '/auth/login',
      { email: data.email.toLowerCase(), password: data.password },
      'POST'
    )
      .then(async ({ data }) => {
        console.log(data);
        try {
          if (data.status) {
            await AsyncStorage.setItem('user', JSON.stringify(data.data));
            setUser({
              ...data.data,
              ...user,
            });
          } else {
            setLoading(false);
            if (typeof data.message == 'string') {
              Toast.show(data.message, {
                duration: Toast.durations.LONG,
              });
            } else {
              throw Error('Something Went Wrong');
            }
          }
        } catch (err) {
          Toast.show(err.message, {
            duration: Toast.durations.LONG,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        Toast.show(err.message, {
          duration: Toast.durations.LONG,
        });
        setLoading(false);
      });
  };
  return (
    <SignoutLayout>
      <BackLayout navigation={navigation} navigate='LoginSignup'>
        <KeyboardAvoidingView enabled behavior='padding'>
          <View alignItems='center' mb='5'>
            <Center
              h={150}
              w={150}
              bg='rgba(0,0,0,0.25882352941176473)'
              borderRadius={'md'}
            >
              <Text
                color={'#fff'}
                fontSize='16'
                fontWeight='800'
                position={'absolute'}
                bottom={1}
                fontFamily='bold'
              >
                Face ID
              </Text>
            </Center>
          </View>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={logIn}
            validationSchema={SignupSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                <Text color='white' fontFamily='bold'>
                  Username, Email or Phone Number
                </Text>
                <Input
                  value={values.email}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  status={errors.email ? 'danger' : 'normal'}
                />
                <Text color='white' fontFamily='bold' pt='5'>
                  Password
                </Text>

                <InputPassword
                  value={values.password}
                  onChangeText={handleChange('password')}
                  status={errors.password ? 'danger' : 'normal'}
                  onBlur={handleBlur('password')}
                />

                <Text color='white' fontFamily='bold' textAlign='right'>
                  Forgot Password?
                </Text>

                <View mt='10'>
                  {loading ? (
                    <ButtonDark>
                      <ActivityIndicator size='small' color='#fff' />
                    </ButtonDark>
                  ) : (
                    <ButtonDark onPress={handleSubmit}>Login</ButtonDark>
                  )}

                  <Pressable
                    onPress={() => navigation.navigate('ContinueWith')}
                    pt='5'
                  >
                    <Text textAlign='center' color='white' fontFamily='bold'>
                      Don't have an account?{' '}
                      <Text color='dark' fontFamily='bold'>
                        Sign Up
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </BackLayout>
    </SignoutLayout>
  );
};

export default Login;
