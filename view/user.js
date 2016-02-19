var Util = require('./utils')
var Icon = require('react-native-vector-icons/FontAwesome');
const { BlurView, VibrancyView } = require('react-native-blur');

import React, {
  NavigatorIOS,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  WebView,
  ScrollView,
  StatusBarIOS,
  Text,
  Image,
  View
} from 'react-native';

/**
 * - User
 *  - UserView
 *    - UserInfo
 *    - UserLink
 *    - UserHelp
 *    - UserSetting
 *    - UserAbout
 *    - UserShare
 *  
 * @data userData from Ajax 
 */

var UserInfo = React.createClass({
  render: function () {
    return(
      <View></View>
    )
  }
})

var UserLink = React.createClass({
  render: function () {
    //ajax to get alipay link
    return(
          <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: "http://www.alipay.com"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}/>
    )
  }
})

var UserHelp = React.createClass({
  render: function () {
    return(
           <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: "http://m.dnafw.com/help"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}/>
    )
  }
})

var UserSetting = React.createClass({
  render: function () {
    return(
      <View>
        <Text style={{marginTop: 100, marginLeft:30}}>List of settings...</Text>
      </View>
    )
  }
})

var UserAbout = React.createClass({
  render: function () {
    return(
      <View>
        <Text style={{marginTop: 100, marginLeft:30}}>All rights reserved...</Text>
      </View>
    )
  }
})

var UserShare = React.createClass({
  render: function () {
    return(
      <View>
        <Text style={{marginTop: 100, marginLeft:30}}>分享到...</Text>
      </View>
    )
  }
})

