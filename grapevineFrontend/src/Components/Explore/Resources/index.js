import { Box, Text } from 'native-base';
import { ResourcesBox } from '../../../MoleculeComponents';

const Resources = () => {
  return (
    <Box mb='5' ml='2'>
      <Text fontWeight='800' fontSize={21} fontFamily='bold'>
        Resources
      </Text>
      <ResourcesBox />
    </Box>
  );
};

export default Resources;
