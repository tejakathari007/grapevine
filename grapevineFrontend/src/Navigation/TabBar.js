import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View } from 'native-base';
const HomeIcon = require('../../assets/NavIcons/Home.png');
const NetworkIcon = require('../../assets/NavIcons/Network.png');
const SearchIcon = require('../../assets/NavIcons/Search.png');
const AddIcon = require('../../assets/NavIcons/Add.png');
const ProfileIcon = require('../../assets/NavIcons/ProfilepIC.png');
const HomeIconLight = require('../../assets/NavIcons/Home_light.png');
const NetworkIconLight = require('../../assets/NavIcons/Network_light.png');
const SearchIconLight = require('../../assets/NavIcons/Search_light.png');
const Heart = require('../../assets/Icons/Vouches.png');
import { ThemeValue } from '../Context/ThemeContext';
const TabBar = ({ state, descriptors, navigation }) => {
  const [theme, setTheme] = useContext(ThemeValue);
  const [showTabBar, setShowTabBar] = useState(true);

  const Icon = useCallback(
    (lable) => {
      let ans = null;
      switch (lable) {
        case 'Home':
          ans = (
            <View style={styles.IconContainer}>
              <Image
                alt='image'
                source={theme == 'light' ? HomeIcon : HomeIconLight}
                style={styles.icon}
                resizeMethod='scale'
              />
            </View>
          );
          break;
        case 'Activity':
          ans = (
            <View style={styles.IconContainer}>
              <Image
                alt='image'
                source={theme == 'light' ? Heart : Heart}
                style={styles.icon}
                resizeMethod='scale'
              />
            </View>
          );
          break;
        case 'Search':
          ans = (
            <View style={styles.IconContainer}>
              <Image
                alt='image'
                source={theme == 'light' ? SearchIcon : SearchIconLight}
                style={styles.icon}
                resizeMethod='scale'
              />
            </View>
          );
          break;
        case 'Add':
          ans = (
            <View style={styles.addIconContainer} borderRadius='full'>
              <Image
                alt='image'
                source={AddIcon}
                style={styles.addIcon}
                resizeMethod='scale'
              />
            </View>
          );
          break;
        case 'Profile':
          ans = (
            <View style={styles.IconContainer}>
              <Image
                alt='image'
                source={ProfileIcon}
                style={styles.icon}
                resizeMethod='scale'
              />
            </View>
          );
          break;
        default:
      }
      return ans;
    },
    [theme]
  );
  useEffect(() => {
    const TabLessPages = ['Chatroom', 'Messages'];
    if (TabLessPages.includes(state.routeNames[state.index])) {
      setShowTabBar(false);
    } else {
      setShowTabBar(true);
    }
  }, [state]);
  return (
    <View
      style={styles.container}
      h='20'
      bg='#fff'
      zIndex={showTabBar ? 1 : -1}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        if (!Icon(label)) return null;

        return (
          <TouchableOpacity
            accessibilityRole='button'
            testID={options.tabBarTestID}
            onPress={onPress}
            key={route.name}
            style={styles.touchable}
          >
            {Icon(label)}

            {isFocused ? <View style={styles.dot}></View> : <View></View>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(TabBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 24,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 1,
    paddingBottom: 10,
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    mb: 5,
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor:
      'linear-gradient(90deg, rgba(81, 98, 241,1) 0%, rgba(121, 73, 231,1) 100%)',
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    // borderRadius: 50,
    borderColor: 'red',
    marginBottom: 5,
  },
  IconContainer: {
    height: 25,
    width: 25,
    // borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  addIconContainer: {
    height: 20,
    width: 20,
    backgroundColor:
      'linear-gradient(90deg, rgba(81, 98, 241,1) 0%, #7949e7 100%);',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  addIcon: {
    height: 10,
    width: 10,
  },
});
