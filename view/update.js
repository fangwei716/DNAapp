'use strict';
import React, {Component,TouchableHighlight,StyleSheet,NavigatorIOS,StatusBarIOS,Text,Image,ScrollView,RefreshControl,WebView,View} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';

const updateData = [
  {
    title:"推广消息的标题1",
    date: "2016-02-18",
    link: "www.google.com",
    key:0,
    img: require('./img/chip.jpg'), //just pass the url
  },{
    title:"推广消息的标题2",
    date: "2016-02-19",
    link: "www.google.com",
    key:1,
    img: require('./img/forensics.jpg'),
  },
];

class UpdateDetail extends Component{
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  };

  render() {
    return(
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: this.props.data.link}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
        />
    );
  }
}

class UpdateListItems extends Component{
  static propTypes = {
    data: React.PropTypes.array.isRequired,
  };

  _onPress(data) {
     this.props.navigator.push({
      title: data.title,
      component:UpdateDetail,
      navigationBarHidden: false,
      passProps:{data:data}
    })
  }

  render() {
    const items = this.props.data.map((elem) => {
      return(
        <View key={elem.key} style={styles.updateContainer}>
          <View style={styles.updateItemDate}>
            <Text style={{color:"#FFF",fontSize:12}}>{elem.date}</Text>
          </View>
          <TouchableHighlight underlayColor="#eee" style={styles.updateItem} onPress={() => this._onPress(elem)}>
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
      );
    })
    return(
      <View style={{paddingBottom:20}}>
        {items}
      </View>
    );
  }
}

class UpdateList extends Component{
  static propTypes = {
    data: React.PropTypes.array.isRequired,
  };

  constructor(props){
    super(props);
    this.state = {
      isRefreshing: false,
      loaded: 0,
      rowData: this.props.data,
      refreshTitle: "下拉更新"
    };
  }

  _onRefresh() {
    const data = this.state.rowData;
    this.setState({
      isRefreshing: true,
      refreshTitle: "正在更新"
    });
    Util.get("http://dnafw.com:8100/iosapp/promote",function(resData) {
      if (resData) {
        data.concat(resData.update);
        this.setState({
          loaded: 1,
          isRefreshing: false,
          rowData: data,
          refreshTitle: "更新完毕"
        });
        setTimeout(() => {
          this.setState({
            refreshTitle: "下拉更新"
          });
        }, 500);
      }else{
        this.setState({
          loaded: 1,
          isRefreshing: false,
          refreshTitle: "更新失败"
        });
      }
    })
  }

  render() {
    return(
      <ScrollView showsVerticalScrollIndicator={false} 
      refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            title={this.state.refreshTitle}
            onRefresh={() => this._onRefresh()}
            tintColor="#ddd"
          />
      }>
        <UpdateListItems navigator={this.props.navigator} data={this.state.rowData}></UpdateListItems>
      </ScrollView>
    );
  }
}

export default class extends Component{
  static propTypes = {
    uid: React.PropTypes.string.isRequired,
  };

  componentDidMount() {
    StatusBarIOS.setStyle(0);
    // Util.get("http://dnafw.com:8100/iosapp/promote",function(resData) {
    //     if (resData.update) {
    //       updateData.concat(resData.update);
    //     }else{
    //       console.log("error")
    //     }
    // })
  }

  render(){
    return (
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        initialRoute={{
          title:"推广动态",
          component: UpdateList,
          passProps: {data: updateData, uid:this.props.uid},
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