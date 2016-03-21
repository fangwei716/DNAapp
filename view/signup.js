'use strict';
import React, {AsyncStorage,Component,TouchableHighlight,StyleSheet,TextInput,Text,Modal,Image,AlertIOS,StatusBarIOS,View} from 'react-native';
import Util from './utils';
import {UserInfo} from './user';
import Icon from 'react-native-vector-icons/FontAwesome';
import Form from 'react-native-form';

/**
 * Signup
 *  - init state, isFirstTime = true.
 *    For details goes to tab.js
 */

export default class extends Component{
  static defaultProps = {
      isLogin: false,
      onSignup: false,
  };

  static propTypes = {
    isLogin: React.PropTypes.bool.isRequired,
    onSignup: React.PropTypes.bool.isRequired,
    callbackSignup: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.signupSuccess = this._signupSuccess.bind(this);
    this.closeModal = this._closeModal.bind(this);
    const userData = {
      uid:"",
      isNew: true,
      username: "",
      cellphone:"",
      email:"",
      alipayLinked: false,
      hasIdLinked: false,
      address:"",
      postcode:"",
    };

    this.state = {
      userData,
      showModal:false,
      isLogin: this.props.isLogin,
      onSignup: this.props.onSignup,
      timeStamp: 0,
      phone: "",
    };
  }

  _signup(){
    // this.signupSuccess();
    
    /**
     * reqData = {
     *   phone: this.refs.form.getValues().phoneNum,
     *   timeOfOperation: timeStamp,
     *   code:this.refs.form.getValues().veriCode,
     * }
     * resData = {
     *  correct:"false",
     *  uid: uid
     * }
     */

    var d = new Date();
    var timeStamp = d.getTime();
    Util.post("http://dnafw.com:8100/iosapp/verify_validate_code/",{
      phone: this.refs.form.getValues().phoneNum,
      timeOfOperation: timeStamp,
      code:this.refs.form.getValues().veriCode,
    },(resData) => {
        if (resData) {
          if (resData.correct==="false") {
            AlertIOS.alert('注册失败', '验证码错误');
          }else{
            this.signupSuccess();
          }
        }else{
          AlertIOS.alert('注册失败', '服务器无响应');
        }
    })
  }

  _signupSuccess() {
    const newState = {
      onSignup: false,
      showModal: true,
      phone: this.refs.form.getValues().phoneNum,
    };
    this.setState(newState);
    StatusBarIOS.setStyle(0);
  }

  _launchLogin() {
    const newState = {
      onSignup: false,
    };

    this.setState(newState);
    this.props.callbackSignup(newState);
  }

  _closeModal() {
    StatusBarIOS.setStyle(1);
    this.setState({
      showModal:false
    })
  }

  _submit() {
    if(this.refs.info._saveChanges()){
      this.closeModal()
      this._launchLogin()
    }
  }

  _getPhoneText() {
    /**
     * reqData = {
     *   phone: this.refs.form.getValues().phoneNum,
     *   timeOfOperation: timeStamp,
     * }
     * resData = {
     *  error:"false",
     *  message: message
     * }
     */
    
    let d = new Date();
    let timeStamp = d.getTime();
    if (this.state.timeStamp == 0 || timeStamp - this.state.timeStamp > 60000) {
      this.setState({
         timeStamp: timeStamp,
      });
      Util.post("http://dnafw.com:8100/iosapp/send_validate_code/",{ 
        phone: this.refs.form.getValues().phoneNum,
        timeOfOperation: timeStamp,
      },(resData) => {
          if (resData) {
            if (resData.error!=="false") {
              AlertIOS.alert('获取验证码失败', resData.message=='0'?'发送失败':'手机号已被注册');
              this.setState({
                 timeStamp: 0,
              });
            }else{
              AlertIOS.alert('获取验证码成功', '已发送到你的手机，有效时间30分钟');
            }
          }else{
            AlertIOS.alert('获取验证码失败', '服务器无响应');
            this.setState({
               timeStamp: 0,
            });
          }
      })
      
    } else {
      AlertIOS.alert("获取验证码失败", "一分钟只可获取一次")
    }
  }

  render() {
    return (
      <View style={{alignItems:"center"}}>
        <View style={{flex: 1}}>
          <Form ref="form">
            <View style={styles.inputRow}>
              <TextInput type="TextInput" name="phoneNum" placeholderTextColor="#777" style={styles.input} placeholder="手机号" keyboardType="number-pad"/>
            </View>
            <View style={styles.inputRow}>
              <TextInput type="TextInput" name="veriCode" placeholderTextColor="#777" style={styles.input} placeholder="验证码" keyboardType="number-pad"/>
            </View>
          </Form>
          <TouchableHighlight underlayColor="#fff" style={styles.btn_text} onPress={() => this._getPhoneText()}>
            <Text style={{color:'#777',fontSize:10}}>获取验证码</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputRow}>
          <TouchableHighlight underlayColor="#48aeb4" style={styles.btn_pm} onPress={() => this._signup()}>
            <Text style={{color:'#fff'}}>注册</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.btn_dec}></View>
          <Text style={styles.btn_or}>或</Text>
          <View style={styles.btn_dec}></View>
        </View>
        <View style={styles.inputRow}>
          <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={() => this._launchLogin()}>
            <Text style={{color:'#777'}}>登陆</Text>
          </TouchableHighlight>
        </View>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.showModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalNav}>
              <TouchableHighlight underlayColor="#fff" onPress={this.closeModal}><Text style={[styles.btnText,{width:80,textAlign:"left"}]}>取消</Text></TouchableHighlight>
              <Text style={styles.navTitle}>提交资料审核</Text>
              <TouchableHighlight underlayColor="#fff" onPress={() => this._submit()}><Text style={[styles.btnText,,{width:80,textAlign:"right"}]}>提交</Text></TouchableHighlight>
            </View>
            <View style={styles.modalContent}>
              <UserInfo ref="info" data={this.state.userData} phone={this.state.phone}/>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

}


var styles = StyleSheet.create({
  icon:{
    position: 'absolute',
    right: 10,
    top:9,
    color: '#999',
    backgroundColor: "transparent"
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
    marginRight: 80,
    width:Util.size.width-140,
    borderWidth:Util.pixel,
    height:40,
    paddingLeft:8,
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
  },
  btn:{
    marginTop:10,
    width:160,
    height:35,
    backgroundColor:'#eee',
    justifyContent:'center',
    alignItems:'center'
  },
  btn_text:{
    width:71,
    height:40,
    position: "absolute",
    right:0,
    top:0,
    borderColor:'#eee',
    borderWidth:Util.pixel,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:1,
    backgroundColor:"rgba(255, 255, 255, 0.75)"
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
    backgroundColor:"transparent"
  },
    modalContainer:{
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#f1f1f1"
  },
  modalNav:{
    position:"absolute",
    height:60,
    width:375,
    backgroundColor:"#fff",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:20,
    paddingLeft:15,
    paddingRight:15
  },
  modalContent:{
    alignItems:"center",
    justifyContent:"center",
    width:355,
    height:Util.size.height-60,
    marginTop:60
  },
  navTitle:{
    paddingTop:8,
    fontWeight:"500",
    color:"#222",
    fontSize:18
  },
  btnText:{
    color:"#4285f4",
    fontSize:16,
    paddingTop:10,
  },
});

