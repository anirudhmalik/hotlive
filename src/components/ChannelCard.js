import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import colors from "../config/colors";
import { heightToDp as hp, widthToDp as wp } from './common/ResponsiveUI';
function ChannelCard({ data, playList }) {
  const baseurl = 'https://qqcdnpictest.mxplay.com/';
  const navigation = useNavigation();
    return (
    <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('ChannelPlayer', { data, playList })}
    >
        <Image
            source={{ uri: baseurl + data.imageInfo[0].url }}
            style={{ width:'100%',height:'100%', borderRadius:hp(5)}} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    container: {
    height: hp(80),  
    width: wp(80),   
    alignItems: "center",
    borderRadius:hp(5),  
    elevation: hp(8),
    backgroundColor:colors.white,
    margin:hp(6)
    },
  });

export default ChannelCard;


