import {
  Box,
  Text,
  Center,
  View,
  Select,
  CheckIcon,
  Flex,
  Input,
} from 'native-base';
import { Country, State, City } from 'country-state-city';
const SelectCountry = ({ onValueChange, value, status }) => {
  return (
    <View w='100%'>
      <Select
        borderBottomColor={
          status == 'normal' ? 'rgba(61,54,130,0.7)' : '#ff0000'
        }
        borderBottomWidth={2}
        h={30}
        width={'100%'}
        selectedValue={value}
        minWidth='200'
        color={'#fff'}
        fontWeight='800'
        fontFamily='bold'
        accessibilityLabel='Choose '
        placeholder='Choose '
        _selectedItem={{
          bg: 'teal.600',
        }}
        borderWidth='0'
        mb={5}
        onValueChange={onValueChange}
      >
        {Country.getAllCountries()
          .slice(0, 50)
          .map((country) => {
            return (
              <Select.Item
                label={country.name}
                value={country.name}
                key={country.name}
              />
            );
          })}
      </Select>
    </View>
  );
};

export default SelectCountry;
