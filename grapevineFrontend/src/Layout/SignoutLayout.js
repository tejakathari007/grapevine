import React from 'react';
import { ScrollView, Box, Center } from 'native-base';

const SignoutLayout = ({ children }) => (
  <Box
    flex={1}
    bg={{
      linearGradient: {
        colors: ['tertiary', 'primary'],
        start: [0, 1],
        end: [0, 0.2],
      },
    }}
    w='100%'
  >
    <Center flex={1}> {children}</Center>
  </Box>
);

export default SignoutLayout;
