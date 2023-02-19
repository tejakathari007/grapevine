import React, { useContext } from 'react';
import {
  NativeBaseProvider,
  extendTheme,
  Box,
  KeyboardAvoidingView,
} from 'native-base';
import AuthNavigation from '../Navigation/AuthNavigation';
import { ThemeValue } from '../Context/ThemeContext';
const LinearGradient = require('expo-linear-gradient').LinearGradient;
const Theme = () => {
  const theme = useContext(ThemeValue);

  const customTheme = extendTheme({
    colors: {
      tertiary: '#5162F1',
      secondary: '#714EE9',
      primary: '#7949E7',
      dark: '#3e3682',
      light: '#5251c2',
      linearGradient: {
        colors: ['tertiary', 'primary'],
        start: [0, 1],
        end: [0, 0.2],
      },
    },
  });

  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };
  return (
    <NativeBaseProvider theme={customTheme} config={config}>
      <AuthNavigation />
    </NativeBaseProvider>
  );
};

export default Theme;
