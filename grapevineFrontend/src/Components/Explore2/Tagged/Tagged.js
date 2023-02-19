import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const Tagged = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.taggedText}>Tagged In:</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>Travel</Text>
        </View>
      </View>
      <View style={styles.photoContainer}>
        <Image
          alt='image'
          style={styles.photo}
          source={require('../../../../assets/Images/1.png')}
        />
        <Image
          alt='image'
          style={styles.photo}
          source={require('../../../../assets/Images/2.png')}
        />
        <Image
          alt='image'
          style={styles.photo}
          source={require('../../../../assets/Images/1.png')}
        />
      </View>
    </View>
  );
};

export default Tagged;

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  taggedText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontWeight: '300',
  },
  box: {
    width: 90,
    height: 23,
    borderRadius: 5,
    backgroundColor:
      'linear-gradient(90deg, rgba(81,98,241,0.5) 0%, rgba(121,73,231,0.5) 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  boxText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
  },
  photoContainer: {
    flexDirection: 'row',
    // backgroundColor: "red",
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  photo: {
    height: 100,
    width: '33%',
  },
});
