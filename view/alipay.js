'use strict';
import React, {Component,StyleSheet,View,Image,Text,TouchableHighlight} from 'react-native';
import Util from './utils';
/**
 * Alipay
 * - Used for Alipay payment
 * - link varies. Refer to the alipay API
 */

export default class extends Component{
  static propTypes = {
    order_number:React.PropTypes.number.isRequired
  };

  _pay() {
    Util.post("https://dnafw.com:8100/iosapp/pay_order/",{
      order_number: this.props.order_number,
    },(resData) => {
      if (resData.error !== "true") {
          if (resData.message==="0") {
            AlertIOS.alert('请稍后再试');
          }else{
            AlertIOS.alert('支付成功','请前往全部订单查看订单，并刷新订单');
            this.props.navigator.popToTop();
          }
        }else{
          AlertIOS.alert('服务器无响应', '请稍后再试');
        }
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>订单编号: {this.props.order_number}</Text>
        <Image style={styles.payment} source={{uri:"http://dnafw.com:8100/media/payment.png"}}></Image>
        <TouchableHighlight underlayColor="#48aeb4" style={styles.btn_pm} onPress={()=>this._pay()}>
          <Text style={{color:'#fff'}}>确认付款</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: Util.size.width,
    height:Util.size.height,
    paddingTop:90,
    alignItems:"center",
  },
  payment:{
    height: 0.7*Util.size.width,
    width: 0.7*Util.size.width,
    marginTop:30,
    marginBottom:30,
  },
  btn_pm:{
    marginTop:13,
    width:0.8*Util.size.width,
    height:40,
    borderRadius:2,
    backgroundColor:'#1E868C',
    justifyContent:'center',
    alignItems:'center',
  },
})
