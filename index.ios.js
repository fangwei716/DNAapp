/**
 * HUADA DNA APP
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
 * DNA
 * - Login/Signup
 * - Bar 
 *   - Store
 *     - StoreItems
 *     - ItemDetails
 *     - placeOrder
 *   - Update
 *   - Order
 *   - User
 */

var DNA = React.createClass({
  getInitialState:function() {
    StatusBarIOS.setStyle(1);
    // get Ajax here
    return({
      isLogin: true,
      onSignup: false,
      isFirstTime: true,
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
