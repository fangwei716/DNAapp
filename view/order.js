var Util = require('./utils')
var Icon = require('react-native-vector-icons/FontAwesome');

import React, {
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
  AlertIOS,
  View
} from 'react-native';

var orderData = [{
  date: "2016-02-15",
  item: "DNA档案",
  status: "等待付款",
  send: "无预计时间",
  bg:"#d73c37",
  key:0
},{
  date: "2016-02-13",
  item: "DNA档案",
  status: "正在处理订单",
  send: "预计 2016-02-25",
  bg:"#e5c160",
  key:1
},{
  date: "2016-02-03",
  item: "亲子鉴定",
  status: "订单派送中",
  send: "预计 2016-02-18",
  bg:"#0184ba",
  key:2
},{
  date: "2016-01-05",
  item: "DNA家谱",
  status: "订单已签收",
  send: "已于2016-01-15送达",
  bg:"#1E868C",
  key:3
}];

var OrderDetail = React.createClass({
  render: function () {
    var data = this.props.data;
    return(
      <View style={styles.orderDetailContainer}>
        <Text style={{marginBottom:5}}>订单项目：{data.item}</Text>
      </View>
    )
  }
})

var OrderListItems =  React.createClass({
  _renderOrderDetail: function (data) {
    this.props.navigator.push({
      title: "订单详情",
      component:OrderDetail,
      navigationBarHidden: false,
      passProps:{data:data}
    })
  },
  render: function () {
    var data = this.props.data;
    var item = this;
    var items = data.map(function(rowData, index) {
      return(
        <TouchableHighlight key={rowData.key} style={styles.orderListTouch} underlayColor="rgba(255,255,255,0.3)" onPress={()=>item._renderOrderDetail(rowData)}>
          <View style={styles.orderList}>
            <View style={[styles.orderStatus,{backgroundColor:rowData.bg}]}>
              <Text style={{color:"#fff"}}>订单状态：{rowData.status}</Text>
            </View>
            <View style={styles.orderInfo}>
              <Text style={{marginBottom:5}}>订单项目：{rowData.item}</Text>
              <Text style={{marginBottom:5}}>创建日期：{rowData.date}</Text>
              <Text>预计完成：{rowData.send}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    })
     
    return(
      <View>
        {items}
      </View>
    );

  }
})

var OrderList = React.createClass({
  getInitialState: function (){
    return {
      isRefreshing: false,
      loaded: 0,
      rowData: orderData,
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
        rowData: orderData,
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
  render: function() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} 
      style={styles.orderListContainer}
      refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            title={this.state.refreshTitle}
            onRefresh={this._onRefresh}
            tintColor="#ddd"/>}>
        <OrderListItems navigator={this.props.navigator} data={this.state.rowData}></OrderListItems>
      </ScrollView>
    );
  }

});

var Order = React.createClass({
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
        title:"全部订单",
        component: OrderList,
        passProps: {data: orderData},
        shadowHidden: true
      }}
      itemWrapperStyle={styles.itemWrapper}
      tintColor="#1E868C"/>
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
  orderListContainer:{
    position:"relative",
    top: -15
  },
  orderListTouch:{
    marginTop: 15,
    marginBottom: 0,
  },
  orderList:{
    flex:1,
    shadowColor: "#999",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    // borderTopLeftRadius: 6,
    // borderTopRightRadius: 6,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    borderTopColor: "#bbb",
    borderBottomColor: "#bbb",
    borderTopWidth: Util.pixel,
    borderBottomWidth: Util.pixel,
    backgroundColor: "#f7f7f7",
    height: 110
    // paddingTop: 10,
    // paddingBottom:10,
    // paddingLeft: 10,
    // paddingRight:10
  },
  orderStatus:{
    // backgroundColor:"#1E868C",
    flex:1,
    height:30,
    paddingTop:6,
    paddingLeft:15,
    paddingBottom:5,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
  },
  orderInfo:{
    backgroundColor:"#f7f7f7",
    height: 80,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    shadowColor: "#777",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: -2,
      width: 0
    },
  },
  orderDetailContainer:{
    marginTop:90,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  }
});


module.exports = Order;


