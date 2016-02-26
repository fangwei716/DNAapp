var Util = require('./utils')
var Icon = require('react-native-vector-icons/FontAwesome');

import Form from 'react-native-form'

import React, {
  AsyncStorage,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Text,
  Image,
  AlertIOS,
  View
} from 'react-native';

/**
 * Signup
 *  - init state, isFirstTime = true.
 *    For details goes to tab.js
 */

var Signup = React.createClass({
  getInitialState: function () {
    return({
      isLogin: this.props.isLogin,
      onSignup: this.props.onSignup,
      timeStamp: 0
    })
  },
  _signup: function(){
    this._signupSuccess()
    // var onThis = this;
    // Util.post("http://dnafw.com/iosapp/register/",this.refs.form.getValues(),function(resData) {
    //     if (resData) {
    //       if (resData.error) {
    //         AlertIOS.alert('注册失败', '验证码错误');
    //       }else{
    //         onThis._signupSuccess()
    //         AsyncStorage.setItem('loginState',"1")
    //         AsyncStorage.setItem('isFirstTime',"1")
    //         AsyncStorage.setItem('uid',resData.uid)
    //       }
    //     }else{
    //       AlertIOS.alert('注册失败', '服务器无响应');
    //     }
    // })
  },
  _signupSuccess: function () {
    var newState = {
      isLogin: true,
      onSignup: false
    }
    this.setState(newState);
    this.props.callbackSignup(newState);
  },
  _launchLogin: function () {
    var newState = {
      isLogin: false,
      onSignup: false
    }
    this.setState(newState);
    this.props.callbackSignup(newState);
  },
  _getPhoneText: function () {
    // var onThis = this;
    var d = new Date();
    var timeStamp = d.getTime();
    if (this.state.timeStamp == 0 || timeStamp - this.state.timeStamp > 60000) {
      this.setState({
         timeStamp: timeStamp
      })
    // Util.post("http://dnafw.com/iosapp/send_validate_code/",{ 
    //   phone: this.refs.form.getValues().phoneNum,
    //   timeOfOperation: timeStamp
    // },function(resData) {
    //     if (resData) {
    //       if (resData.error) {
    //         AlertIOS.alert('获取验证码失败', '手机号已注册或无效');
    //         onThis.setState({
    //            timeStamp: 0
    //         })
    //       }else{
    //         AlertIOS.alert('获取验证码成功', '已发送到你的手机，每分钟可获取一次');
    //       }
    //     }else{
    //       AlertIOS.alert('获取验证码失败', '服务器无响应');
    //       onThis.setState({
    //          timeStamp: 0
    //       })
    //     }
    // })
    //  delete the following
      AlertIOS.alert("手机号无效", this.refs.form.getValues().phoneNum)
    } else {
      AlertIOS.alert("获取验证码失败", "一分钟只可获取一次")
    }
    
  },
  render: function(){
    return (
      <View style={{alignItems:"center"}}>
        <View style={{flex: 1}}>
          <Form ref="form">
            <View style={styles.inputRow}>
              <TextInput type="TextInput" name="phoneNum" placeholderTextColor="#777" style={styles.input} placeholder="手机号" keyboardType="number-pad"/>
            </View>
            <View style={styles.inputRow}>
              <TextInput type="TextInput" name="veriCode" placeholderTextColor="#777" style={styles.input} placeholder="验证码" keyboardType="number-pad"/>
            </View>
          </Form>
          <TouchableHighlight underlayColor="#fff" style={styles.btn_text} onPress={this._getPhoneText}>
            <Text style={{color:'#777',fontSize:10}}>获取验证码</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputRow}>
          <TouchableHighlight underlayColor="#48aeb4" style={styles.btn_pm} onPress={this._signup}>
            <Text style={{color:'#fff'}}>注册</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.btn_dec}></View>
          <Text style={styles.btn_or}>或</Text>
          <View style={styles.btn_dec}></View>
        </View>
        <View style={styles.inputRow}>
          <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._launchLogin}>
            <Text style={{color:'#777'}}>登陆</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

});


var styles = StyleSheet.create({
  icon:{
    position: 'absolute',
    right: 10,
    top:9,
    color: '#999',
    backgroundColor: "transparent"
  },
  inputRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:20,
  },
  input:{
    marginLeft:10,
    padding:1,
    marginRight: 80,
    width:Util.size.width-140,
    borderWidth:Util.pixel,
    height:40,
    paddingLeft:8,
    borderColor:'#eee',
    borderRadius:1,
    color:"#333",
    backgroundColor:"rgba(255, 255, 255, 0.75)"
  },
  btn_pm:{
    marginTop:10,
    width:160,
    height:35,
    backgroundColor:'#1E868C',
    justifyContent:'center',
    alignItems:'center',
  },
  btn:{
    marginTop:10,
    width:160,
    height:35,
    backgroundColor:'#eee',
    justifyContent:'center',
    alignItems:'center'
  },
  btn_text:{
    width:71,
    height:40,
    position: "absolute",
    right:0,
    top:0,
    borderColor:'#eee',
    borderWidth:Util.pixel,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:1,
    backgroundColor:"rgba(255, 255, 255, 0.75)"
  },
  btn_dec:{
    borderTopWidth: 0.3,
    borderTopColor: "#fff",
    width: 60,
    marginLeft:4,
    marginRight:3,
    top:5
  },
  btn_or:{
    width:20,
    height:20,
    padding:5,
    borderRadius: 10,
    borderWidth: 0.3,
    top:5,
    justifyContent:'center',
    alignItems:'center',
    borderColor: "#fff",
    fontSize: 10,
    color: "#fff",
    backgroundColor:"transparent"
  }
});


module.exports = Signup;


