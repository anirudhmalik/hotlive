import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import { heightToDp as hp, widthToDp as wp } from './common/ResponsiveUI';
function ChannelCard({ data,setData }) {
  const baseurl = 'https://qqcdnpictest.mxplay.com/';
    return (
    <TouchableOpacity
        style={styles.container}
        onPress={() => setData(data)}
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


