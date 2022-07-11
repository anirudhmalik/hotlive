import React, { useState ,useRef,useEffect } from "react";
import { Text, TouchableOpacity,View,Dimensions,StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient'
import { Keyboard } from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { heightToDp as hp, widthToDp as wp } from '../../components/common/ResponsiveUI';
import colors from "../../config/colors";
const { width } = Dimensions.get('window');

function BottomTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const [TabBarVisible, setTabBarVisible] = useState(true);
    const keyboardShowListener = useRef(null);
    const keyboardHideListener = useRef(null);
    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setTabBarVisible(false));
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setTabBarVisible(true));
    
    const determineAndSetOrientation = () => {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    if (width < height) {
      setTabBarVisible(true)
      StatusBar.setHidden(false);
      } else {
      setTabBarVisible(false)
      StatusBar.setHidden(true);

      }
   }
  
   useEffect(() => {

    determineAndSetOrientation();
    const susbcription = Dimensions.addEventListener('change', determineAndSetOrientation);

    return () => {
      susbcription.remove();
    }
  }, []);
    if (!TabBarVisible) {
      return null;
    }
    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
    
  
    return (    
      <View
       style={{ flexDirection: 'row',backgroundColor:colors.primary }}>
        
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
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          if (index === 0) {
            return (
              <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1,justifyContent:"center",alignItems:"center",height:hp(50) }}
              >
                <Icon name={"home"} size={hp(24)} color={isFocused ? colors.white : colors.mediumGrey} />
                <Text style={{ color: isFocused ? colors.white : colors.mediumGrey,fontSize:hp(isFocused?14:10) }}>
                  {label}
                 </Text>
            </TouchableOpacity>
            );
          } 
          if (index === 1) {
            return (
              <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1,alignItems:"center",height:hp(50)}}
              >
            </TouchableOpacity>
            );
          }
          if (index === 2) {
            return (
              <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
                style={{
                  flex: 1,
                  backgroundColor:colors.transparent,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 80,
                  width:80,
                  position: "absolute",
                  bottom: hp(4),
                  borderRadius: 50,
                  left: (width / 2) - 40,                             
                }}
              >
                <LinearGradient
                 colors={[colors.primary, colors.secondary]}
                  style={{
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                 }}
                 >
               <Icon2 name={"live-tv"} size={hp(24)} color={colors.danger}/>
                </LinearGradient>
                
               <Text style={{ color: isFocused ? colors.danger : colors.mediumGrey,fontSize:hp(isFocused?14:10) }}>
                  {label}
                 </Text>
            </TouchableOpacity>
            );
          }
          if (index === 3) {
            return (
              <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1,justifyContent:"center",alignItems:"center",height:hp(50) }}
              >
                <Icon2 name={"movie"} size={hp(24)} color={isFocused ? colors.white : colors.mediumGrey}/>
                <Text style={{ color: isFocused ? colors.white : colors.mediumGrey, fontSize:hp(isFocused?14:10)}}>
                  {label}
                 </Text>
            </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  }



export default BottomTabBar;