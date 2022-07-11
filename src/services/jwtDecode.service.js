'use strict'
const jwtDecode = require('jwt-decode');
import storage from './storage.service';
import { Platform } from 'react-native';
/**
 * Method to decode jwt token
 * and return Info
 */
class jwtServices {
    constructor(){
        this._tokenDecode = jwtDecode;
        this._asyncStorage = new storage();
        this._currentPlatform = Platform.OS;
    }
    async _getAuthToken() {
        let authToken = await this._asyncStorage._readData('authToken');
        return authToken;
    }     
    async _getAuthTokenInfo() {
        let authToken = await this._getAuthToken();
        let authTokenInfo = null;
        if(authToken) {
            authTokenInfo = await this._tokenDecode(authToken);
            authTokenInfo['token'] = authToken;
            authTokenInfo['deviceType'] = this._currentPlatform.toLowerCase();
        }
        return authTokenInfo;
    }  
}

export default jwtServices;
