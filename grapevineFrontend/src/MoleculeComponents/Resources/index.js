import { Box, ScrollView, Text } from 'native-base';

const ResourcesBox = () => {
  return (
    <Box ml='2'>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        mr='2'
        my='2'
      >
        <Text fontWeight='600' fontFamily='bold'>
          Engagement
        </Text>
        <Text fontSize='12' fontWeight='600' fontFamily='light'>
          See all →
        </Text>
      </Box>
      <ScrollView horizontal mb='5'>
        {[0, 1, 2].map((node) => {
          return (
            <Box
              key={node}
              width='300'
              height='200'
              bg={{
                linearGradient: {
                  colors: ['violet.800', 'orange.300'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }}
              m='1'
              rounded='xl'
            >
              <Text
                textAlign='center'
                mt='81'
                fontSize='md'
                fontWeight='800'
                color='white'
                fontFamily='bold'
              >
                Coming soon...
              </Text>
            </Box>
          );
        })}
      </ScrollView>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        mr='2'
        my='2'
      >
        <Text fontWeight='600' fontFamily='bold'>
          Content Creation
        </Text>
        <Text fontSize='12' fontWeight='600' fontFamily='light'>
          See all →
        </Text>
      </Box>
      <ScrollView horizontal>
        {[0, 1, 2].map((node) => {
          return (
            <Box
              key={node}
              width='300'
              height='200'
              bg={{
                linearGradient: {
                  colors: ['lightBlue.300', 'violet.800'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }}
              m='1'
              rounded='xl'
            >
              <Text
                textAlign='center'
                mt='81'
                fontSize='md'
                fontWeight='800'
                color='white'
                fontFamily='bold'
              >
                Coming soon...
              </Text>
            </Box>
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default ResourcesBox;
