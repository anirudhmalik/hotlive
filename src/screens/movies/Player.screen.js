import React, { useState ,useEffect} from 'react';
import {View,Text,Dimensions,FlatList,StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

import { heightToDp as hp, widthToDp as wp } from '../../components/common/ResponsiveUI';
import colors from '../../config/colors';
import MovieCard2 from '../../components/MovieCard2';
import moment from 'moment';

const Player = ({navigation,route}) =>{
    const [height, setHeight] = useState(hp(200));
    const [data, setData] = useState(route.params.data);
    const [playList,setPlayList] = useState(route.params.playList.filter(a => a.id !== data.id));
    const baseurl = 'https://llvod.mxplay.com/'
    const { high, base, main } = data.stream.hls;
    //console.log('high' + high);
  //  console.log('base' + base);
  //  console.log('main' + main);
    var re = new RegExp('^' + 'video', 'i');

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
      
    return(
        <View style={{flex:1,backgroundColor:colors.primary}}>
            <View style={{width:'100%',height:height,alignItems:'center'}}>
                <VideoPlayer
                    source={{ uri: high?baseurl+high:re.test(base)?baseurl+base:base, type: 'm3u8'}}
                    resizeMode={"contain"}
                    seekColor={"#50A5F4"}        
                    navigator={navigation}                        
                />
            </View>
            <View style={styles.bottomBar}>
                <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: hp(14) }}>{data.title}</Text>
                <Text style={{ fontSize: hp(10) }}>{'Release Date • ' + moment(data.releaseDate).format('MMMM, YYYY.')}</Text>
            </View>

            <FlatList
            data={playList}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            renderItem={({item}) => (
              <MovieCard2 data={item} setData={setData}/>
            )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  list: {
        backgroundColor: colors.primary,
    },
  bottomBar: {
    width: '100%',
    backgroundColor: colors.primary,
    borderBottomWidth: hp(1),
    paddingLeft: wp(7),
    paddingVertical:hp(5)
},
});

export default Player