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
var Util = require('./view/utils')
import Video from 'react-native-video';

import React, {
  AppRegistry,
  AsyncStorage,
  Component,
  StyleSheet,
  TextInput,
  TabBarIOS,
  StatusBarIOS,
  Image,
  Text,
  View
} from 'react-native';

 /**
  * userData
  *  @dynamic
  *  - isLogin
  *    - depends on AsyncStorage.getItem('loginState') 
  *    - '1': true, '0' false
  *    - on login/signup AsyncStorage.setItem('loginState','1') //upon ssh success
  *    - on logout (user.js) AsyncStorage.setItem('loginState','0')
  *  - onSignup
  *    - true: goes to signup page 
  *    - false: goes to login page
  *  - isFirstTime
  *    // get info from server
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

    // to delete; for test purpose only
    AsyncStorage.setItem('uid','aifhioewhfjkdsfhkshgafyeiwfhdsjf');
    // "0" not first time, "1" first time
    AsyncStorage.setItem('isFirstTime','0');
    // end of test

    return({
      isLogin: false,
      onSignup: false,
      isFirstTime: "0",
      uid: "",
      page: <View></View>
    })
  },
  componentWillMount: function () {
    this._renderPage();
  },
  _onStateChange: function (newState) {
    //login ,signup or logout
    this.setState(newState);
    this._renderPage();
  },
  _renderPage: function () {
    var content = null;
    AsyncStorage.getItem("uid").then((value) => {
        this.setState({
          uid: value
        })
        return AsyncStorage.getItem("isFirstTime")
    }).then((value) => {
        this.setState({
          isFirstTime: value
        })
        return AsyncStorage.getItem("loginState")
    }).then((value) => {
      this.setState({
        isLogin: value=="1"? true:false
      })
    }).done(()=>{
      var lsView = null;
      if (this.state.isLogin) {
        content= <Bar
           isFirstTime={this.state.isFirstTime}
           callbackLogout={this._onStateChange}></Bar>
      }else{
        if (this.state.onSignup) {
          lsView = <Signup
               isLogin={this.state.isLogin}
               onSignin={this.state.onSignin}
               callbackSignup={this._onStateChange}></Signup>
        }else{
          lsView = <Login
               isLogin={this.state.isLogin}
               onSignin={this.state.onSignin}
               callbackLogin={this._onStateChange}></Login>
        }
        content = <View style={styles.container}>
                <Video source={{uri: "in"}}
                  style={styles.bgImageWrapper}
                  rate={0.5}
                  resizeMode="cover" repeat={true} key="video1" />
                <View>
                  <Image style={styles.logo} source={require('./view/img/dna15.png')}></Image>
                  <Text style={styles.logoText}>华大DNA</Text>
                </View>
                {lsView}
              </View>
      }  
      //update state in promise
      this.setState({
        page: content
      }) 
    });

  },
  render:function () {
    return this.state.page
  }

})

const styles = StyleSheet.create({
  container:{
    paddingTop:50,
    alignItems:'center',
    backgroundColor:"#222",
    height: Util.size.height,
    width: Util.size.width
  },
  bgImageWrapper: {
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0,
      height: Util.size.height,
      width: Util.size.width
  },
  logo:{
    width:70,
    height:70,
    resizeMode: Image.resizeMode.contain,
    marginBottom: 10
  },
  logoText:{
    color: "#fff",
    backgroundColor: "transparent",
    marginBottom:Util.ratio == 2? 40:50,
    fontSize: 16
  },
});

AppRegistry.registerComponent('DNA', () => DNA);
