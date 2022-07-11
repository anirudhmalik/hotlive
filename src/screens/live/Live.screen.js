import React, { Component } from 'react';
import { StyleSheet, FlatList, RefreshControl, View, Text } from 'react-native';

import httpUrl from '../../config/environment';
import httpService from '../../services/ApiManager.service';
import jwtDecodeService from '../../services/jwtDecode.service';
import { heightToDp as hp, widthToDp as wp } from '../../components/common/ResponsiveUI';

import MatchCard from "../../components/MatchCard"
import colors from "../../config/colors"
import ChannelCard from '../../components/ChannelCard';



export default class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveMatches: [{
        id: '1',
        tittle: 'T10 League, 13th Match',
        time:'07:30 pm 21-Nov',
        team1: 'India',
        team2: 'New Zealand',
        team1Logo: '../assets/ind.png',
        team2Logo: '../assets/nz.png',
        playBackUrl: '',
        cricBuzzUrl: 'https://m.cricbuzz.com/live-cricket-scores/38511/2nd-test-pakistan-tour-of-bangladesh-2021',
      }],
      newsChannels: [],
      musicChannels: [],
      moviesChannels:[]
    };
    this._httpBaseUrl = httpUrl.API_ENDPOINT;
    this._httpService = new httpService();
    this._jwtDecodeService = new jwtDecodeService();
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&   this._onRefresh();
  //  this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //  this._onRefresh();
    //});
  }

  _onRefresh=()=> {    
    this.setState({ refreshing: true })
    this._getChannels()
  }
  _getChannels = async () => {
    try {  
      let method = 'GET';
      let url = 'https://api.mxplayer.in/v1/web/live/channels';
      let response = await this._httpService._doHttpRequest(
        url,
        method
      );
      if (response.data) {
        let news = [];
        let music = [];
        let movies = [];
        response.data.channels.forEach(value => {
          if (value.category === 'Music') {
            music.push(value);
          } else if (value.category === 'News') {
            news.push(value)
          }else if (value.category === 'Movies') {
            movies.push(value)
          }
        });
        this.setState({ newsChannels: news, musicChannels: music,moviesChannels:movies,refreshing:false})
      }
    } catch (error) {
      this.setState({ refreshing: false }) 
      console.log("'Oops!Some error occurred'"+error)     
    }
  };

  render() {
    const { newsChannels, musicChannels, moviesChannels } = this.state;
    return (
      <>
        <FlatList
        style={{backgroundColor:colors.primary}}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
        data={this.state.liveMatches}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<View style={{margin:hp(10)}}>
        <Text style={{fontWeight:"bold",color: colors.white,fontSize: hp(14)}}>Live Cricket / IPL</Text>     
        </View> 
         }
        renderItem={({item}) => {  return ( <MatchCard data={item}/> ) }}
          ListFooterComponent={
            <FlatList
            style={{backgroundColor:colors.primary}}
            numColumns={4}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
            data={musicChannels}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={<View style={{margin:hp(10)}}>
            <Text style={{fontWeight:"bold",color: colors.white,fontSize: hp(14)}}>Live Music Channel</Text>     
            </View> 
             }
              renderItem={({ item }) => { return (<ChannelCard data={item} playList={musicChannels}/>) }}
              ListFooterComponent={
                <FlatList
                  style={{ backgroundColor: colors.primary }}
                  numColumns={4}
                  refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
                  data={newsChannels}
                  keyExtractor={(item) => item.id.toString()}
                  ListHeaderComponent={<View style={{ margin: hp(10) }}>
                    <Text style={{ fontWeight: "bold", color: colors.white, fontSize: hp(14) }}>Live News Channel</Text>
                  </View>
                  }
                  renderItem={({ item }) => { return (<ChannelCard data={item} playList={newsChannels }/>) }}
                  ListFooterComponent={
                    <FlatList
                  style={{ backgroundColor: colors.primary }}
                  numColumns={4}
                  refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
                  data={moviesChannels}
                  keyExtractor={(item) => item.id.toString()}
                  ListHeaderComponent={<View style={{ margin: hp(10) }}>
                    <Text style={{ fontWeight: "bold", color: colors.white, fontSize: hp(14) }}>Live Movies Channel</Text>
                  </View>
                  }
                  renderItem={({ item }) => { return (<ChannelCard data={item} playList={ moviesChannels}/>) }}
                />
                   }
                />
              }
            />
           
        }
        />
        
    </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,      
    alignItems: "center",
    justifyContent:'center',
    backgroundColor:colors.primary
  },
  title: {
    marginTop: hp(20),
    fontSize: hp(14),
    color: colors.white,
    fontWeight:"bold"
  },
  subtitle: {
    marginTop:hp(20),
    fontSize: hp(12),
    color: colors.white,
}, 
})


