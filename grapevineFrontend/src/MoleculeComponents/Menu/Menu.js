import { Text, Box, Pressable, Menu } from 'native-base';
import React, { useState } from 'react';
const DropDownMenu = ({ icon, options, textStyle }) => {
  const [shouldOverlapWithTrigger] = useState(false);
  return (
    <Menu
      shouldOverlapWithTrigger={shouldOverlapWithTrigger}
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <Box>{icon}</Box>
          </Pressable>
        );
      }}
    >
      {options &&
        options.map(({ text, onPress, icon }) => {
          return (
            <Menu.Item onPress={onPress} key={text} p={0}>
              <Box
                flex='1'
                flexDir='row'
                justifyContent='flex-start'
                mx='5'
                alignItems='center'
              >
                {icon}
                <Text
                  fontWeight={'500'}
                  fontSize={12}
                  textAlign='center'
                  color='gray.500'
                  my={0}
                  {...textStyle}
                  fontFamily='bold'
                >
                  {text}
                </Text>
              </Box>
            </Menu.Item>
          );
        })}
    </Menu>
  );
};

export default DropDownMenu;
