import React, { useEffect } from 'react';
import { Box, Center, Text, Image, Flex } from 'native-base';
import PostHeader from './PostComponents/PostHeader';
import CommentsContainer from './PostComponents/CommentsContainer';
import LikeContainer from './PostComponents/LikeContainer';

import ColorWrapper from '../../AtomComponents/ColorWrapper/ColorWrapper';
const Post = () => {
  return (
    <Box w='100%'>
      <Box p='2'>
        <PostHeader />
      </Box>
      <Box w='100%'>
        <Flex
          position='absolute'
          zIndex={3}
          direction='row'
          justifyContent='space-between'
          w='100%'
          pl='5'
          pr='5'
          mt='5'
        >
          <ColorWrapper>
            <Image
              alt='image'
              h={18}
              w={18}
              source={require('../../../assets/Icons/Instagram_light.png')}
            />
          </ColorWrapper>
        </Flex>
        <Image
          alt='image'
          w={'100%'}
          source={require('../../../assets/Images/2.png')}
        />
      </Box>
      <Box>
        <LikeContainer />
      </Box>
      <Box p='2'>
        <CommentsContainer />
      </Box>
    </Box>
  );
};

export default Post;
