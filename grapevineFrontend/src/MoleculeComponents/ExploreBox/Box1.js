import { View, Text, Flex, Image, Box } from 'native-base';
import React from 'react';
import RoundImage from '../../AtomComponents/Image/RoundImage';

const Box1 = () => {
  return (
    <View h={350} w={200} m='5'>
      <Box
        h='100%'
        w='100%'
        borderRadius={50}
        shadow='3'
        alignItems='center'
        bg='#fff'
        pt={5}
      >
        <RoundImage image={require('../../../assets/Images/2.png')} size={50} />
        <Text fontSize={16} fontWeight={'800'}>
          Pretty Little Things
        </Text>
        <Flex direction='row' justifyContent='space-around' mt={5} width='100%'>
          <Image
            alt='image'
            width={'30%'}
            height={50}
            source={require('../../../assets/Images/1.png')}
          />
          <Image
            alt='image'
            width={'30%'}
            height={50}
            source={require('../../../assets/Images/2.png')}
          />
          <Image
            alt='image'
            width={'30%'}
            height={50}
            source={require('../../../assets/Images/3.png')}
          />
        </Flex>
        <Flex direction='row' justifyContent={'space-around'} width='100%'>
          <View>
            <Text fontSize={22} fontWeight={'800'} textAlign='center'>
              63
            </Text>
            <Text fontSize={12} fontWeight={'800'} textAlign={'center'}>
              Posts
            </Text>
          </View>
          <View>
            <Text fontSize={22} fontWeight={'800'} textAlign='center'>
              100+
            </Text>
            <Text fontSize={12} fontWeight={'800'} textAlign={'center'}>
              Connections
            </Text>
          </View>
          <View>
            <Text fontSize={22} fontWeight={'800'} textAlign='center'>
              50+
            </Text>
            <Text fontSize={12} fontWeight={'800'} textAlign={'center'}>
              Vouches
            </Text>
          </View>
        </Flex>
        <Text mt={5} fontWeight='800'>
          #1 Featured in fashion
        </Text>
        <Box
          bg='buttonPrimaryColor'
          p='1'
          pr='3'
          pl='3'
          w='80%'
          mt={5}
          borderRadius={'full'}
          alignItems='center'
          _text={{
            fontWeight: '800',
          }}
        >
          Post
        </Box>
      </Box>
    </View>
  );
};

export default Box1;
