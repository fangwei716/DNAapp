'use strict';
import React, {Component,AsyncStorage,AlertIOS,NavigatorIOS,TouchableHighlight,TouchableOpacity,StyleSheet,TextInput,ListView,WebView,ScrollView,StatusBarIOS,Text,Image,View} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivityView from 'react-native-activity-view';
import {ImagePickerManager} from 'NativeModules';
import {BlurView,VibrancyView} from 'react-native-blur';
import Form from 'react-native-form';

/**
 * - User
 *  - UserView
 *    - UserInfo
 *      - UserChangePhoneNum
 *    - UserLink
 *    - UserHelp
 *    - UserSetting
 *    - UserAbout
 *    - UserPurse
 */

export class UserInfo extends Component{
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      idFrontSource: {uri:'idfront'},
      idFrontSourceData: "",
      idBackSource: {uri:'idback'},
      idBackSourceData:""
    };
  }

  _saveChanges() {
    // AlertIOS.alert('提交成功', '请耐心等待审核');
    // return true
    // SSH post: this.refs.form.getValues()
    const info = this.refs.form.getValues();
    Util.post("http://dnafw.com:8100/iosapp/register/",{
       ...info,
       gender: "男",
       alipay_number: "12333",
       // images are sent as jpeg base64
       id_card_1: this.state.idFrontSourceData,
       id_card_2: this.state.idBackSourceData,
    }, (resData) => {
        if (resData) {
          if (resData.message==="0") {
            AlertIOS.alert('提交失败', '某某资料错误');
            return false
          }else{
            return true
          }
        }else{
          AlertIOS.alert('提交失败', '服务器无响应');
          return false
        }
    })
  }

  _uploadId() {
    const options = {
      title: '选择身份证正面照', 
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照', 
      chooseFromLibraryButtonTitle: '从手机相册选取', 
      cameraType: 'back', 
      mediaType: 'photo', 
      allowsEditing: false,
      noData: false, 
      storageOptions: { 
        skipBackup: true, 
        path: 'images'
      }
    };
    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        const sourceData = 'data:image/jpeg;base64,' + response.data;
        this.setState({
          idFrontSource: source,
          idFrontSourceData: sourceData
        });
        console.log(this.state.idFrontSource)
      }
    });
  }

  _uploadIdBack() {
    const options = {
      title: '选择身份证背面照', 
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照', 
      chooseFromLibraryButtonTitle: '从手机相册选取', 
      cameraType: 'back', 
      mediaType: 'photo', 
      allowsEditing: false, 
      noData: false, 
      storageOptions: { 
        skipBackup: true, 
        path: 'images' 
      }
    };
    ImagePickerManager.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        const sourceData = 'data:image/jpeg;base64,' + response.data;
        this.setState({
          idBackSource: source,
          idBackSourceData: sourceData
        });
      }
    });
  }

  _inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        130, //additionalOffset
        true
      );
    }, 50);
  }

  _refFocus (nextField) {
    this.refs[nextField].focus();
  }

  render() {
    const data = this.props.data;
    let oldPass = null;
    let idInput = null;
    let idUpload = null;

    if (!data.isNew) {
      oldPass = <View style={styles.orderInputContainer}>
          <Text style={styles.orderInputText}>旧密码：</Text>
          <TextInput type="TextInput"  password={true} name="oldPassword" style={styles.orderInput}/>
        </View>
    }else{
      oldPass = <View></View>
    }

    if (true) {
      idInput = <View style={styles.orderInputContainer}>
          <Text style={styles.orderInputText}>身份证号码：</Text>
          <TextInput type="TextInput" name="id_number" keyboardType="number-pad" style={styles.orderInput} ref="id" returnKeyType = {"next"} onFocus={()=>this._inputFocused("id")} onSubmitEditing={(event) => {this._refFocus("address");}} />
        </View>
      idUpload = <View style={[styles.orderButtonContainer,{paddingBottom:30}]}>
          <TouchableHighlight underlayColor="#eee" style={[styles.btn_if,{backgroundColor:'#ddd'}]} onPress={() => this._uploadId()}>
            <Text style={{color:'#555'}}>上传身份证正面照</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#eee" style={[styles.btn_if,{backgroundColor:'#ddd'}]} onPress={() => this._uploadIdBack()}>
            <Text style={{color:'#555'}}>上传身份证背面照</Text>
          </TouchableHighlight>
          <View style={{flex:1,flexDirection:"row"}}>
            <Image source={this.state.idFrontSource} style={[styles.uploadId,{marginRight:30}]} />
            <Image source={this.state.idBackSource} style={styles.uploadId} />
          </View>
        </View>
    }else{
      idInput = <View></View>;
      idUpload = <View></View>;
    }

    return(
      <ScrollView  ref='scrollView' showsVerticalScrollIndicator={false}>
        <Text style={{paddingLeft:30,paddingTop:20,color:"#888"}}>需要提交资料审核后完成注册，资料审核成功后将有邮件通知你。审核需要24小时。</Text>
        <Form style={styles.orderContainer} ref="form">
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>用户名：</Text>
            <TextInput defaultValue={data.username} type="TextInput" name="name" style={styles.orderInput} ref="username" returnKeyType = {"next"} onFocus={()=>this._inputFocused("username")}  onSubmitEditing={(event) => {this._refFocus("email");}} />
          </View>
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>邮箱：</Text>
            <TextInput defaultValue={data.email} type="TextInput" name="email" style={styles.orderInput} ref="email" returnKeyType = {"next"} onFocus={()=>this._inputFocused("email")}  onSubmitEditing={(event) => {this._refFocus("password");}} />
          </View>
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>新密码：</Text>
            <TextInput  type="TextInput"  password={true} name="password" style={styles.orderInput} ref="password" returnKeyType = {"next"} onFocus={()=>this._inputFocused("password")}  onSubmitEditing={(event) => {this._refFocus("id");}} />
          </View>
          {idInput}
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>地址：</Text>
            <TextInput defaultValue={data.address} type="TextInput" name="address" style={styles.orderInput} ref="address" returnKeyType = {"next"} onFocus={()=>this._inputFocused("address")}  onSubmitEditing={(event) => {this._refFocus("postcode");}} />
          </View>
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>邮编：</Text>
            <TextInput defaultValue={data.postcode} type="TextInput" name="postcode" keyboardType="number-pad" style={styles.orderInput} ref="postcode" onFocus={()=>this._inputFocused("postcode")}   onSubmitEditing={(event) => {this._refFocus("alipay");}}/>
          </View>
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>支付宝帐户：</Text>
            <TextInput defaultValue={data.postcode} type="TextInput" name="alipay" style={styles.orderInput} ref="alipay" onFocus={()=>this._inputFocused("alipay")} />
          </View>
        </Form>
        {idUpload}
      </ScrollView>
    );
  }
}

