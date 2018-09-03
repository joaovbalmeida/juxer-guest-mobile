import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import QueueScreen from '../screens/queue';
import PlaylistsScreen from '../screens/playlists';
import SongsScreen from '../screens/songs';
import SettingsScreen from '../screens/settings';
import Queue from '../assets/images/queue.png';
import QueueFilled from '../assets/images/queueFilled.png';
import Settings from '../assets/images/settings.png';
import SettingsFilled from '../assets/images/settingsFilled.png';

const EventTab = createBottomTabNavigator({
  QueueTab: {
    screen: QueueScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => ( // eslint-disable-line
        <Image style={{ height: 24, width: 24 }} source={focused ? QueueFilled : Queue} />
      ),
    },
  },
  SettingsTab: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => ( // eslint-disable-line
        <Image style={{ height: 24, width: 24 }} source={focused ? SettingsFilled : Settings} />
      ),
    },
  },
}, {
  initialRouteName: 'QueueTab',
  tabBarOptions: {
    activeTintColor: '#ff005a',
    showLabel: false,
    activeBackgroundColor: '#0E1214',
    inactiveBackgroundColor: '#0E1214',
    style: {
      borderTopColor: '#15191B',
      borderTopWidth: 1,
    },
  },
});

const EventStack = createStackNavigator({
  Home: {
    screen: EventTab,
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: '#0E1214',
        borderBottomWidth: 1,
        borderBottomColor: '#15191B',
      },
    },
  },
  Playlists: PlaylistsScreen,
  Songs: SongsScreen,
}, {
  initialRouteName: 'Home',
});

export default EventStack;
