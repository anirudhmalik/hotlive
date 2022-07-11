'use strict'
import storage from './storage.service';
/**
 * Method to Handle user logout and token clear from local storage
 * props is required for screen navigation
 */
class userLogOut {
    constructor(props) {
        this._asyncStorage = new storage();
        this._props = props;
    }
    async _logOutUser() {
        await this._asyncStorage._deleteData('authToken');      
        await this._asyncStorage._deleteData('deviceToken');
        //this._props.navigation.navigate('root');
    }
}

export default userLogOut;
