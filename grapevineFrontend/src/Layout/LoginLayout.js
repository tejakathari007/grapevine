import React from 'react';
import { Box, Text, Flex, Center } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { ButtonDark } from '../AtomComponents';
const LoginLayout = (props) => {
  const { navigate, navigation, children, next, nextDisabled, onPress } = props;
  const onNext = () => {
    navigation.navigate(navigate);
  };

  return (
    <Flex
      h='100%'
      w='100%'
      direction='column'
      justifyContent={'space-around'}
      alignItems='center'
      // zIndex={0}
    >
      <Box w='100%'>{children}</Box>
      <Box w='100%'>
        {next && (
          <Center>
            <ButtonDark
              w='80%'
              bg={!nextDisabled ? 'dark' : 'light'}
              onPress={() => !nextDisabled && (onPress ? onPress() : onNext())}
            >
              <Text
                fontSize={14}
                color='#fff'
                fontWeight={'800'}
                fontFamily='bold'
              >
                Next
              </Text>
            </ButtonDark>
          </Center>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            fontSize={13}
            fontWeight='800'
            color='#fff'
            textAlign={'center'}
            my='2'
            fontFamily='bold'
          >
            Already have an account?{' '}
            <Text color='dark' fontFamily='bold'>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </Box>
    </Flex>
  );
};

export default LoginLayout;
