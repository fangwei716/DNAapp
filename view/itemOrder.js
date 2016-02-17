var Util = require('./utils');
var Icon = require('react-native-vector-icons/FontAwesome');
var Alipay = require('./alipay');

import React, {
  ProgressViewIOS,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  PickerIOS,
  Text,
  View
} from 'react-native';

/**
 * ItemOrder
 * @props data
 */

var ItemOrder = React.createClass({
  getInitialState: function () {
    return {
      progress: 0,
      step:0,
      data: this.props.data,
      relSelected: 0,
      samSelected: 0,
      stepTitle: "第一步: 委托人／受检人信息"
    };
  },
  _getProgress: function (progress) {
    return Math.sin(progress % Math.PI) % 1;
  },
  _updateStep: function (step) {
    var title = '';
    switch(step){
      case 0:
        title = "第一步: 委托人／受检人信息";
        break;
      case 1: 
        title = "第二步：被鉴定人信息";
        break;
      case 2: 
        title = "第三步：创建订单"
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
  _renderNextStep: function () {
    relArray = this.state.data.relation;
    samArray = this.state.data.sample;
    payInfo = this.state.data;
    switch(this.state.step){
      case 0:
        return(
          <View style={styles.orderContainer}>
            <ProgressViewIOS progressTintColor="#1E868C" style={styles.progressView} progress={this._getProgress(0.333)}/>
            <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>姓名：</Text>
            <TextInput autoFocus={true} style={styles.orderInput}/>
            </View>
            <View style={styles.orderInputContainer}>
              <Text style={styles.orderInputText}>手机号：</Text>
              <TextInput keyboardType="phone-pad" style={styles.orderInput}/>
            </View>
            <View style={styles.orderInputContainer}>
              <Text style={styles.orderInputText}>电子邮箱（选填）：</Text>
              <TextInput keyboardType="email-address" style={styles.orderInput}/>
            </View>
            <View style={styles.orderInputContainer}>
              <Text style={styles.orderInputText}>邮编（选填）：</Text>
              <TextInput keyboardType="number-pad" style={styles.orderInput}/>
            </View>
            <View style={styles.orderInputContainer}>
              <Text style={styles.orderInputText}>地址：</Text>
              <TextInput style={styles.orderInput}/>
            </View>
            <View style={styles.orderInputContainer}>
              <TouchableHighlight underlayColor="#48aeb4" style={styles.btn_pm} onPress={()=>this._updateStep(1)}>
                <Text style={{color:'#fff'}}>下一步</Text>
              </TouchableHighlight>
            </View>
          </View>
        )
      case 1:
        return(
          <View style={styles.orderContainer}>
            <ProgressViewIOS progressTintColor="#1E868C" style={styles.progressView} progress={this._getProgress(0.666)}/>
              <View style={styles.orderInputContainer}>
                <Text style={styles.orderInputText}>姓名：</Text>
                <TextInput autoFocus={true} style={styles.orderInput}/>
                </View>
                <View style={styles.orderInputContainer}>
                  <Text style={styles.orderInputText}>关系：</Text>
                  <TextInput style={styles.orderInput}/>
                </View>
                <View style={styles.orderInputContainer}>
                  <Text style={styles.orderInputText}>样本类型：</Text>
                  <TextInput style={styles.orderInput}/>
                </View>
                <View style={styles.orderInputContainer}>
                  <Text style={styles.orderInputText}>附加信息：</Text>
                  <TextInput style={styles.orderInput}/>
                </View>
                <View style={{flexDirection:"row", marginLeft:20, marginTop:20}}>
                  <TouchableHighlight underlayColor="#eee" style={[styles.btn_pm_half,{backgroundColor:"#ddd"}]} onPress={()=>this._updateStep(0)}>
                    <Text style={{color:'#fff'}}>上一步</Text>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="#48aeb4" style={[styles.btn_pm_half,{backgroundColor:"#1E868C"}]} onPress={()=>this._updateStep(2)}>
                    <Text style={{color:'#fff'}}>下一步</Text>
                  </TouchableHighlight>
                </View>
          </View>
        )
      case 2:
        return(
          <View style={styles.orderContainer}>
            <ProgressViewIOS progressTintColor="#1E868C" style={styles.progressView} progress={this._getProgress(1)}/>
            <Text style={{marginTop:20}}>订单详情。。。from Ajax</Text>
            <View style={{flexDirection:"row", marginLeft:20, marginTop:20}}>
                <TouchableHighlight underlayColor="#eee" style={[styles.btn_pm_half,{backgroundColor:"#ddd"}]} onPress={()=>this._updateStep(1)}>
                  <Text style={{color:'#fff'}}>上一步</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#48aeb4" style={[styles.btn_pm_half,{backgroundColor:"#1E868C"}]} onPress={()=>this._pay(payInfo)}>
                  <Text style={{color:'#fff'}}>前往支付</Text>
                </TouchableHighlight>
              </View>
          </View>
        )
    }
  },
  // let PickerItemIOS = PickerIOS.Item;
  // <PickerIOS
  //   selectedValue={this.state.samSelected}
  //   onValueChange={(value) => this.setState({samSelected: value})}>
  //   {samArray.map((obj) => (
  //     <PickerItemIOS
  //       key={obj.value+obj.label}
  //       value={obj.value}
  //       label={obj.label}/>
  //   ))}
  // </PickerIOS>
  render: function () {
    return(
      <View style={{marginTop: 70, paddingLeft:20, paddingRight:20}}>
        <Text style={{marginTop: 10}}>{this.state.stepTitle}</Text>
        {this._renderNextStep()}
      </View>
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
})

module.exports = ItemOrder;

