import AsyncStorage from '@react-native-community/async-storage';
class Storage {
    constructor(){
        this._asyncStorage = AsyncStorage;
    }

    _storeData = async (key,value) => {
        try{
            await this._asyncStorage.setItem(key,value);
        }catch(error){
            //log this error
        }
    }

    _readData = async (key) => {
        try{
           let data = await this._asyncStorage.getItem(key);
           return data;
        }catch(error){
            //log the error
        }
    }

    _deleteData = async (key) => {
        try{
            await this._asyncStorage.removeItem(key);
        }catch(error){
            //log the error
        }
        
    }
}

export default Storage;