class UserChangePhoneNum extends Component{
  render() {
    return(
      <WebView
        automaticallyAdjustContentInsets={false}
        url={"http://www.dnafw.com"}
        style={{marginTop:60}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />
    );
  }
}

class UserRefund extends Component{
  static propTypes = {
    uid: React.PropTypes.string.isRequired,
    balance: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      balance: this.props.balance,
    }
  }

  _onSubmitRefund() {
      let inputMoney = parseInt(this.refs.refundForm.getValues().refundMoney);
      if (inputMoney>this.state.balance) {
        AlertIOS.alert("提现失败","你的钱包里没有足够的钱")
      }else{
        Util.post("http://dnafw.com:8100/iosapp/withdraw_to_alipay/",{
          uid: this.state.uid,
          money: inputMoney
        },(resData) => {
           if (resData.message=="1") {
              console.log(resData);
              AlertIOS.alert("提现成功","将在24小时内转到你的支付宝账户");
              this.props.updateMoney(resData.balance);
              this.props.navigator.pop();
           }
        })
      }
  }

  render() {
    return(
      <View style={{marginTop:70, alignItems:"center"}}>
        <Form ref="refundForm">
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>提现金额：</Text>
            <TextInput keyboardType="number-pad" type="TextInput" name="refundMoney" style={styles.orderInput}/>
          </View>
        </Form>
        <TouchableHighlight underlayColor="#48aeb4" style={[styles.btn_if,{backgroundColor:'#1E868C',marginTop:20}]} onPress={() => this._onSubmitRefund()}>
          <Text style={{color:'#fff'}}>确认提现</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class UserPurse extends Component{
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    balance: React.PropTypes.number.isRequired,
    updateMoney: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.data,
      balance: this.props.balance,
    }
  }

  _updatePurseMoney = (amount) => {
    this.setState({
      balance: amount,
    });
    this.props.updateMoney(amount);
  };

  _onPressPurse() {
    this.props.navigator.push({
      title: "收支明细",
      component:UserIncome,
      navigationBarHidden: false,
      passProps:{uid:this.state.userData.uid},
    })
  }

  _onPressRefund() {
    this.props.navigator.push({
      title: "提现到支付宝",
      component:UserRefund,
      navigationBarHidden: false,
      passProps:{balance:this.state.balance,uid:this.state.userData.uid, updateMoney: this._updatePurseMoney},
    })
  }

  _onPressLink() {
    this.props.navigator.push({
      title: "关联支付宝",
      component:UserLink,
      navigationBarHidden: false,
      passProps:{data:this.state.userData},
    })
  }

  render() {
    return(
      <View style={{marginTop:80}}>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onPressPurse()}>
          <View style={[styles.userMenu,{paddingLeft:15,paddingRight:15}]}>
            <Text>钱包余额</Text>
            <Text style={styles.itemNavText}>{this.state.balance}元 </Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onPressRefund()}>
          <View style={[styles.userMenu,{paddingLeft:15,paddingRight:15}]}>
            <Text>提现到支付宝</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onPressLink()}>
          <View style={[styles.userMenu,{paddingLeft:15,paddingRight:15}]}>
            <Text>关联支付宝</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class UserLink extends Component{
  _onSubmitLink() {
    const alipay = this.refs.linkForm.getValues().alipay;
    if (alipay === this.refs.linkForm.getValues().realipay) {
      //ssh
    }else{
      AlertIOS.alert("支付宝帐户不匹配");
    }
  }

  render() {
    return(
      <View style={{marginTop:70, alignItems:"center"}}>
        <Form ref="linkForm">
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>支付宝帐户：</Text>
            <TextInput type="TextInput" name="alipay" style={styles.orderInput}/>
          </View>
          <View style={styles.orderInputContainer}>
            <Text style={styles.orderInputText}>确认支付宝帐户：</Text>
            <TextInput type="TextInput" name="realipay" style={styles.orderInput}/>
          </View>
        </Form>
        <TouchableHighlight underlayColor="#48aeb4" style={[styles.btn_if,{backgroundColor:'#1E868C',marginTop:20}]} onPress={() => this._onSubmitLink()}>
          <Text style={{color:'#fff'}}>确认绑定</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class UserHelp extends Component{
  render() {
    return(
      <WebView
        automaticallyAdjustContentInsets={false}
        url={"http://www.dnafw.com"}
        style={{marginTop:60}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />
    );
  }
}

class UserSetting extends Component{
  render() {
    return(
      <View>
        <Text style={styles.userSettingContainer}>List of settings...</Text>
      </View>
    );
  }
}

class UserAbout extends Component{
  render() {
    return(
      <View>
        <Text style={styles.userSettingContainer}>All rights reserved...</Text>
      </View>
    );
  }
}

class UserIncome extends Component{
  static propTypes = {
    uid: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const uid = this.props.uid;
    let data=[], sectiondata=[];
    // return resData{data:data,sectiondata:sectiondata}
    // const data = [[{
    //     income:"+ ¥50",
    //     day:"02-23",
    //     week:"周二",
    //     icon:'baby',
    //     orderItem:"亲子鉴定",
    //     orderId:"65438023"
    //   },{
    //     income:"- ¥320",
    //     day:"02-22",
    //     week:"周一",
    //     icon:'refund',
    //     orderItem:"提现到支付宝",
    //     orderId:"f7d9437"
    //   },{
    //     income:"+ ¥70",
    //     day:"02-14",
    //     week:"周日",
    //     icon:'file',
    //     orderItem:"DNA档案",
    //     orderId:"749327474"
    //   },{
    //     income:"+ ¥60",
    //     day:"02-10",
    //     week:"周三",
    //     icon:'baby',
    //     orderItem:"亲子鉴定",
    //     orderId:"237957923"
    //   },],[{
    //     income:"+ ¥60",
    //     day:"01-27",
    //     week:"周三",
    //     icon:'family',
    //     orderItem:"DNA家谱",
    //     orderId:"597927595"
    //   },{
    //     income:"+ ¥60",
    //     day:"01-16",
    //     week:"周六",
    //     icon:'file',
    //     orderItem:"DNA档案",
    //     orderId:"598734987"
    //   },{
    //     income:"+ ¥60",
    //     day:"01-15",
    //     week:"周二",
    //     icon:'baby',
    //     orderItem:"亲子鉴定",
    //     orderId:"597927595"
    //   },{
    //     income:"+ ¥60",
    //     day:"01-11",
    //     week:"周一",
    //     icon:'file',
    //     orderItem:"DNA档案",
    //     orderId:"598734987"
    //   },{
    //     income:"+ ¥60",
    //     day:"01-03",
    //     week:"周日",
    //     icon:'family',
    //     orderItem:"DNA家谱",
    //     orderId:"597927595"
    //   },{
    //     income:"+ ¥60",
    //     day:"01-16",
    //     week:"周六",
    //     icon:'file',
    //     orderItem:"DNA档案",
    //     orderId:"598734987"
    //   }],[{
    //     income:"+ ¥60",
    //     day:"12-25",
    //     week:"周五",
    //     icon:'file',
    //     orderItem:"DNA档案",
    //     orderId:"759473957"
    //   },{
    //     income:"+ ¥60",
    //     day:"12-11",
    //     week:"周五",
    //     icon:'family',
    //     orderItem:"DNA家谱",
    //     orderId:"493275429"
    //   },]];
    // const sectiondata = ["本月","2016年1月","2015年12月"]
    const getSectiondata = function(dataIncome, sectionID) {
      return dataIncome[sectionID];
    };

    this.state = {
      dataSection: sectiondata,
      dataSource: new ListView.DataSource({
        getSectiondata: getSectiondata,
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }).cloneWithRowsAndSections(data),
    };
  }

  componentWillMount() {
    const uid = this.props.uid;
    const getSectiondata = function(dataIncome, sectionID) {
      return dataIncome[sectionID];
    };
    Util.post("http://dnafw.com:8100/iosapp/balance_history/",{uid}, (resData) => {
      if (resData.data){
        // console.log(resData);
        let data = resData.data;
        let sectiondata = resData.sectiondata;

        this.setState({
          dataSection: sectiondata,
          dataSource: new ListView.DataSource({
            getSectiondata: getSectiondata,
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          }).cloneWithRowsAndSections(data),
        });

      }
    })
  }

  _renderSectionHeader = (sectiondata, sectionID) => {
    return(
      <View style={styles.section}>
        <Text style={styles.sectionText}>{this.state.dataSection[sectionID]}</Text>
      </View>
    )
  };

  _renderRow = (rowData: object, sectionID: number, rowID: number) => {
    return (
      <View>
        <View>
          <View style={styles.incomeRow}>
            <View style={styles.incomeRowText}>
              <Text style={{color:"#777"}}>{rowData.week}</Text>
              <Text style={{color:"#777"}}>{rowData.day}</Text>
            </View>
            <View style={styles.incomeRowIcon}>
              <Image source={{uri:rowData.icon}} style={{width:30,height:30}}></Image>
            </View>
            <View style={styles.incomeRowOrder}>
              <Text style={{color:"#333",fontSize:17,paddingBottom:3}}>{rowData.income}</Text>
              <Text style={{color:"#555",fontSize:11.5}}>{rowData.orderItem+"："+rowData.orderId}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return(
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderSectionHeader}
        />
    );
  }
}

class UserShare extends Component{
  _shareWechat() {
    
  }

  _shareWeibo() {
    
  }

  _shareQQ() {
    
  }

  render() {
    return(
      <View style={{paddingTop:90}}>
       <View style={styles.orderButtonContainer}>
          <TouchableHighlight underlayColor="#55D95D" style={[styles.btn_if,{backgroundColor:'#24bf2f'}]} onPress={() => this._shareWechat()}>
            <Text style={{color:'#fff'}}>
            <Icon size={15} name="weixin"></Icon> 分享到微信
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.orderButtonContainer}>
          <TouchableHighlight underlayColor="#db7822" style={[styles.btn_if,{backgroundColor:'#F27405'}]} onPress={() => this._shareWeibo()}>
            <Text style={{color:'#fff'}}>
            <Icon size={15} name="weibo"></Icon> 分享到微博</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.orderButtonContainer}>
          <TouchableHighlight underlayColor="#38b4db" style={[styles.btn_if,{backgroundColor:'#15b3e5'}]} onPress={() => this._shareQQ()}>
            <Text style={{color:'#fff'}}>
              <Icon size={15} name="qq"></Icon> 分享到QQ
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

/**
 * userData
 * @dynamic
 * 
 * Data Flow:
 * userData -> UserView -> userInfo
 *                      -> userLink
 */

class UserView extends Component{
  static propTypes = {
    uid: React.PropTypes.string.isRequired,
    isFirstTime: React.PropTypes.bool.isRequired,
    callbackLogout: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    let userData, userBalance;
    // AsyncStorage.getItem('uid').then((value) => {console.log(value)});

    userBalance = 0;
    userData = {
      uid:"",
      isNew: true,
      username: "",
      cellphone: "",
      email:null,
      alipayLinked: false,
      address:"",
      postcode:"",
      img: "http://www.dnafw.com:8100/media/user/avatar/user-default.jpg", 
    };

    this.state = {
      isFirstTime: this.props.isFirstTime,
      userData: userData,
      balance: userBalance,
    };
  }

  componentWillMount() {
    Util.post("http://dnafw.com:8100/iosapp/my_info/", {uid:this.props.uid}, (resData) => {
      if (resData.error!=="true"){
        this.setState({
          userData: resData.userData,
          balance: resData.userBalance,
        })
      } 
    });
  }

  _updateMoney = (amount) => {
    this.setState({
      balance:amount
    })
  };

  _logout() {
    AsyncStorage.setItem('loginState',"0")
    const newState = {
      onSignup: false,
    };
    this.props.callbackLogout(newState);
  }

  _onIncomePress() {
    this.props.navigator.push({
      title: "收支明细",
      component:UserIncome,
      navigationBarHidden: false,
      passProps:{uid:this.props.uid}
    })
  }

  _onInfoPress() {
    this.props.navigator.push({
      title: "编辑资料",
      component:UserInfo,
      navigationBarHidden: false,
      passProps:{data:this.state.userData}
    })
  }

  _onPursePress() {
    this.props.navigator.push({
      title: "我的钱包",
      component:UserPurse,
      navigationBarHidden: false,
      passProps:{data:this.state.userData,balance: this.state.balance, updateMoney: this._updateMoney},
    })
  }

  _onHelpPress() {
    this.props.navigator.push({
      title: "帮助中心",
      component:UserHelp,
      navigationBarHidden: false,
    })
  }

  _onSettingPress() {
    this.props.navigator.push({
      title: "设置",
      component:UserSetting,
      navigationBarHidden: false,
    })
  }

  _onAboutPress() {
    this.props.navigator.push({
      title: "关于微代理",
      component:UserAbout,
      navigationBarHidden: false,
    })
  }

  _onSharePress() {
    ActivityView.show({
      url: 'https://www.dnafw.com/iosapp',
    });
  }

  _renderFirstTimeMsg = () => {
    if (this.state.isFirstTime) {
      return(
        <View style={styles.ftMsg}>
          <Text style={{color:"#fff"}}>
            你的资料尚未填写完整或正在审核中，请点击上面进入编辑资料或查看你的资料审核进度。审核成功后，你便可以使用微代理的完整功能。
          </Text>
        </View>
      )
    };
  };

  render() {
    const data = this.state.userData;
    return(
      <ScrollView showsVerticalScrollIndicator={false} style={styles.userContainer}>
        <View style={{marginBottom:35}}>
          <View style={styles.userHero}>
            <View style={styles.bgImageWrapper}>
              <Image source={{uri:data.img}} style={styles.backgroundImage}>
                <BlurView blurType="light" style={styles.blur}>
                  <Image source={{uri:data.img}} style={styles.icon}>
                  </Image>
                  <Text style={{fontSize:18,color:"#3a3a3a"}}>{data.username? data.username:"用户名未设置"}</Text>
                  <Text style={{fontSize:13,color:"#3a3a3a",marginTop:5}}>帐号：{data.cellphone}</Text>
                  <Text style={{fontSize:13,color:"#3a3a3a",marginTop:5}}>钱包：¥{this.state.balance}</Text>
                </BlurView>
              </Image>
            </View>
          </View>
        </View>
        {this._renderFirstTimeMsg()}
        <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onPursePress()}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="shopping-bag" size={18}></Icon>
            <Text>我的钱包</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onIncomePress()}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="list-alt" size={18}></Icon>
            <Text>支出明细</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onHelpPress()}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="question-circle" size={18}></Icon>
            <Text>帮助中心</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onSettingPress()}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="cog" size={18}></Icon>
            <Text>设置</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onAboutPress()}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="info-circle" size={18}></Icon>
            <Text>关于微代理</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onSharePress()}>
          <View style={styles.userMenu}>
            <Icon style={styles.itemNavIcon} name="share-alt-square" size={18}></Icon>
            <Text ref="share">推荐给朋友</Text>
            <Icon style={styles.itemNavMenu} name="angle-right" size={20}></Icon>
          </View>
        </TouchableHighlight>
        <View style={{alignItems:"center",width:Util.size.width}}>
          <TouchableHighlight underlayColor="#ee6146" style={styles.btn_pm} onPress={() => this._logout()}>
              <Text style={{color:'#fff'}}>注销帐户</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

export default class extends Component{
  static propTypes = {
    uid: React.PropTypes.string.isRequired, 
    isFirstTime: React.PropTypes.bool.isRequired, 
    callbackLogout: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFirstTime: this.props.isFirstTime,
      uid: this.props.uid,
    };
  }

  componentDidMount() {
    StatusBarIOS.setStyle(0);
  }

  render(){
    const callback = this.props.callbackLogout;
    const isFirstTime = this.state.isFirstTime;
    const uid = this.state.uid;

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
            uid: uid,
          },
          shadowHidden: true
        }}
        itemWrapperStyle={styles.itemWrapper}
        tintColor="#777"
      />
    );
  }
}

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
    paddingTop: 69,
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
  itemNavText:{
    position:"absolute",
    top:13,
    right:30,
    color: "#777",
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
  uploadId:{
    height:100,
    width:100,
    marginTop:20,
    flex:1,
    borderWidth: 1,
    borderColor: "#aaa"
  },
  btn_if:{
    marginTop:10,
    width:Util.size.width-80,
    height:40,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
  },
  section:{
    backgroundColor: "#f3f3f3",
    paddingLeft:15,
    paddingTop:7,
    paddingBottom:7,
    borderBottomColor:"#ddd",
    borderBottomWidth: Util.pixel
  },
  sectionText:{

  },
  incomeRow:{
    backgroundColor: "#fff",
    height:60,
    borderBottomColor:"#ddd",
    borderBottomWidth: Util.pixel,
    flexDirection:"row",
    paddingLeft:15,
    paddingRight: 15,
    justifyContent:"center"
  },
  incomeRowText:{
    flex:1,
    justifyContent:"center"
  },
  incomeRowIcon:{
    flex:1,
    justifyContent:"center"
  },
  incomeRowOrder:{
    flex:3,
    justifyContent:"center"
  },
  userSettingContainer:{
    marginTop: 100, 
    marginLeft:30,
  },
})