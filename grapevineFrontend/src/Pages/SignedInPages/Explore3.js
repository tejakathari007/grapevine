import React from 'react';
import { ScrollView } from 'react-native';
import { View } from 'native-base';
import { Box, Text, Flex, Image } from 'native-base';
import {
  AtomComponents,
  MolecularComponents,
  Layout,
} from '../../Exports/index';
const data = [1, 2, 3, 4, 5, 6];
const Explore3 = () => {
  const { Box1 } = MolecularComponents;
  const { Search } = AtomComponents;

  const { SignInLayout } = Layout;

  return (
    <SignInLayout>
      <Box h='100%' w='100%' mb={70}>
        <View>
          <View px={30} mt={10}>
            <Search />
          </View>
          <View mt={30}>
            <Text fontSize={22} fontWeight='800' ml={3} mb={1}>
              Posts
            </Text>
            <Flex direction='row' justifyContent='space-around'>
              <Image
                alt='image'
                width={'24%'}
                height={100}
                source={require('../../../assets/Images/1.png')}
              />
              <Image
                alt='image'
                width={'24%'}
                height={100}
                source={require('../../../assets/Images/2.png')}
              />
              <Image
                alt='image'
                width={'24%'}
                height={100}
                source={require('../../../assets/Images/3.png')}
              />
              <Image
                alt='image'
                width={'24%'}
                height={100}
                source={require('../../../assets/Images/4.png')}
              />
            </Flex>
          </View>
          <View mt={30}>
            <Text fontSize={22} fontWeight='800' ml={3} mb={1}>
              Featured
            </Text>
            <Text fontSize={12} fontWeight='800' ml={5} mb={1}>
              Creators
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.map((d) => (
                <Box1 key={d} />
              ))}
            </ScrollView>
          </View>
        </View>
      </Box>
    </SignInLayout>
  );
};

export default Explore3;
