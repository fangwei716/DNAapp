var Util = require('./utils');
var Icon = require('react-native-vector-icons/FontAwesome');
var Alipay = require('./alipay');

import Form from 'react-native-form'

import React, {
  ProgressViewIOS,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  PickerIOS,
  ScrollView,
  Text,
  View
} from 'react-native';

/**
 * ItemOrder
 * @props data: storeItemData.key
 */  
  
/**
 * ItemOrderData
 * @dynamic based on the passed key; get init form1 and form2 value via SSH
 *   - form1
 *     - ...
 *   - form2
 *     - ...
 *   - orderID
 *   - price
 *   - userID 
 */

var ItemOrder = React.createClass({
  getInitialState: function () {
   // fetch via SSH
   var ItemOrderData ={
      orderID: "dsjhflsjdklcxsnkds", 
      price:1200, 
      userID:"fiorujewlknmwenfmsd",
      form1:{
        name:"Wei Fang",
        phoneNum: "1345555336",
        email:"fangwei716@gmail.com",
        postcode:"350110",
        address:"somewhere"
      },
      form2:{
        name:"",
        rel:"",
        sample:"",
        msg:""
      }
   }
   return({
      progress: 0,
      step:0,
      serviceKey: this.props.data,
      relSelected: 0,
      samSelected: 0,
      stepTitle: "第一步: 委托人／受检人信息",
      orderID: ItemOrderData.orderID,
      price: ItemOrderData.price,
      userID: ItemOrderData.userID,
      form1: ItemOrderData.form1,
      form2: ItemOrderData.form2
    })
  },
  _getProgress: function (progress) {
    return Math.sin(progress % Math.PI) % 1;
  },
  _updateStep: function (step) {
    var title = '';
    this.setState({
      form1: this.refs.form1.getValues(),
      form2: this.refs.form2.getValues()
    })
    switch(step){
      case 0:
        title = "第一步: 委托人／受检人信息";
        styles.form1={
        }
        styles.form2={
          width:0,
          height:0,
          opacity:0
        }
        styles.form3={
          width:0,
          height:0,
          opacity:0
        }
        break;
      case 1: 
        title = "第二步：被鉴定人信息";
        styles.form2={
        }
        styles.form1={
          width:0,
          height:0,
          opacity:0
        }
        styles.form3={
          width:0,
          height:0,
          opacity:0
        }
        break;
      case 2: 
        title = "第三步：创建订单"
        styles.form3={
        }
        styles.form1={
          width:0,
          height:0,
          opacity:0
        }
        styles.form2={
          width:0,
          height:0,
          opacity:0
        }
        break;
    }
    this.setState({
      step: step,
      stepTitle: title
    });
  },
  _pay:function (data) {
   this.props.navigator.push({
      title: "支付宝",
      component:Alipay,
      navigationBarHidden: false,
      passProps: { data: data },
    })
  },
  render: function () {
    return(
      <ScrollView  showsVerticalScrollIndicator={false} style={{paddingLeft:20, paddingRight:20, backgroundColor:"#f7f7f7"}}>
        <Text style={{marginTop: 10}}>{this.state.stepTitle}</Text>
        <View style={[styles.orderContainer,styles.form1]}>
            <ProgressViewIOS progressTintColor="#1E868C" style={styles.progressView} progress={this._getProgress(0.333)}/>
            <Form ref="form1">
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>姓名：</Text>
                <TextInput defaultValue={this.state.form1.name}  type="TextInput" name="name" style={styles.orderInput}/>
              </View>
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>手机号：</Text>
                <TextInput defaultValue={this.state.form1.phoneNum} type="TextInput" name="phoneNum"  keyboardType="phone-pad" style={styles.orderInput}/>
              </View>
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>电子邮箱（选填）：</Text>
                <TextInput defaultValue={this.state.form1.email}  type="TextInput" name="email" keyboardType="email-address" style={styles.orderInput}/>
              </View>
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>邮编（选填）：</Text>
                <TextInput defaultValue={this.state.form1.postcode} type="TextInput" name="postcode"  keyboardType="number-pad" style={styles.orderInput}/>
              </View>
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>地址：</Text>
                <TextInput defaultValue={this.state.form1.address} type="TextInput" name="address" style={styles.orderInput}/>
              </View>
            </Form>
            <View style={styles.orderInputContainer}>
              <TouchableHighlight underlayColor="#48aeb4" style={styles.btn_pm} onPress={()=>this._updateStep(1)}>
                <Text style={{color:'#fff'}}>下一步</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={[styles.orderContainer, styles.form2]}>
            <ProgressViewIOS progressTintColor="#1E868C" style={styles.progressView} progress={this._getProgress(0.666)}/>
              <Form ref="form2">
                <View style={styles.orderInputContainer}>
                  <Text style={styles.orderInputText}>姓名：</Text>
                  <TextInput defaultValue={this.state.form2.name} type="TextInput" name="name" style={styles.orderInput}/>
                </View>
                <View style={styles.orderInputContainer}>
                  <Text style={styles.orderInputText}>关系：</Text>
                  <TextInput defaultValue={this.state.form2.rel} type="TextInput" name="rel" style={styles.orderInput}/>
                </View>
                <View style={styles.orderInputContainer}>
                  <Text style={styles.orderInputText}>样本类型：</Text>
                  <TextInput defaultValue={this.state.form2.sample} type="TextInput" name="sample" style={styles.orderInput}/>
                </View>
                <View style={styles.orderInputContainer}>
                  <Text style={styles.orderInputText}>附加信息：</Text>
                  <TextInput defaultValue={this.state.form2.msg} type="TextInput" name="msg" style={styles.orderInput}/>
                </View>
              </Form>
              <View style={{flexDirection:"row", marginLeft:20, marginTop:20}}>
                <TouchableHighlight underlayColor="#eee" style={[styles.btn_pm_half,{backgroundColor:"#ddd"}]} onPress={()=>this._updateStep(0)}>
                  <Text style={{color:'#fff'}}>上一步</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#48aeb4" style={[styles.btn_pm_half,{backgroundColor:"#1E868C"}]} onPress={()=>this._updateStep(2)}>
                  <Text style={{color:'#fff'}}>下一步</Text>
                </TouchableHighlight>
              </View>
          </View>
          <View style={[styles.orderContainer,styles.form3]}>
            <ProgressViewIOS progressTintColor="#1E868C" style={styles.progressView} progress={this._getProgress(1)}/>
            <Text style={{marginTop:20}}>订单详情。。。from SSH</Text>
            <View style={{flexDirection:"row", marginLeft:20, marginTop:20}}>
                <TouchableHighlight underlayColor="#eee" style={[styles.btn_pm_half,{backgroundColor:"#ddd"}]} onPress={()=>this._updateStep(1)}>
                  <Text style={{color:'#fff'}}>上一步</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#48aeb4" style={[styles.btn_pm_half,{backgroundColor:"#1E868C"}]} onPress={()=>this._pay(payInfo)}>
                  <Text style={{color:'#fff'}}>前往支付</Text>
                </TouchableHighlight>
              </View>
          </View>
      </ScrollView>
    )
  }
})

const styles = StyleSheet.create({
  progressView: {
    marginTop: 10,
    width: Util.size.width-40
  },
  orderContainer:{
    alignItems:'center',
    flex:1,
    width: Util.size.width-40
  },
  orderInputContainer:{
    marginTop: 20, 
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
  btn_pm:{
    marginTop:13,
    width:280,
    height:40,
    borderRadius:2,
    backgroundColor:'#1E868C',
    justifyContent:'center',
    alignItems:'center',
  },
  btn_pm_half:{
    marginTop:13,
    width:135,
    marginRight:10,
    height:40,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:"row",
    flexWrap: 'wrap'
  },
  form1:{
  },
  form2:{
    width:0,
    height:0,
    opacity:0
  },
  form3:{
    width:0,
    height:0,
    opacity:0
  }
})

module.exports = ItemOrder;

