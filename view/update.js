var Util = require('./utils');
var Icon = require('react-native-vector-icons/FontAwesome');

import React, {
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  NavigatorIOS,
  StatusBarIOS,
  ListView,
  TextInput,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  WebView,
  SliderIOS,
  View
} from 'react-native';

var updateData = [{
  title:"推广消息的标题1",
  date: "2016-02-18",
  link: "www.google.com",
  key:0,
  img: require('./img/chip.jpg')
},{
  title:"推广消息的标题2",
  date: "2016-02-19",
  link: "www.google.com",
  key:1,
  img: require('./img/forensics.jpg')
}];

var UpdateDetail = React.createClass({
  render: function () {
    return(
        <WebView
        automaticallyAdjustContentInsets={false}
        source={{uri: this.props.data.link}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}/>
    )
  }
})

var UpdateListItems = React.createClass({
  _onPress: function (data) {
     this.props.navigator.push({
      title: data.title,
      component:UpdateDetail,
      navigationBarHidden: false,
      passProps:{data:data}
    })
  },
  render:function () {
    var onThis = this;
    var items = this.props.data.map(function(elem) {
      return(
        <View key={elem.key} style={styles.updateContainer}>
          <View style={styles.updateItemDate}>
            <Text style={{color:"#FFF",fontSize:12}}>{elem.date}</Text>
          </View>
          <TouchableHighlight underlayColor="#eee" style={styles.updateItem} onPress={()=>onThis._onPress(elem)}>
            <View>
              <Text style={{color:"#222",fontSize:15, paddingLeft:10}}>{elem.title}</Text>
              <View style={styles.updateImgContainer}>
                <Image style={styles.updateImg} source={elem.img}></Image> 
              </View>
              <Text style={{color:"#555",fontSize:13, paddingLeft:10}}>查看详情 <Icon name="angle-right"></Icon>
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )
    })
    return(
      <View style={{paddingBottom:20}}>
        {items}
      </View>
    )
  }
})

var UpdateList = React.createClass({
  getInitialState: function (){
    return {
      isRefreshing: false,
      loaded: 0,
      rowData: this.props.data,
      refreshTitle: "下拉更新"
    };
  },
  _onRefresh:function () {
    this.setState({
      isRefreshing: true,
      refreshTitle: "正在更新"
    });
    setTimeout(() => {
      // get new data via Ajax
      this.setState({
        // loaded: this.state.loaded,
        isRefreshing: false,
        rowData: this.props.data,
        refreshTitle: "更新完毕"
      });
      // 1s after refresh
      setTimeout(() => {
        this.setState({
          refreshTitle: "下拉更新"
        });
      }, 1000);

    }, 1000);
  },
  render:function () {
    return(
      <ScrollView showsVerticalScrollIndicator={false} 
      refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            title={this.state.refreshTitle}
            onRefresh={this._onRefresh}
            tintColor="#ddd"/>}>
        <UpdateListItems navigator={this.props.navigator} data={this.state.rowData}></UpdateListItems>
      </ScrollView>
    )
  }
})

var Update = React.createClass({
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
        title:"推广动态",
        component: UpdateList,
        passProps: {data: updateData},
        shadowHidden: true
      }}
      itemWrapperStyle={styles.itemWrapper}
      tintColor="#777"/>
    );
  }

});

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  itemWrapper:{
    backgroundColor: '#eaeaea'
  },
  updateContainer:{
    alignItems:"center", 
    paddingTop:20
  },
  updateItemDate:{
    backgroundColor:"#ccc",
    borderRadius:2,
    paddingTop:2,paddingBottom:2,paddingLeft:5,paddingRight:5,
  },
  updateItem:{
    borderColor:"#bbb",
    borderWidth:Util.pixel,
    width: Util.size.width -40,
    marginTop:20,
    marginBottom:10,
    backgroundColor:"#fff",
    paddingTop:10,paddingBottom:10,
    borderRadius:4,
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.2,
      width: 0
    },
  },
  updateImg:{
    width:Util.size.width -42,
    height: 130,
  },
  updateImgContainer:{
    marginTop:10,
    marginBottom:10,
    borderTopColor:"#ccc",
    borderTopWidth:Util.pixel,
    borderBottomColor:"#ccc",
    borderBottomWidth:Util.pixel,
  }
});

module.exports = Update;

 
