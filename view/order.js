var Util = require('./utils');
var Icon = require('react-native-vector-icons/FontAwesome');
var ItemOrder = require('./itemOrder');
var Alipay = require('./alipay');

import React, {
  AsyncStorage,
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

/**
 * orderData
 * @dynamic
 * Type
 * 0: 未确认订单
 * 1: 等待付款
 * 2: 正在处理订单
 * 3: 订单派送中
 * 4: 订单已签收, 待评价
 * 5: 订单完成
 */

// var orderData = {};
// Util.get("http://dnafw.com:8100/iosapp/all_orders?uid="+AsyncStorage.getItem('uid'),function(resData) {
//     if (resData.orderData) orderData = resData.orderData;
// })

//to delete
var orderData = [{
  type:0,
  date: "2016-02-18",
  item: "DNA家谱",
  status: "未确认订单",
  send: "无预计时间",
  bg:"#6D6D6D",
  icon:"pencil",
  orderItem: "0",
  key:-1,
  order_number: 42375247038242389, 
  created:"2016-12-13 23:23:57", 
  pay_time: "未付款", 
  product: "DNA家谱", 
  pay_price: 0, 
  status_num: 1, 
  client: {
    name: "XXX", 
    cellphone: "XXX", 
    email: "XXX", 
    address: "XXX",
  },
  identifier: [
    {
      name: "XXX", 
      relationship: "XXX", 
      sample: "XXX", 
      additional_info: "XXX",
    }
  ]
},{
  type:1,
  date: "2016-02-15",
  item: "DNA档案",
  status: "等待付款",
  send: "无预计时间",
  bg:"#DE574F",
  icon:"shopping-cart",
  orderItem: "1",
  key:0,
  order_number: 42375247038242389, 
  created:"2016-12-13 23:23:57", 
  pay_time: "未付款", 
  product: "DNA档案", 
  pay_price: 0, 
  status_num: 1, 
  client: {
    name: "XXX", 
    cellphone: "XXX", 
    email: "XXX", 
    address: "XXX",
  },
  identifier: [
    {
      name: "XXX", 
      relationship: "XXX", 
      sample: "XXX", 
      additional_info: "XXX",
    }
  ]
},{
  type:2,
  date: "2016-02-13",
  item: "DNA档案",
  status: "正在处理订单",
  send: "预计 2016-02-25",
  bg:"#E9CA70",
  icon:"hourglass-half",
  orderItem: "1",
  key:1,
  order_number: 42375247038242389, 
  created:"2016-12-13 23:23:57", 
  pay_time: "2016-12-13 23:23:57", 
  product: "DNA档案", 
  pay_price: 1200, 
  status_num: 1, 
  client: {
    name: "XXX", 
    cellphone: "XXX", 
    email: "XXX", 
    address: "XXX",
  },
  identifier: [
    {
      name: "XXX", 
      relationship: "XXX", 
      sample: "XXX", 
      additional_info: "XXX",
    }
  ]
},{
  type:3,
  date: "2016-02-03",
  item: "亲子鉴定",
  status: "订单派送中",
  send: "预计 2016-02-18",
  bg:"#1a94c5",
  icon:"car",
  orderItem: "2",
  key:2,
  order_number: 42375247038242389, 
  created:"2016-12-13 23:23:57", 
  pay_time: "2016-12-13 23:23:57", 
  product: "亲子鉴定", 
  pay_price: 1200, 
  status_num: 1, 
  client: {
    name: "XXX", 
    cellphone: "XXX", 
    email: "XXX", 
    address: "XXX",
  },
  identifier: [
    {
      name: "XXX", 
      relationship: "XXX", 
      sample: "XXX", 
      additional_info: "XXX",
    }
  ]
},{
  type:4,
  date: "2016-01-05",
  item: "DNA家谱",
  status: "订单已签收, 待评价",
  send: "已于2016-01-15送达",
  bg:"#39979d",
  icon:"star-half-o",
  orderItem: "0",
  key:3,
  order_number: 42375247038242389, 
  created:"2016-12-13 23:23:57", 
  pay_time: "2016-12-13 23:23:57", 
  product: "DNA家谱", 
  pay_price: 1200, 
  status_num: 1, 
  client: {
    name: "XXX", 
    cellphone: "XXX", 
    email: "XXX", 
    address: "XXX",
  },
  identifier: [
    {
      name: "XXX", 
      relationship: "XXX", 
      sample: "XXX", 
      additional_info: "XXX",
    }
  ]
},{
  type:4,
  date: "2016-01-05",
  item: "DNA家谱",
  status: "订单已签收, 待评价",
  send: "已于2016-01-15送达",
  bg:"#39979d",
  icon:"star-half-o",
  orderItem: "0",
  key:4,
  order_number: 42375247038242389, 
  created:"2016-12-13 23:23:57", 
  pay_time: "2016-12-13 23:23:57", 
  product: "DNA家谱", 
  pay_price: 1200, 
  status_num: 1, 
  client: {
    name: "XXX", 
    cellphone: "XXX", 
    email: "XXX", 
    address: "XXX",
  },
  identifier: [
    {
      name: "XXX", 
      relationship: "XXX", 
      sample: "XXX", 
      additional_info: "XXX",
    }
  ]
},{
  type:5,
  date: "2016-01-05",
  item: "DNA家谱",
  status: "订单完成",
  send: "已于2016-01-15送达",
  bg:"#339b6d",
  icon:"info-circle",
  orderID:"",
  key:5,
  order_number: 42375247038242389, 
  created:"2016-12-13 23:23:57", 
  pay_time: "2016-12-13 23:23:57", 
  product: "DNA家谱", 
  pay_price: 1200, 
  status_num: 1, 
  client: {
    name: "XXX", 
    cellphone: "XXX", 
    email: "XXX", 
    address: "XXX",
  },
  identifier: [
    {
      name: "XXX", 
      relationship: "XXX", 
      sample: "XXX", 
      additional_info: "XXX",
    }
  ]
},{
  type:5,
  date: "2016-01-05",
  item: "DNA家谱",
  status: "订单完成",
  send: "已于2016-01-15送达",
  bg:"#339b6d",
  icon:"info-circle",
  orderItem: "0",
  key:6,
  order_number: 42375247038242389, 
  created:"2016-12-13 23:23:57", 
  pay_time: "2016-12-13 23:23:57", 
  product: "DNA家谱", 
  pay_price: 1200, 
  status_num: 1, 
  client: {
    name: "XXX", 
    cellphone: "XXX", 
    email: "XXX", 
    address: "XXX",
  },
  identifier: [
    {
      name: "XXX", 
      relationship: "XXX", 
      sample: "XXX", 
      additional_info: "XXX",
    }
  ]
}];

/**
 * Order
 * - OrderList
 *   -OrderDetail
 *     - @type:0 ItemOrder
 *     - @tyle:1 Alipay
 *     - @type:2 Service
 *     - @type:3 Trackig
 */

var Service = React.createClass({
  render: function () {
    return(
      <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: "http://m.dnafw.com/service"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}/>
    )
  }
})


