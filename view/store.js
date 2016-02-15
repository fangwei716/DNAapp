var Util = require('./utils')
var Icon = require('react-native-vector-icons/FontAwesome');
const { BlurView, VibrancyView } = require('react-native-blur');

import React, {
  NavigatorIOS,
  ProgressViewIOS,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBarIOS,
  PickerIOS,
  SegmentedControlIOS,
  Text,
  Image,
  AlertIOS,
  View
} from 'react-native';

let PickerItemIOS = PickerIOS.Item;
/**
 * ItemOrder 
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
  _renderNextStep: function () {
    relArray = this.state.data.relation;
    samArray = this.state.data.sample;
    switch(this.state.step){
      case 0:
        return(
          <View>
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
              <TouchableHighlight underlayColor="#fff" style={styles.btn_pm} onPress={()=>this._updateStep(1)}>
                <Text style={{color:'#fff'}}>下一步</Text>
              </TouchableHighlight>
            </View>
          </View>
        )
      case 1:
        return(
          <View>
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
                  <TouchableHighlight underlayColor="#fff" style={[styles.btn_pm_half,{backgroundColor:"#ddd"}]} onPress={()=>this._updateStep(0)}>
                    <Text style={{color:'#fff'}}>上一步</Text>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="#fff" style={[styles.btn_pm_half,{backgroundColor:"#1E868C"}]} onPress={()=>this._updateStep(2)}>
                    <Text style={{color:'#fff'}}>下一步</Text>
                  </TouchableHighlight>
                </View>
          </View>
        )
      case 2:
        return(
          <View>
            <Text>订单详情。。。</Text>
            <ProgressViewIOS progressTintColor="#1E868C" style={styles.progressView} progress={this._getProgress(1)}/>
            <View style={{flexDirection:"row", marginLeft:20, marginTop:20}}>
                <TouchableHighlight underlayColor="#fff" style={[styles.btn_pm_half,{backgroundColor:"#ddd"}]} onPress={()=>this._updateStep(1)}>
                  <Text style={{color:'#fff'}}>上一步</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#fff" style={[styles.btn_pm_half,{backgroundColor:"#1E868C"}]} onPress={()=>this._updateStep(2)}>
                  <Text style={{color:'#fff'}}>前往支付</Text>
                </TouchableHighlight>
              </View>
          </View>
        )
    }
  },
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
/**
 * ItemDetail
 */
var ItemDetail = React.createClass({
  getInitialState: function () {
     return {
      selectedIndex: 0
    };
  },
  _onPress: function (data) {
    this.props.navigator.push({
      title: "填写订单",
      component:ItemOrder,
      navigationBarHidden: false,
      passProps: { data: data },
    })
  },
   _onChange:function (event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  },
  _renderDetail:function () {
    if (this.state.selectedIndex==0) {
      // to be done
      return(
        <View style={{height:1300,paddingTop:10,flex : 1,alignItems: 'center'}}>
          <Image source={require('./img/detail1.jpg')} style={{height: 1300, resizeMode: Image.resizeMode.contain}}>
          </Image>
        </View>
      )
    }else if(this.state.selectedIndex==1){
      return(
        <Text>To be done</Text>
      )
    }else{
      return(
        <Text>To be done</Text>
      )
    }
  },
  render:function () {
    var data = this.props.data,
    star = '★'.repeat(data.star) + '☆'.repeat(5-data.star);
    return(
      <View style={styles.detailContainer}>
        <View style={styles.detailImg}>
          <View style={styles.bgImageWrapper}>
            <Image source={data.img} style={styles.backgroundImage}>
              <VibrancyView blurType="light" style={styles.blur}>
                <Text style={{fontSize:28}}>{data.title}</Text>
                <Text style={{fontSize:15,marginTop:5}}>{star}</Text>
                <View style={styles.detailPrice}>
                  <Text numberOfLines={data.lines} style={{fontSize:20}}>¥ {data.price}</Text>
                </View>
                <View style={{flexDirection:"row",marginTop:10}}>
                  <Icon size={15} style={{paddingRight:5}} name="dot-circle-o"></Icon>
                  <Text>{data.type}</Text>
                  <Icon size={15} style={{paddingLeft:15,paddingRight:5}} name="shopping-bag"></Icon>
                  <Text>{data.deliver}</Text>
                  <Icon size={15} style={{paddingLeft:15,paddingRight:5}} name="tags"></Icon>
                  <Text>{data.tag}</Text>
                </View>
              </VibrancyView>
            </Image>
            <View style={styles.noblur}>
              <Text numberOfLines={data.lines} style={{fontSize:13,color:"rgba(0,0,0,0.5)"}}>{data.fullIntro}</Text>
            </View>
            <View style={styles.placeorderContainer}>
              <TouchableOpacity onPress={()=>this._onPress(data)} style={styles.placeorder}><Text style={{color:"rgba(0,0,0,0.4)"}}>填写订单</Text></TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{paddingLeft:20,paddingRight:20,paddingTop:20}}>
          <SegmentedControlIOS 
          values={['产品详情', '累计评价','销售纪录']} 
          tintColor="#888" 
          selectedIndex={0}
          onChange={this._onChange}/>
          {this._renderDetail()}      
        </View>
      </View>
    )
  }
})

