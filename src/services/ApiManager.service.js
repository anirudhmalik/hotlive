'use strict'
import axios from 'axios';
import userSessionService from './userSession.service';

class ApiService {
  constructor(props) {
    this._httpObj = axios;
    this._url = '';
    this._body = {};
    this._methodType = '';
    this._userSession = new userSessionService(props);
  }
  /**Create URL, Method, Body To Send Request */
  async _doHttpRequest(url, method = 'GET', body = {},formData) {
    this._methodType = method.toUpperCase();
    this._url = url;
    if (body) {
      this._body = body;
    }
    if (formData) {
      axios.defaults.headers.common['accesskey'] = `G3448R10at9mD3209etRA20d8iNgla3p`;
      axios.defaults.headers.common['Content-Type'] = `multipart/form-data`;      
    } else {
      axios.defaults.headers.common['accesskey'] = `G3448R10at9mD3209etRA20d8iNgla3p`;
    }
    let response = await this._internetGateway();
    let responseCode = response.data.statusCode;
    if (response) {
      if (responseCode === 401) {
        this._userSession._handleLogout();
      }
      return response;
    }
  }

  /**Channel For All Type Of Request And Return Response From Server */
  _internetGateway() {
    switch (this._methodType) {
      case 'GET':
        return this._httpObj.get(this._url);
      case 'POST': 
        return this._httpObj.post(this._url, this._body)
      case 'DELETE':
        return this._httpObj.delete(this._url);
      case 'PUT':
        return this._httpObj.put(this._url, this._body);
      case 'PATCH':
        return this._httpObj.patch(this._url, this._body);
      default:
        return 'Invalid Method Request : 400 Method (' + this._methodType + ') not allowed ';
    }
  }
}

export default ApiService;