var Tracking = React.createClass({
  render: function () {
    return(
      <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: "http://m.dnafw.com/package"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}/>
    )
  }
})

var OrderDetail = React.createClass({
  getInitialState: function () {
    return({
      rating: 0
    })
  },
  _action: function (data) {
    switch(data.type){
      case 0:
        this.props.navigator.push({
          title: "填写订单",
          component:ItemOrder,
          navigationBarHidden: false,
          passProps: { data: data },
        })
        return null;
      case 1:
        this.props.navigator.push({
          title: "支付宝",
          component:Alipay,
          navigationBarHidden: false,
          passProps: { data: data },
        })
        return null;
      case 2:
        this.props.navigator.push({
          title: "联系客服",
          component:Service,
          navigationBarHidden: false,
          passProps: { data: data },
        })
        return null;
      case 3:
        this.props.navigator.push({
          title: "物流信息",
          component:Tracking,
          navigationBarHidden: false,
          passProps: { data: data },
        })
        return null;
    }
  },
  _renderAction: function (data) {
    switch(data.type){
      case 0:
        return(
          <View>
            <View style={[styles.detialSubtitle,{borderLeftColor:data.bg}]}>
              <Text style={{fontSize:16}} >操作：</Text>
            </View>
            <View style={{alignItems:"center",width:Util.size.width-40}}>
              <TouchableOpacity activeOpacity={0.7} style={[styles.btn_ac,{backgroundColor:data.bg}]} onPress={()=>this._action(data)}>
                  <Text style={{color:'#fff'}}>继续填写订单</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      case 1:
        return(
          <View>
            <View style={[styles.detialSubtitle,{borderLeftColor:data.bg}]}>
              <Text style={{fontSize:16}} >操作：</Text>
            </View>
            <View style={{alignItems:"center",width:Util.size.width-40}}>
              <TouchableOpacity activeOpacity={0.7} style={[styles.btn_ac,{backgroundColor:data.bg}]} onPress={()=>this._action(data)}>
                  <Text style={{color:'#fff'}}>前往支付宝付款</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      case 2:
        return(
          <View>
            <View style={[styles.detialSubtitle,{borderLeftColor:data.bg}]}>
              <Text style={{fontSize:16}} >操作：</Text>
            </View>
            <View style={{alignItems:"center",width:Util.size.width-40}}>
              <TouchableOpacity activeOpacity={0.7} style={[styles.btn_ac,{backgroundColor:data.bg}]} onPress={()=>this._action(data)}>
                  <Text style={{color:'#fff'}}>联系客服</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      case 3:
        return(
          <View>
            <View style={[styles.detialSubtitle,{borderLeftColor:data.bg}]}>
              <Text style={{fontSize:16}} >操作：</Text>
            </View>
            <View style={{alignItems:"center",width:Util.size.width-40}}>
              <TouchableOpacity activeOpacity={0.7} style={[styles.btn_ac,{backgroundColor:data.bg}]} onPress={()=>this._action(data)}>
                  <Text style={{color:'#fff'}}>查看物流信息</Text>
              </TouchableOpacity>
            </View>
          </View>
        )  
      case 4:
        return(
          <View>
            <View style={[styles.detialSubtitle,{borderLeftColor:data.bg}]}>
              <Text style={{fontSize:16}} >操作：</Text>
            </View>
            <View style={{paddingLeft:10,paddingRight:10}}>
              <Text style={{fontSize:14, marginTop:5,marginBottom:5}}>
                {this.state.rating==0? "请评价此订单":"你的评价"}：{'★'.repeat(this.state.rating)}
              </Text>
              <SliderIOS 
                value={0}
                maximumValue={5}
                step={1}
                minimumTrackTintColor={data.bg}
                onValueChange={(value) => this.setState({rating: value})} />
            </View>
          </View>
        )
      case 5:
        return null;
    }
  },
  render: function () {
    var data = this.props.data;
    var identifiers = data.identifier.map(function(elem, index) {
      return(
        <View key={elem.name}>
          <Text></Text>
          <Text style={styles.detailListReg}><Text style={styles.detailListEm}>被鉴定人{index+1}：</Text>{elem.name}</Text>
          <Text style={styles.detailListReg}><Text style={styles.detailListEm}>被鉴定人{index+1}关系：</Text>{elem.relationship}</Text>
          <Text style={styles.detailListReg}><Text style={styles.detailListEm}>被鉴定人{index+1}样本类型：</Text>{elem.sample}</Text>
          <Text style={styles.detailListReg}><Text style={styles.detailListEm}>附加信息：</Text>{elem.additional_info}</Text>
        </View>
      );
    });
    return(
      <View style={styles.orderDetailContainer}>
        <View style={{height:120, paddingTop:80, paddingLeft:25, backgroundColor:data.bg}}>
            <Text style={{color:"#fff", fontSize:18}}><Icon name={data.icon} size={23}> </Icon> {data.item}：{data.status}</Text>
        </View>
        <View style={{paddingLeft:20,paddingRight:20}}>
          {this._renderAction(data)}
          <View style={[styles.detialSubtitle,{borderLeftColor:data.bg}]}>
            <Text style={{fontSize:16}} >详情：</Text>
          </View>
          <ScrollView style={styles.detailList} contentInset={{top:0}} automaticallyAdjustContentInsets={false}>
            <Text style={styles.detailListReg}><Text style={styles.detailListEm}>订单项目：</Text>{data.product}</Text>
            <Text style={styles.detailListReg}><Text style={styles.detailListEm}>订单编号：</Text>{data.order_number}</Text>
            <Text style={styles.detailListReg}><Text style={styles.detailListEm}>创建时间：</Text>{data.created}</Text>
            <Text style={styles.detailListReg}><Text style={styles.detailListEm}>付款时间：</Text>{data.pay_time}</Text>
            <Text style={styles.detailListReg}><Text style={styles.detailListEm}>付款金额：</Text>{data.pay_price}</Text>
            <Text></Text>
            <Text style={styles.detailListReg}><Text style={styles.detailListEm}>委托人：</Text>{data.client.name}</Text>
            <Text style={styles.detailListReg}><Text style={styles.detailListEm}>委托人电话：</Text>{data.client.cellphone}</Text>
            <Text style={styles.detailListReg}><Text style={styles.detailListEm}>委托人邮箱：</Text>{data.client.email}</Text>
            <Text style={styles.detailListReg}><Text style={styles.detailListEm}>委托人地址：</Text>{data.client.address}</Text>
            {identifiers}
          </ScrollView>
        </View>
      </View>
    )
  }
})

var OrderListItems =  React.createClass({
  _renderOrderDetail: function (data) {
    this.props.navigator.push({
      title: "订单详情",
      tintColor:data.bg,
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
        <TouchableHighlight key={rowData.key} style={styles.orderListTouch} underlayColor="rgba(0,0,0,0.3)" onPress={()=>item._renderOrderDetail(rowData)}>
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
      // get new data via SSH
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
  render: function() {
    return (
      <ScrollView 
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
    borderTopColor: "#bbb",
    borderBottomColor: "#bbb",
    borderTopWidth: Util.pixel,
    borderBottomWidth: Util.pixel,
    backgroundColor: "#f7f7f7",
    height: 110
  },
  orderStatus:{
    flex:1,
    height:30,
    paddingTop:6,
    paddingLeft:15,
    paddingBottom:5,
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
  detialSubtitle:{
    borderLeftWidth: 2,
    paddingLeft:10,
    paddingTop:2,
    paddingBottom:2,
    marginBottom:20,
    justifyContent:'center',
    marginTop:20
  },
  btn_ac:{
    marginTop:13,
    marginBottom:10,
    width:280,
    height:40,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
  },
  detailList:{
    height: Util.size.height-370,
    paddingLeft:20,paddingRight:20,//paddingTop:10,  paddingBottom:20
  },
  detailListEm:{
    fontWeight:"500",
    color: "#333",
    paddingRight:10
  },
  detailListReg:{
    color:"#555",
    paddingBottom:5,
  },
});

module.exports = Order;


