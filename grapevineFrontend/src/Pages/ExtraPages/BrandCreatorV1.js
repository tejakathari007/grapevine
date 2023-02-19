import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SignoutLayout } from '../../Layout/index';
import { Box } from 'native-base';
// import ShowLogInText from "../../MoleculeComponents/ShowLogInText";

import { BackIcon, ButtonDark, Logo } from '../../../AtomComponents/index';
const BrandCreatorV1 = ({ navigation }) => {
  return (
    <SignoutLayout>
      <Box h='100%' w='100%' bg='loginPageBg' style={styles.contaienr}>
        <BackIcon onPress={() => navigation.pop()} />
        <View>
          <View style={styles.logoContainer}>
            <Logo />
            <Text style={styles.headerText}>What brings you to Grapevine?</Text>
            <Text style={styles.headerText2}>
              Select the option that best describes you!
            </Text>
          </View>
          <View style={styles.body}>
            <ButtonDark
              w='70%'
              h={40}
              onPress={() => navigation.navigate('InterestsCreator')}
            >
              <Text style={styles.buttonText}>I’m a Creator</Text>
            </ButtonDark>
            <ButtonDark
              w='70%'
              h={40}
              onPress={() => navigation.navigate('InterestsBrand')}
            >
              <Text style={styles.buttonText}>I’m a Brand</Text>
            </ButtonDark>
            <ButtonDark
              w='70%'
              h={40}
              onPress={() => navigation.navigate('InterestsAgency')}
            >
              <Text style={styles.buttonText}>I’m an Agency</Text>
            </ButtonDark>
            <ButtonDark
              w='70%'
              h={40}
              onPress={() => navigation.navigate('InterestsCreator')}
            >
              <Text style={styles.buttonText}>I’m Exploring</Text>
            </ButtonDark>
          </View>
        </View>
        {/* <ShowLogInText onPress={() => navigation.navigate("Login")} /> */}
      </Box>
    </SignoutLayout>
  );
};

export default BrandCreatorV1;
const styles = StyleSheet.create({
  contaienr: {
    paddingTop: '15%',
    paddingLeft: '2%',
    paddingRight: '2%',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
  },
  headerText2: {
    fontSize: 13,
    fontWeight: '300',
    color: '#fff',
    marginTop: 20,
  },
  body: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 17,
    color: '#fff',
    // fontFamily: "Gilroy",
    fontWeight: '800',
  },
});
