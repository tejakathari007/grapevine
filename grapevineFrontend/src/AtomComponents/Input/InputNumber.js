import React from 'react';
import { Box, Center, View, Select, Input } from 'native-base';
const { country } = require('../../StaticData/countryMap');
const InputNumber = ({ h, w, placeholder, value, onChangeText }) => {
  const [dialCode, setDialCode] = React.useState('');
  React.useEffect(() => {
    console.log(dialCode);
  }, [dialCode]);
  return (
    <Box
      bg='dark'
      h={h ? h : 53}
      w={w ? w : '100%'}
      borderRadius='md'
      flexDirection={'row'}
      justifyContent='center'
      alignItems={'center'}
      m='2'
    >
      <View
        flex={2}
        h='60%'
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection='row'
        borderRightWidth={1}
        borderRightColor='#fff'
      >
        <Center zIndex={1000}>
          <Select
            bg='rgba(61,54,130,0.6705882352941176)'
            borderRadius={'md'}
            fontFamily='bold'
            height='10'
            width={'80%'}
            selectedValue={dialCode}
            color={'#fff'}
            fontWeight='800'
            accessibilityLabel='Choose '
            placeholder='Choose '
            // bg={"red.400"}
            _selectedItem={{
              bg: 'teal.600',
              // endIcon: <CheckIcon size="5" />,
            }}
            borderWidth='0'
            mt={1}
            onValueChange={(itemValue) => {
              setDialCode(itemValue);
            }}
          >
            {country.map((data) => (
              <Select.Item
                // label={
                //   <Flex>
                //     {/* <Image alt="image" source={}/> */}
                //     <Text>{data.dialCode}</Text>
                //   </Flex>
                // }
                label={data.dialCode}
                value={data.dialCode}
                key={data.code}
              />
            ))}
          </Select>
        </Center>
      </View>

      <View
        flex={7}
        h='100%'
        borderRadius={'md'}
        justifyContent='center'
        alignItems={'center'}
      >
        <Input
          h='60%'
          w='100%'
          fontSize={12}
          color='#f5f4ff'
          fontWeight={'800'}
          borderWidth={0}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </Box>
  );
};

export default InputNumber;
