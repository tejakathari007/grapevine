import { View } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './TabBar.js';
import { TabRoutes } from './Routes';

export const TabNavigation = (props) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderRadius: '50',
          shadowColor: 'black',
          shadowOffset: { width: 2, height: 12 },
          shadowRadius: 50,
          shadowOpacity: 1,
          elevation: 2,
          borderTopLeftRadius: 21,
          borderTopRightRadius: 21,
        },
      }}
      tabBar={(props) => {
        return <TabBar {...props} />;
      }}
    >
      {TabRoutes.map((route) => {
        return (
          <Tab.Screen
            key={route.routeName}
            name={route.routeName}
            component={route.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};
