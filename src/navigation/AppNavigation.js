import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../screens/home/Home.screen"
import Live from '../screens/live/Live.screen'
import Movies from "../screens/movies/Movies.screen"
import Player from "../screens/movies/Player.screen";
import ChannelPlayer from '../screens/live/Player.channel'

import BottomTabBar from "../components/common/BottomTabBar"




const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const LiveStack = createStackNavigator();
const MoviesStack = createStackNavigator();

const AppNavigation = () => ( 
  <Tab.Navigator
    tabBar={props => <BottomTabBar {...props} />}
  >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}    
        />
        <Tab.Screen
            name="Add"
            component={LiveStackScreen}            
        />   
        <Tab.Screen
            name="Live"
            component={LiveStackScreen}            
         />         
        <Tab.Screen
            name="Movies"
            component={MoviesStackScreen}            
        />           
    </Tab.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode={'none'}>
      <HomeStack.Screen
      name="Home"
      component={Home}
    />
  </HomeStack.Navigator>
);
const LiveStackScreen = () => (
  <LiveStack.Navigator headerMode={'none'} >
      <LiveStack.Screen
          name="Live"
          component={Live}
    />
    <LiveStack.Screen
          name="ChannelPlayer"
          component={ChannelPlayer}
      />
  </LiveStack.Navigator>
);
const MoviesStackScreen = () => (
  <MoviesStack.Navigator headerMode={'none'}>
      <MoviesStack.Screen
          name="Movies"
          component={Movies} 
    />
     <MoviesStack.Screen
          name="Player"
          component={Player} 
    />
  </MoviesStack.Navigator>
);

export default AppNavigation;