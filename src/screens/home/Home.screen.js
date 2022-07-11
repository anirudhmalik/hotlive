import React, { Component } from 'react';
import { StyleSheet, FlatList, RefreshControl, View, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import httpUrl from '../../config/environment';
import httpService from '../../services/ApiManager.service';
import jwtDecodeService from '../../services/jwtDecode.service';

import { heightToDp as hp, widthToDp as wp } from '../../components/common/ResponsiveUI';
import colors from "../../config/colors"
import MatchCard from "../../components/MatchCard"


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchData:[],
      refreshing:false
    };

    this._httpBaseUrl = httpUrl.API_ENDPOINT;
    this._httpService = new httpService();
    this._jwtDecodeService = new jwtDecodeService();
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&   this._onRefresh();
   //this._unsubscribe = this.props.navigation.addListener('focus', () => {
  //   this._onRefresh();
  //  });
  }

  _onRefresh=()=> {    
    this.setState({ refreshing: true })
    //this._getData()
    //this._addData()
    this.setState({ refreshing: false })
  };

  async _getData() {
    firestore()
      .collection('dev')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data());
        });
      }).catch((error) => {
        this.setState({ refreshing: false })
        console.error("Error reading document: ", error);
      });
  }

  _addData() {
    firestore()
      .collection('dev')
      .add({
        id: '2',
        tittle: 'T20 League, 19th Match',
        time: '07:30 pm 21-Nov',
        team1: 'Pak',
        team2: 'Ban',
        team1Logo: '../assets/ind.png',
        team2Logo: '../assets/nz.png',
        playBackUrl: '',
        cricBuzzUrl: 'https://m.cricbuzz.com/cricket-commentary/41561/nam-vs-oman-2nd-match-icc-cricket-world-cup-league-two-2019-23',
      })
      .then(() => {
        console.log('data added!');
      }).catch((error) => {
        this.setState({ refreshing: false })
        console.error("Error writing document: ", error);
      });
  }

  render() {
    return (
      <FlatList
        style={{backgroundColor:colors.primary}}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
        data={this.state.matchData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {  return ( <MatchCard data={item}/> ) }}
        />
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
})


