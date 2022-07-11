import { Alert } from 'react-native';
const moment = require('moment');
import logOutService from './userLogOut.service';
import jwtServices from './jwtDecode.service';

class userSession {
    constructor(props) {
        this._props = props;
        this._jwtDecodeService = new jwtServices();
        this._logOut = new logOutService(props);
        this._timeOut = null;
    }
    async _getTokenExpiry(tokenType) {
        let tokenInfo = null;
        if(tokenType === 'authToken'){
            tokenInfo = await this._jwtDecodeService._getAuthTokenInfo();
        }else {
            tokenInfo = await this._jwtDecodeService._getProjectTokenInfo();
        }
        let formatedDate = moment(tokenInfo.expiryDate).toDate();
        let tokenExpiry = new Date(formatedDate).getTime();
        return tokenExpiry;
    }
    async _checkUserAuthorization(token_type) {
        let token_expiry_time = await this._getTokenExpiry(token_type);
        let currentTime = Date.now();
        let isValidToken = token_expiry_time - currentTime;
        if(isValidToken > 0){
            return true;
        }else {
            return false;
        }
    }
    async _setSessionTimeOut() {
        let tokenExpiryTime = await this._getTokenExpiry();
        let sessionTimeOut = tokenExpiryTime - Date.now();
        this._handleSession(sessionTimeOut);
    }

    _handleSession(timeOut) {
        const self = this;
        clearTimeout(self._timeOut);
        this._timeOut = setTimeout(function(){
            self._handleLogout();
        },10000)
    }

    _handleLogout() {
        if(this._props) {
            Alert.alert(
                'User Session Expired',
                'Please login again',
                [
                  {text: 'OK',onPress: () => this._logOut._logOutUser() },
                ],
                {cancelable: false},
            );
        }
    }
}
export default userSession;
