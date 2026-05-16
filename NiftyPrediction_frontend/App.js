
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './screens/Dashboard';
import Watchlist from './screens/Watchlist';
import Orders from './screens/Orders';
import Profile from './screens/Profile';
import Portfolio from './screens/Portfolio';
import Funds from './screens/Funds';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

// Dummy components


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#5B2C6F',
          tabBarInactiveTintColor: '#966fa7ff',
          tabBarStyle: {
            height: 90,
            borderTopWidth: 0.5,
            borderTopColor: '#ccc',
            backgroundColor: '#fff',
          },
          tabBarIcon: ({ focused, color, size }) => {
            size = 22;
            switch (route.name) {
              case 'Home':
                return <Icon  name={focused ? 'home' : 'home'} size={size} color={color} />;
              case 'My lists':
            
                return <Icon  name={focused ? 'format-list-bulleted' : 'format-list-bulleted'} size={size} color={color} />;
              case 'Orders':
                return <MaterialIcons name="shopping-cart" size={size} color={color} />;
              case 'Portfolio':
                return <Ionicons name="briefcase-outline" size={size} color={color} />;
              case 'Funds':
                return <Entypo name="wallet" size={size} color={color} />;
              default:
                return null;
            }
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
          }
        })}
      >
        <Tab.Screen name="Home" component={Dashboard} />
        <Tab.Screen name="My lists" component={Watchlist} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Portfolio" component={Portfolio} />
        <Tab.Screen name="Funds" component={Funds} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
