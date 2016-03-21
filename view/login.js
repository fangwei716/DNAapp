'use strict';
import React, {AsyncStorage,Component,TouchableHighlight,StyleSheet,StatusBarIOS,TextInput,Text,Image,AlertIOS,View} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';;
import Form from 'react-native-form';

export default class extends Component{
  static defaultProps = {
      isLogin: false,
      onSignup: false,
  };

  static propTypes = {
    isLogin: React.PropTypes.bool.isRequired,
    onSignup: React.PropTypes.bool.isRequired,
    callbackLogin: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.loginSuccess = this._loginSuccess.bind(this);

    this.state = {
      isLogin: this.props.isLogin,
      onSignup: this.props.onSignup,
    };
  }

  componentDidMount() {
    StatusBarIOS.setStyle(1);
  }

  _login(){
    // this.loginSuccess();
    /**
     * reqData = {
     *   username:,
     *   password:,
     * }
     *
     * resData = {
     *   isFirstTime,
     *   uid,
     *   error,
     *   loginState
     * }
     */
    Util.post("http://dnafw.com:8100/iosapp/login/", {
        username: this.refs.form.getValues().username.trim(),
        password: this.refs.form.getValues().password,
      }, (resData) => {
        console.log(resData)
        if (resData) {
          if (resData.error!=="false") {
            switch(resData.loginState){                                                                  
              case "2": 
                AlertIOS.alert('登陆失败', '用户名不存在');
                break;
              case "3":
                AlertIOS.alert('登陆失败', '用户名或密码不匹配');
            }
          }else{
            this.loginSuccess();
            AsyncStorage.setItem('loginState',"1");
            AsyncStorage.setItem('isFirstTime',resData.isFirstTime);
            AsyncStorage.setItem('uid',resData.uid);
          }
        }else{
          AlertIOS.alert('登陆失败', '服务器无响应');
        }
    })
  }

  _loginSuccess() {
    // for now, isFirstTime must be 0 to login
    const newState = {
      onSignup: false,
    }
    this.setState(newState);
    this.props.callbackLogin(newState);
  }

  _launchSignup() {
    const newState = {
      onSignup: true
    }
    this.setState(newState);
    this.props.callbackLogin(newState);
  }

  render() {
    return (
      <View style={{alignItems:"center"}}>
        <Form ref="form">
          <View style={styles.inputRow}>
            <TextInput type="TextInput" name="username" returnKeyType = {"next"} onSubmitEditing={(event) => {this.refs.SecondInput.focus(); }} placeholderTextColor="#777" style={styles.input} placeholder="用户名"/>
            <Icon name="user" style={styles.icon} size={20} />
          </View>
          <View style={styles.inputRow}>
            <TextInput type="TextInput" name="password" ref='SecondInput' placeholderTextColor="#777" style={styles.input} placeholder="密码" password={true}/>
            <Icon name="lock" style={styles.icon} size={20} />
          </View>
        </Form>
        <View style={styles.inputRow}>
          <TouchableHighlight underlayColor="#48aeb4" style={styles.btn_pm} onPress={() => this._login()}>
            <Text style={{color:'#fff'}}>登录</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.btn_dec}></View>
          <Text style={styles.btn_or}>或</Text>
          <View style={styles.btn_dec}></View>
        </View>
        <View style={styles.inputRow}>
          <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={() => this._launchSignup()}>
            <Text style={{color:'#777'}}>注册</Text>
          </TouchableHighlight>
        </View>
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
    width:Util.size.width-80,
    borderWidth:Util.pixel,
    height:40,
    paddingLeft:12,
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
    borderRadius:1
  },
  btn:{
    marginTop:10,
    width:160,
    height:35,
    backgroundColor:'#eee',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:1
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
    backgroundColor: "transparent"
  },
});
