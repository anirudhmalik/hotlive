import React,{useEffect,useState} from 'react';
import {View, StyleSheet,Text,Dimensions,FlatList } from 'react-native';
import VideoPlayer from 'react-native-video-controls';

import ChannelCard2 from '../../components/ChannelCard2';
import colors from '../../config/colors';
import { heightToDp as hp, widthToDp as wp } from '../../components/common/ResponsiveUI';
 
function Player({navigation,route}) {
  const [data, setData] = useState(route.params.data);
  const [playList,setPlayList] = useState(route.params.playList.filter(a => a.id !== data.id));
  const [height, setHeight] = useState(hp(200));
   useEffect(() => {
    determineAndSetOrientation();
    const susbcription = Dimensions.addEventListener('change', determineAndSetOrientation);
    return () => {
      susbcription.remove();
    }
   }, []);
   useEffect(() => (
    setPlayList(playList.filter(a => a.id !== data.id))
  ), [data])
   const determineAndSetOrientation = () => {
    let wt = Dimensions.get('window').width;
    let ht = Dimensions.get('window').height;
    if (wt < ht) {
      setHeight(hp(200));
      } else {
      setHeight(ht);
      }
   }
  return (
    <View style={{flex:1,backgroundColor:colors.primary}}>
            <View style={{width:'100%',height:height,alignItems:'center'}}>
                <VideoPlayer
                    source={{ uri: data.stream.mxplay.hls.main, type: 'm3u8'}}
                    resizeMode={"contain"}       
                    navigator={navigation}
                    disableSeekbar
                    disableTimer
                    disablePlayPause
                    disableVolume                    
                />
            </View>
            <View style={styles.bottomBar}>
                <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: hp(14) }}>{data.title}</Text>
      </View>
      <FlatList
            data={playList}
            numColumns={4}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            renderItem={({item}) => (
              <ChannelCard2 data={item} setData={setData}/>
            )}
            />
   </View>
  );
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: colors.primary,
        borderBottomWidth: hp(1),
        paddingLeft: wp(7),
        paddingVertical:hp(5)
      },
});

export default Player;

