/**
 * HUADA DNA APP
 */
'use strict';
var Login = require('./view/login');
var Signup = require('./view/signup');
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TextInput,
  StatusBarIOS,
  Text,
  View
} from 'react-native';

StatusBarIOS.setStyle('light-content');

/**
 * DNA
 */
class DNA extends Component {
  render() {
    return (
      <Signup></Signup>
    );
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
