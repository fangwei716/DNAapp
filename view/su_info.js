var Util = require('./utils')
var Icon = require('react-native-vector-icons/FontAwesome');
import React, {
  AppRegistry,
  Component,
  TabBarIOS,
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  StatusBarIOS,
  Text,
  Image,
  AlertIOS,
  View
} from 'react-native';


var SuInfo = React.createClass({

  render: function(){
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.logo} source={require('image!logo')}></Image>
        </View>

        <View style={styles.inputRow}>
          <TextInput style={styles.input} placeholder="用户名"/>
          <Icon name="user" style={styles.icon} size={20} />
        </View>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} placeholder="密码" password={true}/>
          <Icon name="lock" style={styles.icon} size={20} />
        </View>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} placeholder="密码" password={true}/>
          <Icon name="lock" style={styles.icon} size={20} />
        </View>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} placeholder="密码" password={true}/>
          <Icon name="lock" style={styles.icon} size={20} />
        </View>

        <View style={styles.inputRow}>
          <TouchableHighlight underlayColor="#fff" style={styles.btn_pm} onPress={this._login}>
            <Text style={{color:'#fff'}}>登录</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.btn_dec}></View>
          <Text style={styles.btn_or}>或</Text>
          <View style={styles.btn_dec}></View>
        </View>
        <View style={styles.inputRow}>
          <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._launchSignup}>
            <Text style={{color:'#fff'}}>注册</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  _login: function(){
    AlertIOS.alert('登陆失败','服务器无响应');
  },

  _launchSignup: function () {
    AlertIOS.alert('注册失败','page not ready yet')
  }

});


var styles = StyleSheet.create({
  container:{
    marginTop:50,
    alignItems:'center',
  },
  icon:{
  	position: 'absolute',
  	right: 10,
  	top:6,
  	color: '#ddd'
  },
  logo:{
    width:100,
    height:100,
    resizeMode: Image.resizeMode.contain
  },
  inputRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:10,
  },
  input:{
    marginLeft:10,
    padding:1,
    width:220,
    borderWidth:Util.pixel,
    height:35,
    paddingLeft:8,
    borderColor:'#ccc'
  },
  btn_pm:{
    marginTop:10,
    width:120,
    height:35,
    backgroundColor:'#3BC1FF',
    justifyContent:'center',
    alignItems:'center',
  },
  btn:{
    marginTop:10,
    width:120,
    height:35,
    backgroundColor:'#ddd',
    justifyContent:'center',
    alignItems:'center',
  },
  btn_dec:{
    borderTopWidth: 0.3,
    borderTopColor: "#999",
    width: 30,
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
    borderColor: "#999",
    fontSize: 10,
    color: "#777"
  }
});


module.exports = SuInfo;


