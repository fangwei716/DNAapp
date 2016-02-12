var Util = require('./utils')
var Icon = require('react-native-vector-icons/FontAwesome');

import React, {
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Text,
  Image,
  AlertIOS,
  View
} from 'react-native';


var Login = React.createClass({

  render: function(){
    return (
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
          <Image style={styles.backgroundImage} source={require('./img/DNA1.png')}></Image>
        </View>
        <View>
          <Image style={styles.logo} source={require('./img/dna15.png')}></Image>
          <Text style={styles.logoText}>华大DNA</Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput placeholderTextColor="#777" style={styles.input} placeholder="用户名"/>
          <Icon name="user" style={styles.icon} size={20} />
        </View>
        <View style={styles.inputRow}>
          <TextInput placeholderTextColor="#777" style={styles.input} placeholder="密码" password={true}/>
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
            <Text style={{color:'#777'}}>注册</Text>
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
    paddingTop:50,
    alignItems:'center'
  },
  bgImageWrapper: {
      position: 'absolute',
      // alignItems: 'stretch',
      top: 0, bottom: 0, left: 0, right: 0
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  icon:{
  	position: 'absolute',
  	right: 10,
  	top:9,
  	color: '#999',
    backgroundColor: "transparent"
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
    marginBottom:50,
    fontSize: 16
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
    width:300,
    borderWidth:Util.pixel,
    height:40,
    paddingLeft:12,
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
    borderRadius:1
  },
  btn:{
    marginTop:10,
    width:160,
    height:35,
    backgroundColor:'#eee',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:1
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
    backgroundColor: "transparent"
  }
});


module.exports = Login;


