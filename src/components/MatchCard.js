import React,{useState} from "react";
import { View, StyleSheet,Text,Image,TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { heightToDp as hp, widthToDp as wp } from './common/ResponsiveUI';
import PlayerScreen from '../screens/live/Player.screen'
function MatchCard({ data }) {
    const [visible,setVisible]=useState(false); 
    return (
      <>
    <TouchableOpacity style={styles.container} onPress={()=>setVisible(true)}>
          <Text style={styles.tittle}>{data.tittle}</Text>
          <Text style={{ color: colors.dark,fontSize:hp(12)}}>{data.time}</Text>
          <View style={styles.container2}>
              {/*<Image source={{ uri: team1Logo }} style={styles.logo} />*/}

              <View style={{alignItems:'center'}}>
                  <Image source={require('../assets/ind.png')} style={styles.logo} />
                  <Text style={styles.teamName}>{ data.team1}</Text>
              </View>

              <View style={{alignItems:'center',backgroundColor:colors.darkBlue,borderRadius:30,height:30,width:30,justifyContent: 'center',}}>
                  <Text style={{fontSize:hp(14),color:colors.white}}>vs</Text>
              </View>
              
              <View style={{alignItems:'center'}}>
                  <Image source={require('../assets/nz.png')} style={styles.logo} />
                  <Text style={styles.teamName}>{ data.team2}</Text>
              </View>
              
          </View>
          <Image source={require('../assets/live.gif')} style={styles.liveGif}/>
    </TouchableOpacity>
    <PlayerScreen visible={visible} setVisible={setVisible} data={data}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {    
        backgroundColor: colors.white,
        borderRadius: hp(5),
        marginHorizontal: wp(5),
        marginVertical: hp(5),
        alignItems: 'center',
        padding:hp(5)
    },
    container2: {    
        flex: 1,
        flexDirection:'row',
        marginHorizontal: wp(5),
        marginVertical: hp(5),
        width:'100%',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal:wp(5)
    },
    tittle: {
        color: colors.secondary,
        fontSize:hp(16)
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    liveGif: {
        width: wp(50),
        height: hp(20),
        position: 'absolute',
        alignSelf:'flex-end'
    },
    teamName: {
        color: colors.dark,
        fontSize: hp(12),
        fontWeight:'bold'
    }
});

export default MatchCard;