/**
 * Store
 * - Store (Nav)
 * - Store View 
 *   - Store Items 
 * (Pictures are for demo purpose only! 
 * with 3 deomos, find your own pics! I don't have the copyright
 * to those pics. Find your own pics and replace with current ones.)
 */
var storeItemData=[{
  title:"DNA档案",
  star: 5,
  key: "djsfhkfjdhskf",
  img: require("image!store1"),
  price: 1200,
  type:"司法类／非司法类",
  deliver:"免运费",
  tag:"特价优惠",
  lines: 3,
  relation:[{label: "父亲",value:"f"},{label:"母亲",value:"m"},{label: "爷爷",value:"ff"},{label:"奶奶",value:"mm"},{label: "外公",value:"f"},{label:"外婆",value:"m"}],
  sample:[{label: "血液",value:"f"},{label:"。。。",value:"m"}],
  fullIntro:"华大DNA服务提供的DNA档案是用DNA技术建立一个人的\n基因组图谱，主要用于银行、保险、交通行业、人身安全、\n人身担保、遗产继承、失踪、急救医学等目的。",
  intro:"华大DNA服务提供的DNA档案是用DNA技术建立一个人的基因组图谱，\n主要用于银行、保险、交通行业、人身安全、人身担保..."
},{
  title:"亲子鉴定",
  star: 4,
  key: "sgahdgaskhdaks",
  img: require("image!store3"),
  price: 1800,
  type:"司法类／非司法类",
  deliver:"免运费",
  tag:"特价优惠",
  lines:4,
  relation:[{label: "父亲",value:"f"},{label:"母亲",value:"m"}],
  sample:[{label: "血液",value:"f"},{label:"。。。",value:"m"}],
  fullIntro: "亲子鉴定服务可以判定谁是孩子的亲生父亲或者生物学父亲，\n即鉴定父与子的血缘关系。华大DNA提供法医亲子鉴定、\n家庭亲子鉴定以及妊娠亲子鉴定三大服务，以满足\n客户的不同需求。",
  intro:"亲子鉴定服务可以判定谁是孩子的亲生父亲或者生物学父亲，\n即鉴定父与子的血缘关系..."
},{
  title:"DNA家谱",
  star: 4,
  key:"dsjfhlfuiurei",
  img: require("image!store2"),
  price: 3200,
  type:"司法类／非司法类",
  deliver:"免运费",
  tag:"特价优惠",
  lines: 4,
  relation:[{label: "父亲",value:"f"},{label:"母亲",value:"m"}],
  sample:[{label: "血液",value:"f"},{label:"。。。",value:"m"}],
  fullIntro:"华大DNA服务提供源自同一父系或母系的成员之间的亲缘\n关系鉴定，例如曾祖父、祖父、与孙子、曾孙子之间，同\n胞兄弟之间，叔侄之间，外曾祖母，外祖母，与外孙女，\n之间的关系鉴定，绘制父系或母系家谱和遗传关系。",
  intro:"华大DNA服务提供源自同一父系或母系的成员之间的亲缘关系鉴定，\n例如曾祖父、祖父、与孙子、曾孙子之间，同胞兄弟之间，叔侄之间..."
}]

