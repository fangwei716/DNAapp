/**
 * HUADA DNA APP
 *  Native Views (modules)
 *  - Login/Signup
 *  - Bar 
 *    - Store
 *      - StoreItems
 *      - ItemDetails
 *        - Alipay
 *      - placeOrder
 *    - Update
 *    - Order
 *    - User
 *   
 *  Some parts I have no idea what contents are
 *  - settings
 *  - about
 *  - order detail
 *  
 *  Some pages requires WebView (has to use/ better with webpage to handle)
 *  can pass token to the WebView
 *  - alipay linking (see alipay api)
 *  - alipay payment (jump to alipay app if using its api)
 *  - upload ID copies
 *  - promotes and updates
 *  - tracking
 *  - help
 *  - service
 *  - change phone number
 *  
 *  Some api needed
 *  - sharing 
 *  
 *  * search SSH to locate places that need SSH
 *  persist the login status within the app by storing the token on the device using react natives AsyncStorage api.
 *  https://facebook.github.io/react-native/docs/asyncstorage.html#content
 */

'use strict';
var Login = require('./view/login');
var Signup = require('./view/signup');
var Bar = require('./view/bar')

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TextInput,
  TabBarIOS,
  StatusBarIOS,
  Text,
  View
} from 'react-native';

 /**
  * userData
  *  @dynamic
  *  - isLogin
  *    - true: goes into main view
  *    - false: on login/signup page
  *  - onSignup
  *    - true: goes to signup page
  *    - false: goes to login page
  *  - isFirstTime
  *    - true: first time user. Only have access to user info
  *    - false: The user infos have filled and verified
  *    
  *  Data Flow
  *  userData ->  Login
  *           ->  Signup
  *           ->  Bar ->  User
  */

var DNA = React.createClass({
  getInitialState:function() {
    StatusBarIOS.setStyle(1);
    // get via SSH here
    var userData = {
      isLogin: true,
      onSignup: false,
      isFirstTime: false,
    }
    return({
      isLogin: userData.isLogin,
      onSignup: userData.onSignup,
      isFirstTime: userData.isFirstTime,
    });
  },
  _onStateChange: function (newState) {
    //login ,signup or logout
    this.setState(newState);
  },
  render:function () {
    if (this.state.isLogin) {
      return (
        <Bar
         isFirstTime={this.state.isFirstTime}
         callbackLogout={this._onStateChange}></Bar>
      );
    }else{
      if (this.state.onSignup) {
        return(
          <Signup
           isLogin={this.state.isLogin}
           onSignin={this.state.onSignin}
           callbackSignup={this._onStateChange}></Signup>
        )
      }else{
        return (
          <Login
           isLogin={this.state.isLogin}
           onSignin={this.state.onSignin}
           callbackLogin={this._onStateChange}></Login>
        );
      }

    }  
  }

})

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('DNA', () => DNA);
