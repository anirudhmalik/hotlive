import React from "react";
import { View, StyleSheet,Text,Image,TouchableOpacity,Alert } from "react-native";
import colors from "../config/colors";
import { heightToDp as hp, widthToDp as wp } from './common/ResponsiveUI';

function ProductCard({ data,deleteProduct}) {
 
  return (
      <View style={styles.container}>
          <View style={styles.containerBox}>
                  <Image
                      source={{ uri: data.product_image }}
                      style={{ width: wp(60), height: hp(60),borderRadius:hp(50), backgroundColor: colors.headerBackground }} />
             
              <View style={{marginLeft:wp(10),width:"60%"}}>
                  <Text style={styles.title}>{data.category_name}</Text>
                  <Text style={styles.subtitle}>{data.product_name}</Text>
                  <Text numberOfLines={2} style={styles.description}>{ data.description}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>                  
                  <View style={{height:hp(10)}}></View>
                  <TouchableOpacity
                   style={styles.button}
                   onPress={()=>{
                        Alert.alert(
                      'Alert',
                      'Are you sure you want to delete this Product',
                      [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                        {
                          text: 'OK', onPress: () => {
                           deleteProduct(data.product_id)
                        }},
                      ],
                      { cancelable: false }
                    )
                   }}>
                      <Text style={{color:colors.white,fontSize:10,fontWeight:"bold"}}>DELETE</Text>
                  </TouchableOpacity>
              </View>
          </View>
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {    
    height: hp(100),      
    alignItems: "center",
    backgroundColor:colors.background
    },
    containerBox: {
        width: "90%",
        height: "100%",
        flexDirection:"row",
        alignItems: "center",
        borderBottomWidth: hp(1),
        borderColor:colors.headerBackground
    },
    button: {
        backgroundColor: colors.danger,
        borderRadius: hp(15),
        height: hp(30),
        width: wp(60),
        justifyContent: "center",
        alignItems:"center"
    },
    title: {
        fontSize: hp(12),
        color:colors.grey
    },
    subtitle: {
        marginTop:hp(5),
        fontSize: hp(14),
        color: colors.darkBlue,
        fontWeight:"bold"
    },
    description: {
        marginTop:hp(5),
        fontSize: hp(14),
        color: colors.grey,
       }
});

export default ProductCard;


