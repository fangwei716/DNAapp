var Util = require('./utils')
var Icon = require('react-native-vector-icons/FontAwesome');
const { BlurView, VibrancyView } = require('react-native-blur');

import Form from 'react-native-form'

import React, {
  AsyncStorage,
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
 *      - UserUpload
 *    - UserLink
 *    - UserHelp
 *    - UserSetting
 *    - UserAbout
 *    - UserShare
 */

var UserChangePhoneNum = React.createClass({
  render: function () {
    return(
           <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: "http://m.dnafw.com/changePhoneNum"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}/>
    )
  }
})

var UserUpload = React.createClass({
  render: function () {
    return(
           <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: "http://m.dnafw.com/upload"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}/>
    )
  }
})

var UserInfo = React.createClass({
  _saveChanges: function () {
    // SSH post: this.refs.form.getValues()
    // var onThis = this;
    // Util.post("http://dnafw.com/iosapp/update_info/",{
    //    info: this.refs.form.getValues(),
    //    uid: AsyncStorage.getItem("uid")
    // },function(resData) {
    //     if (resData) {
    //       if (resData.error) {
    //         AlertIOS.alert('更新失败', '某某资料错误');
    //       }else{
    //         onThis.props.navigator.pop();
    //       }
    //     }else{
    //       AlertIOS.alert('更新失败', '服务器无响应');
    //     }
    // })
    this.props.navigator.pop();
  },
  _uploadId: function () {
    this.props.navigator.push({
      title: "完善资料 > 上传身份证",
      component:UserUpload,
      navigationBarHidden: false,
    })
  },
  _changePhoneNum: function () {
    this.props.navigator.push({
      title: "更改绑定手机号",
      component:UserChangePhoneNum,
      navigationBarHidden: false,
    })
  },
  render: function () {
    var data = this.props.data, 
      oldPass = null,
      idInput = null,
      idUpload = null;
    if (!data.isNew) {
      oldPass = <View style={styles.orderInputContainer}>
                  <Text style={styles.orderInputText}>旧密码：</Text>
                  <TextInput type="TextInput"  password={true} name="oldPassword" style={styles.orderInput}/>
                </View>
    }else{
      oldPass = <View></View>
    }

    if (!data.hasIdLinked) {
      idInput = <View style={styles.orderInputContainer}>
                  <Text style={styles.orderInputText}>身份证号码：</Text>
                  <TextInput type="TextInput" name="idNum" keyboardType="number-pad" style={styles.orderInput}/>
                </View>
      idUpload = <View style={styles.orderButtonContainer}>
                  <TouchableHighlight underlayColor="#eee" style={[styles.btn_if,{backgroundColor:'#ddd'}]} onPress={this._uploadId}>
                    <Text style={{color:'#555'}}>上传身份证正反面照</Text>
                  </TouchableHighlight>
                </View>
    }else{
      idInput = <View></View>;
      idUpload = <View></View>;
    }

    return(
      <ScrollView style={{backgroundColor:"#f7f7f7"}} showsVerticalScrollIndicator={false}>
        <Form style={styles.orderContainer} ref="form">
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>用户名：</Text>
            <TextInput defaultValue={data.username} type="TextInput" name="username" style={styles.orderInput}/>
          </View>
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>邮箱：</Text>
            <TextInput defaultValue={data.email} type="TextInput" keyboardType="email-address" name="email" style={styles.orderInput}/>
          </View>
          {oldPass}
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>新密码：</Text>
            <TextInput  type="TextInput"  password={true} name="newPassword" style={styles.orderInput}/>
          </View>
          {idInput}
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>地址：</Text>
            <TextInput defaultValue={data.address} type="TextInput" name="address" style={styles.orderInput}/>
          </View>
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>邮编：</Text>
            <TextInput defaultValue={data.postcode} type="TextInput" name="postcode" keyboardType="number-pad" style={styles.orderInput}/>
          </View>
        </Form>
        {idUpload}
        <View style={styles.orderButtonContainer}>
          <TouchableHighlight underlayColor="#48aeb4" style={[styles.btn_if,{backgroundColor:'#1E868C'}]} onPress={this._saveChanges}>
            <Text style={{color:'#fff'}}>更新资料</Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.orderButtonContainer,{marginBottom:30}]}>
          <TouchableHighlight underlayColor="#ee6146" style={[styles.btn_if,{backgroundColor:'#d73c37'}]} onPress={this._changePhoneNum}>
            <Text style={{color:'#fff'}}>更改绑定手机号</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
})

var UserLink = React.createClass({
  render: function () {
    //SSH to get alipay link, see alipay api
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
  _shareWechat: function () {
    
  },
  _shareWeibo: function () {
    
  },
  _shareQQ: function () {
    
  },
  render: function () {
    return(
      <View style={{paddingTop:90}}>
       <View style={styles.orderButtonContainer}>
          <TouchableHighlight underlayColor="#55D95D" style={[styles.btn_if,{backgroundColor:'#24bf2f'}]} onPress={this._shareWechat}>
            <Text style={{color:'#fff'}}>
            <Icon size={15} name="weixin"></Icon> 分享到微信
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.orderButtonContainer}>
          <TouchableHighlight underlayColor="#db7822" style={[styles.btn_if,{backgroundColor:'#F27405'}]} onPress={this._shareWeibo}>
            <Text style={{color:'#fff'}}>
            <Icon size={15} name="weibo"></Icon> 分享到微博</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.orderButtonContainer}>
          <TouchableHighlight underlayColor="#38b4db" style={[styles.btn_if,{backgroundColor:'#15b3e5'}]} onPress={this._shareQQ}>
            <Text style={{color:'#fff'}}>
              <Icon size={15} name="qq"></Icon> 分享到QQ
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
})

/**
 * userData
 * @dynamic
 * 
 * Data Flow:
 * userData -> UserView -> userInfo
 *                      -> userLink
 */

var UserView = React.createClass({
  getInitialState: function () {
    // pass token and get userData via SSH
    // var userData = {};
    // Util.post("http://dnafw.com/iosapp/user_info/",{
    //    uid: AsyncStorage.getItem('uid')
    // },function(resData) {
    //     if (resData){
    //         userData = resData
    //     }
    // })
    var userData = {
      isNew: true,
      username: "Wei Fang",
      email: null,
      alipayLinked: false,
      hasIdLinked: false,
      address:"",
      postcode:"",
      img: require('./img/icon.jpg'), // should use default "?" avatar for first time user
    }
    return({
      isFirstTime: this.props.isFirstTime,
      userData: userData
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
      tintColor="#777"/>
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
  },
  orderContainer:{
    alignItems:'center',
    flex:1,
    width: Util.size.width-40,
    marginLeft:20, marginTop: 10
  },
  orderInputContainer:{
    marginTop: 20, 
  },
  orderButtonContainer:{
    marginTop: 20, 
    width: Util.size.width-40,
    marginLeft:20,
    alignItems:"center"
  },
  orderInputText:{
    fontSize:12
  },
  orderInput:{
    marginTop: 10,
    paddingLeft:10,
    paddingRight: 10,
    paddingTop:5,
    paddingBottom:5,
    width:Util.size.width-80,
    borderWidth:Util.pixel,
    height:40,
    borderColor:'#777',
    borderRadius:2,
    color:"#333",
  },
  btn_if:{
    marginTop:10,
    width:Util.size.width-80,
    height:40,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
  }
})

module.exports = User;
