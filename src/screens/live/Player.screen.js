import React, { useEffect, useState } from 'react';
import {View,Text, StyleSheet, Modal,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IVSPlayer from 'amazon-ivs-react-native';
import axios from 'axios';
import { Table, Row } from 'react-native-table-component';
import cheerio from 'react-native-cheerio';

import colors from '../../config/colors';
import { heightToDp as hp, widthToDp as wp } from '../../components/common/ResponsiveUI';
import PlayerChildren from '../../components/PlayerChildren';
 
function Player({ data, visible, setVisible }) {
  const [cricBuzzData, setData] = useState();
  const [scoreCard, setScoreCard] = useState(false);
  const [commentary, setCommentary] = useState();
  useEffect(() => {
    updateData();
  }, [])
  async function updateData() {
    axios({
      method: 'GET',
      url: data.cricBuzzUrl
    }).then(function (response) {
  
      const $ = cheerio.load(response.data);
  
      var title = $("h4.ui-header").text();
      var update = $("div.cbz-ui-status").text();
      var batteamscore = $('span.ui-bat-team-scores').text();
      var bowlteamscore = $('span.ui-bowl-team-scores').text();
      var batsman = $('span.bat-bowl-miniscore').eq(0).text();
      var batsman2 = $('span.bat-bowl-miniscore').eq(1).text();
      var batsmanrun = $('td[class="cbz-grid-table-fix "]').eq(6).text();
      var batsmanrun2 = $('td[class="cbz-grid-table-fix "]').eq(11).text();
      var ballsfaced = $('span[style="font-weight:normal"]').eq(0).text();
      var ballsfaced2 = $('span[style="font-weight:normal"]').eq(1).text();
      var fours = $('td[class="cbz-grid-table-fix "]').eq(7).text();
      var fours2 = $('td[class="cbz-grid-table-fix "]').eq(12).text();
      var sixes = $('td[class="cbz-grid-table-fix "]').eq(8).text();
      var sixes2 = $('td[class="cbz-grid-table-fix "]').eq(13).text();
      var strikerate = $('td[class="cbz-grid-table-fix "]').eq(9).text();
      var strikerate2 = $('td[class="cbz-grid-table-fix "]').eq(14).text();
      var bowler = $('span.bat-bowl-miniscore').eq(2).text();
      var bowlerover = $('td[class="cbz-grid-table-fix "]').eq(21).text();
      var bowlermaidens = $('td[class="cbz-grid-table-fix "]').eq(22).text();
      var bowlerruns = $('td[class="cbz-grid-table-fix "]').eq(23).text();
      var bowlerwickets = $('td[class="cbz-grid-table-fix "]').eq(24).text();
      var partnership = $("span[style='color:#333']").eq(0).text();
      var recentballs = $("span[style='color:#333']").eq(2).text();
      var lastwicket = $("span[style='color:#333']").eq(1).text();
      var runrate = $("span[class='crr']").eq(0).text();
  
      var livescore = ({
        title: title || "Data Not Found",
        update: update || "Data Not Found",
        batteamscore: batteamscore || "Data Not Found", 
        bowlteamscore: bowlteamscore || "Data Not Found",
        batsman: batsman || "Data Not Found",
        batsman2: batsman2 || "Data Not Found",
        batsmanrun: batsmanrun || "Data Not Found",
        batsmanrun2: batsmanrun2 || "Data Not Found",
        ballsfaced: ballsfaced || "Data Not Found",
        ballsfaced2: ballsfaced2 || "Data Not Found",
        fours: fours || "Data Not Found",
        fours2: fours2 || "Data Not Found",
        sixes: sixes || "Data Not Found",
        sixes2: sixes2 || "Data Not Found",
        strikerate: strikerate || "Data Not Found",
        strikerate2: strikerate2 || "Data Not Found",
        bowler: bowler || "Data Not Found",
        bowlerover: bowlerover || "Data Not Found",
        bowlermaidens:bowlermaidens|| "Data Not Found",
        bowlerruns: bowlerruns || "Data Not Found",
        bowlerwickets: bowlerwickets || "Data Not Found",
        partnership: partnership || "Data Not Found",
        recentballs: recentballs || "Data Not Found",
        lastwicket: lastwicket || "Data Not Found",
        runrate: runrate || "Data Not Found",
      });
      setData(livescore);
    }).catch(function (error) {
      if (!error.response) {
        console.log('API URL is Missing' + error);
      } else {
        console.log('Something Went Wrong - Enter the Correct API URL');
      }
    });
  }
  return (
    <Modal 
    visible={visible}
    onRequestClose={()=>setVisible(false)}    
    animationType="slide"
    style={{backgroundColor:colors.primary}}
      >
      <View style={styles.playerContainer}>
              <IVSPlayer
                streamUrl="https://m-c02-j2apps.s.llnwi.net/hls/7014.ABPNews.in.m3u8"
                autoplay
                children={<PlayerChildren close={setVisible}/>}
              />  
      </View>
      {cricBuzzData&&<View style={styles.bottomBar}>
        <Text style={{color:colors.white,fontWeight:'bold',fontSize:hp(14)}}>{cricBuzzData.title}</Text>
        <Text style={{fontSize:hp(10)}}>{cricBuzzData.update}</Text>
      </View>}
      <View style={styles.bottomBar}>
        <View style={{ flexDirection: 'row',alignItems:'center',marginBottom:hp(5) }}>
          <Image source={require('../../assets/ind.png')} style={styles.logo} />
          <Text style={{ color: colors.white, fontSize: hp(14) }}>{cricBuzzData&&cricBuzzData.bowlteamscore}</Text>
        </View>
        <View style={{ flexDirection: 'row',alignItems:'center' }}>
          <Image source={require('../../assets/nz.png')} style={styles.logo} />
          <Text style={{ color: colors.white, fontSize: hp(14) }}>{cricBuzzData&&cricBuzzData.batteamscore}</Text>
        </View>
      </View>

      <View style={{backgroundColor:colors.primary,borderBottomWidth: hp(1)}}>
        <TouchableOpacity onPress={() => { setScoreCard(!scoreCard); updateData()}}style={{width:'100%',height:hp(32),flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{color:'#989898',marginLeft:wp(7),fontWeight:'bold'}}>
                        Score Card
                    </Text>
                  <Ionicons color={'#989898'} style={{ marginRight: wp(7) }} name={!scoreCard?"ios-chevron-down":"ios-chevron-up"} size={25}/>
                 </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {cricBuzzData&&scoreCard&&<Table>
          <Row flexArr={[3,1,1,1,1]} data={['Batting', 'R', '4s', '6s', 'SR']} style={styles.headStyle} textStyle={styles.TableText} />
          <Row flexArr={[3,1,1,1,1]} data={[cricBuzzData.batsman, cricBuzzData.batsmanrun, cricBuzzData.fours, cricBuzzData.sixes, cricBuzzData.strikerate]} style={styles.HeadStyle} textStyle={styles.TableText} />
          <Row flexArr={[3, 1, 1, 1, 1]} data={[cricBuzzData.batsman2, cricBuzzData.batsmanrun2, cricBuzzData.fours2, cricBuzzData.sixes2, cricBuzzData.strikerate2]} style={styles.HeadStyle} textStyle={styles.TableText} />
          <Text style={{ marginLeft: wp(7),marginVertical:hp(7),fontWeight:"bold"}}>{'Partnership: '+cricBuzzData.partnership}</Text>
          <Row flexArr={[3,1,1,1,1]} data={['Bowling', 'O', 'M', 'R', 'W']} style={styles.headStyle} textStyle={styles.TableText} />
          <Row flexArr={[3,1,1,1,1]} data={[cricBuzzData.bowler, cricBuzzData.bowlerover, cricBuzzData.bowlermaidens, cricBuzzData.bowlerruns, cricBuzzData.bowlerwickets]} style={styles.HeadStyle} textStyle={styles.TableText} />
        </Table>}
      </View>  
      <View style={{ height: 50, width: '100%', backgroundColor: colors.primary, borderTopWidth: hp(1) }}></View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  list: {
        backgroundColor: colors.primary,
  },
    playerContainer: {
      height: hp(200),
      backgroundColor:colors.black
  },
  logo: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight:wp(5)
  },
  bottomBar: {
    width: '100%',
    backgroundColor: colors.primary,
    borderBottomWidth: hp(1),
    paddingLeft: wp(7),
    paddingVertical:hp(5)
  },
  container: { 
    flex:1,
    backgroundColor: colors.primary,
    paddingHorizontal: wp(5),
    paddingVertical: hp(5),
    padding:hp(5)
  },
  HeadStyle: { 
    alignContent: "center",
    backgroundColor: colors.primary,
  },
  headStyle: { 
    alignContent: "center",
    backgroundColor: colors.secondary,
    borderRadius:hp(5)
  },
  TableText: { 
    margin: hp(5)
  }
  
});

export default Player;

