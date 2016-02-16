var Util = require('./utils')
var Icon = require('react-native-vector-icons/FontAwesome');
const { BlurView, VibrancyView } = require('react-native-blur');

import React, {
  NavigatorIOS,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBarIOS,
  Text,
  Image,
  AlertIOS,
  View
} from 'react-native';

/**
 * userData
 *
 * @object from Ajax 
 */

var userData = {
  name:"Wei Fang",
  ac:"fanwei716@gmail.com"
}

var UserInfo = React.createClass({
  render: function () {
    return(
      <View></View>
    )
  }
})

var UserView = React.createClass({
  getInitialState: function () {
    return null
  },
  _onInfoPress: function (data) {
    this.props.navigator.push({
      title: "编辑资料",
      component:UserInfo,
      navigationBarHidden: false,
      passProps: { data: data },
    })
  },
  _logout:function () {
    
  },
  render: function () {
    var data = this.props.data;
    return(
      <View>
        <TouchableHighlight style={{marginBottom:35}} onPress={()=>this._onInfoPress(data)}>
          <View style={styles.userHero}>
            <View style={styles.bgImageWrapper}>
              <Image source={require('./img/icon.jpg')} style={styles.backgroundImage}>
                <BlurView blurType="light" style={styles.blur}>
                  <Image source={require('./img/icon.jpg')} style={styles.icon}>
                  </Image>
                  <Text style={{fontSize:18,color:"#3a3a3a"}}>{data.name}</Text>
                  <Text style={{fontSize:13,color:"#3a3a3a",marginTop:10}}>帐号：{data.ac}</Text>
                </BlurView>
              </Image>
              <Icon style={styles.itemNav} name="angle-right" size={35}></Icon>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={()=>this._onInfoPress(data)}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="link" size={18}></Icon>
            <Text>支付宝帐户：已绑定</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={()=>this._onInfoPress(data)}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="question-circle" size={18}></Icon>
            <Text>帮助中心</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={()=>this._onInfoPress(data)}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="cog" size={18}></Icon>
            <Text>设置</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={()=>this._onInfoPress(data)}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="info-circle" size={18}></Icon>
            <Text>关于微代理</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={()=>this._onInfoPress(data)}>
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
      </View>
    )
  }

})

var User = React.createClass({
  getInitialState: function () {
    StatusBarIOS.setStyle(0);
    return null;
  },
  render: function(){
    return (
      <NavigatorIOS
      ref='nav'
      style={styles.container}
      initialRoute={{
        title:"我的帐户",
        component: UserView,
        passProps: {data: userData},
        shadowHidden: true
      }}
      itemWrapperStyle={styles.itemWrapper}
      tintColor="#1E868C"/>
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
  userHero:{
    height:170,
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
    paddingTop: 93,
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
    top:97,
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
})

module.exports = User;