var UserView = React.createClass({
  getInitialState: function () {
    //get Ajax here
    return({
      isFirstTime: this.props.isFirstTime,
      userData:{
        username: "Wei Fang",
        email: null,
        alipayLinked: false,
        img: require('./img/icon.jpg'), // should use default "?" avatar for first time user
      }
    })
  },
  _logout: function () {
    var newState = {
      isLogin: false,
      onSignup: false
    }
    this.props.callbackLogout(newState);
  },
  _onInfoPress: function (data) {
    this.props.navigator.push({
      title: "编辑资料",
      component:UserInfo,
      navigationBarHidden: false,
      passProps:{data:data}
    })
  },
  _onLinkPress: function () {
    this.props.navigator.push({
      title: "绑定支付宝",
      component:UserLink,
      navigationBarHidden: false,
    })
  },
  _onHelpPress: function () {
    this.props.navigator.push({
      title: "帮助中心",
      component:UserHelp,
      navigationBarHidden: false,
    })
  },
  _onSettingPress: function () {
    this.props.navigator.push({
      title: "设置",
      component:UserSetting,
      navigationBarHidden: false,
    })
  },
  _onAboutPress: function () {
    this.props.navigator.push({
      title: "关于微代理",
      component:UserAbout,
      navigationBarHidden: false,
    })
  },
  _onSharePress: function () {
    this.props.navigator.push({
      title: "分享到",
      component:UserShare,
      navigationBarHidden: false,
    })
  },
  _renderFirstTimeMsg:function () {
    if (this.state.isFirstTime) {
      return(
        <View style={styles.ftMsg}>
          <Text style={{color:"#fff"}}>
            你的资料尚未填写完整或正在审核中，请点击上面进入编辑资料或查看你的资料审核进度。审核成功后，你便可以使用微代理的完整功能。
          </Text>
        </View>
      )
    };
  },
  render: function () {
    var data = this.state.userData;
    return(
      <ScrollView showsVerticalScrollIndicator={false} style={styles.userContainer}>
        <TouchableHighlight style={{marginBottom:35}} onPress={()=>this._onInfoPress(data)}>
          <View style={styles.userHero}>
            <View style={styles.bgImageWrapper}>
              <Image source={data.img} style={styles.backgroundImage}>
                <BlurView blurType="light" style={styles.blur}>
                  <Image source={data.img} style={styles.icon}>
                  </Image>
                  <Text style={{fontSize:18,color:"#3a3a3a"}}>{data.username? data.username:"用户名未设置"}</Text>
                  <Text style={{fontSize:13,color:"#3a3a3a",marginTop:10}}>帐号：{data.email?data.email:"邮箱未绑定"}</Text>
                </BlurView>
              </Image>
              <Icon style={styles.itemNav} name="angle-right" size={35}></Icon>
            </View>
          </View>
        </TouchableHighlight>
        {this._renderFirstTimeMsg()}
        <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={this._onLinkPress}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="link" size={18}></Icon>
            <Text>支付宝帐户：{data.alipayLinked?"已绑定":"未绑定"}</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={this._onHelpPress}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="question-circle" size={18}></Icon>
            <Text>帮助中心</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={this._onSettingPress}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="cog" size={18}></Icon>
            <Text>设置</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={this._onAboutPress}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="info-circle" size={18}></Icon>
            <Text>关于微代理</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={this._onSharePress}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="share-alt-square" size={18}></Icon>
            <Text>推荐给朋友</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <View style={{alignItems:"center",width:Util.size.width}}>
          <TouchableHighlight underlayColor="#ee6146" style={styles.btn_pm} onPress={this._logout}>
              <Text style={{color:'#fff'}}>注销帐户</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }

})

var User = React.createClass({
  getInitialState: function () {
    StatusBarIOS.setStyle(0);
    return({
      isFirstTime: this.props.isFirstTime
    })
  },
  render: function(){
    var callback = this.props.callbackLogout,
    isFirstTime = this.state.isFirstTime;
    return (
      <NavigatorIOS
      ref='nav'
      style={styles.container}
      initialRoute={{
        title:"我的帐户",
        component: UserView,
        passProps: {
          callbackLogout: callback,
          isFirstTime: isFirstTime,
        },
        shadowHidden: true
      }}
      itemWrapperStyle={styles.itemWrapper}
      tintColor="#555"/>
    );
  }

});

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  itemWrapper:{
    backgroundColor: '#eaeaea'
  },
  userContainer:{
    position:"relative",
    top: -50
  },
  userHero:{
    height:150,
    flex:1,
    flexDirection:'row',
  },
  bgImageWrapper: {
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  blur:{
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    paddingTop: 73,
    paddingLeft: 135,
    backgroundColor:"rgba(255,255,255,0.05)"
  },
  icon:{
    position:"absolute",
    borderWidth:2,
    borderColor: "#fff",
    bottom:10,
    left:20,
    width: 80,
    height: 80
  },
  itemNav:{
    position:"absolute",
    top:77,
    right:10,
    color: "rgba(0,0,0,0.3)",
    backgroundColor:"transparent"
  },
  itemNavMenu:{
    position:"absolute",
    top:12,
    right:10,
    color: "#bbb",
    backgroundColor:"transparent"
  },
  userMenuContainer:{
    height:45,
    borderTopWidth: Util.pixel,
    borderTopColor:"#bbb",
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#bbb",
    backgroundColor:"#f7f7f7",
    flex:1,
    marginBottom:20,
  },
  userMenu:{
    paddingLeft:50,
    height:45,
    justifyContent:'center',
  },
  itemNavIcon:{
    position:"absolute",
    top:13,
    left:20,
    color: "#454545",
    backgroundColor:"transparent"
  },
  btn_pm:{
    marginTop:15,
    width:280,
    height:40,
    borderRadius:2,
    backgroundColor:'#d73c37',
    justifyContent:'center',
    alignItems:'center',
  },
  ftMsg:{
    backgroundColor:"#d73c37",
    paddingLeft:20,
    paddingRight: 20,
    paddingTop:10,
    paddingBottom: 10,
    marginTop:-35,
    marginBottom: 20,
    flex:1
  }
})

module.exports = User;