var StoreItemList = React.createClass({
  _onPress: function (index) {
    var data = this.props.data[index];
    this.props.navigator.push({
      title: data.title,
      component:ItemDetail,
      navigationBarHidden: false,
      passProps: { data: data },
    })
  },
  render: function () {
    var data = this.props.data, 
        star = '',
        item = this;
    var StoreItems = data.map(function(elem,index) {
      star = '★'.repeat(elem.star) + '☆'.repeat(5-elem.star)
      return (
        <TouchableHighlight style={{marginBottom: 5}}  key={elem.key} onPress={()=>item._onPress(index)}>
          <View style={styles.storeItemContainer}>
            <View style={styles.bgImageWrapper}>
              <Image style={styles.backgroundImage} source={elem.img}></Image>
            </View>
            <View style={styles.itemDrop}>
              <View style={styles.itemText1}>
                <Text style={styles.itemTitle}>{elem.title}</Text>
                <Text style={styles.itemStar}>{star}</Text>
                <Text style={styles.itemInfo}> ¥ {elem.price}</Text>
              </View>
              <View style={styles.itemText2}>
                <Text numberOfLines={2} style={styles.itemIntro}>{elem.intro}</Text>
              </View>
            </View>
            <Icon style={styles.itemNav} name="angle-right" size={35}></Icon>
          </View>
        </TouchableHighlight>
      );
    })
    return(
      <View style={{flex:1}}>
        {StoreItems}
      </View>
    )
  }

})

var StoreView = React.createClass({
  render: function () {
    return(
      <View style={styles.storeContainer}>
         <StoreItemList navigator={this.props.navigator} data={storeItemData}></StoreItemList>
      </View>
    )
  }

})

var Store = React.createClass({
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
        title:"华大商城",
        component: StoreView,
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
  storeContainer:{
    marginTop:75,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:50,
  },
  storeItemContainer:{
    height: 100,
    flex: 1
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
  itemDrop:{
    flex: 1,
    height: 100,
    backgroundColor:"rgba(0,0,0,0.35)"
  },
  itemText1:{
    position: "absolute",
    left: 20,
    top: 15,
    flexDirection: "row",
  },
  itemIntro:{
    color:"#ddd",
    flex: 1,
    fontSize: 10
  },
  itemText2:{
    position: "absolute",
    left: 20,
    top: 60,
    flexDirection: "row"
  },
  itemTitle:{
    fontSize: 30,
    color: "#ddd",
  },
  itemStar:{
    fontSize: 13,
    color: "#ddd",
    marginTop:17,
    marginLeft:20
  },
  itemInfo:{
    fontSize: 13,
    color: "#ddd",
    marginTop:16,
    marginLeft: 20
  },
  itemNav:{
    position:"absolute",
    top:30,
    right:10,
    color: "rgba(255,255,255,0.7)",
    backgroundColor:"transparent"
  },
  detailContainer:{
    flex:1
  },
  detailImg:{
    height:300
  },
  blur:{
     position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    paddingTop: 90,
    paddingLeft: 30,
    backgroundColor:"rgba(0,0,0,0.15)"
  },
  noblur:{
    position:"absolute",
    top:180,
    left: 30,
    backgroundColor:"transparent"
  },
  detailPrice:{
    position:"absolute",
    top:95,
    right: 30,
    backgroundColor:"transparent"
  },
  placeorder:{
    position:"absolute",
    bottom:15,
    left: 90,
    width:200,
    height:30,
    backgroundColor:"rgba(255,255,255,0.3)",
    justifyContent:"center",
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth:0.3,
    borderRadius:4,
    flex:1,
    alignItems:'center' 
  },
  progressView: {
    marginTop: 10,
  },
  orderInputContainer:{
    marginTop: 20, 
    paddingLeft: 20,
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
    width:280,
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
});


module.exports = Store;


