import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import jwtDecodeService from './src/services/jwtDecode.service';
import { StatusBar } from 'react-native';
import colors from './src/config/colors';
import StaticServer from 'react-native-static-server';




const App = () => {
   const [user, setUser] = useState(false); 
   const _jwtDecodeService = new jwtDecodeService();
   useEffect(() => {
      const startServer = async () => {
         const newServer = new StaticServer(8080,{ localOnly: true })
         const origin = await newServer.start()
      }
      startServer()
   },[])
   
   const getUser = async() => {
      let currentUser = await _jwtDecodeService._getAuthTokenInfo();      
      currentUser ? setUser(true) : "";
   }
  return (
          <NavigationContainer> 
           <StatusBar
             backgroundColor={colors.primary}
              barStyle={'light-content'}
           />         
          <AppNavigation/>
          </NavigationContainer> 
  );
};
export default App;