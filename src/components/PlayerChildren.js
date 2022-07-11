import React,{useEffect, useState} from "react";
import { View, StyleSheet,Text,Image,TouchableWithoutFeedback } from "react-native";
import colors from "../config/colors";
import { heightToDp as hp, widthToDp as wp } from './common/ResponsiveUI';
import Icon from 'react-native-vector-icons/Ionicons';

function PlayerChildren({close}) {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        visible&&setTimeout(() => {
            setVisible(false)
        }, 3000)
    }, [visible])
    
    return (
        <TouchableWithoutFeedback style={styles.transparentContainer} onPress={() =>setVisible(!visible)}>
            <View style={styles.transparentContainer}>
            {visible&&<View style={styles.container}>
                <Icon name={'arrow-back'} color={colors.white} size={hp(24)} style={styles.backButton} onPress={()=>close(false)} />
                <View style={styles.bottomBar}>
                    <View style={styles.bar} />
                    <Image source={require('../assets/live.gif')} style={styles.liveGif} />
                </View>
            </View>
            }
            </View>
        </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    transparentContainer: {    
        flex: 1,
    },
    container: {    
        flex:1,
        backgroundColor: colors.backgorundTransparent,//make it transparent after stream test
        justifyContent: 'space-between',
        paddingLeft:wp(7)
    },
    backButton: {
        marginTop: hp(7),
        elevation:10
    },
    bottomBar: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom:hp(10)
    },
    liveGif: {
        flex:0.1,
        width: wp(30),
        height: hp(15),
    },
    bar: {
        flex: 0.9,
        backgroundColor: colors.white,
        height: hp(2),
        borderRadius:10
    }
    });

export default PlayerChildren;


