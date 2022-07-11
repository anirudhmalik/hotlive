import React, { Component } from 'react';
import { StyleSheet, FlatList, RefreshControl, View, Text } from 'react-native';

import httpUrl from '../../config/environment';
import httpService from '../../services/ApiManager.service';
import jwtDecodeService from '../../services/jwtDecode.service';
import { heightToDp as hp, widthToDp as wp } from '../../components/common/ResponsiveUI';

import MovieCard from "../../components/MovieCard"
import colors from "../../config/colors"



export default class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page:1
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
    //  this._onRefresh();
    //});
  }

  _onRefresh=()=> {    
    this.setState({ refreshing: true })
    this._fetchTrending();
  }

  _fetchTrending = async() => {
    let method = 'GET';
    let url = `https://api.mxplayer.in/v1/web/detail/browseItem?&pageSize=100&isCustomized=true&pageNum=${this.state.page}&type=1`;
    let response  = await this._httpService._doHttpRequest(
      url,
      method
    );
    if (response.data) {
      var re =new RegExp('^' + 'https://m-storagellnw-j2apps.s.llnwi.net', 'i');
      var filtered = response.data.items.filter(a => a.stream.provider == "mxplay");
      var filtered2 = filtered.filter(function (item) {
        const { high, base } = item.stream.hls;
        if (high) {
        return !re.test(high)         
        } else if (base) {
          return !re.test(base)         
        }
      })
      this.setState({ movies: [...this.state.movies, ...filtered2],refreshing: false,page:this.state.page+1})
    }
    
  };
  

  render() {
    return (
        <FlatList
        style={{backgroundColor:colors.primary}}
        numColumns={3}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
        data={this.state.movies}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<View style={{margin:hp(10)}}>
        <Text style={{fontWeight:"bold",color: colors.white,fontSize: hp(14),textAlign:'center'}}>Movies</Text>     
        </View> 
         }
        renderItem={({ item }) => { return (<MovieCard data={item} playList={this.state.movies} />) }}
        onEndReached={()=>this._fetchTrending()}
        onEndReachedThreshold={1}
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


