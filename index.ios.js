/**
 * HUADA DNA APP
 */
'use strict';
var Login = require('./view/login');
var Signup = require('./view/signup');
var Bar = require('./view/bar')
var Store = require('./view/store')

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

StatusBarIOS.setStyle(1);

// get info via Ajax
var isLogin = true;

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

class DNA extends Component {
  render() {
    if (isLogin) {
      return (
        <Bar></Bar>
      );
    }else{
      return (
        <Login></Login>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DNA', () => DNA);
