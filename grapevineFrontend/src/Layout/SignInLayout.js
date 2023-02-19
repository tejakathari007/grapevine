import { Box, ScrollView } from 'native-base';
import React from 'react';

const SignInLayout = (props) => {
  return (
    <Box flex={1} bg='#fff'>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        h='100%'
        w='100%'
        nestedScrollEnabled
      >
        <Box h='100%' w='100%'>
          {props.children}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SignInLayout;
