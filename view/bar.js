var Util = require('./utils')
var Icon = require('react-native-vector-icons/Ionicons');
var Store = require('./store')
var User = require('./user')

import React, {
  TabBarIOS,
  StyleSheet,
  StatusBarIOS,
  Text,
  View
} from 'react-native';

var Bar = React.createClass({
  getInitialState: function () {
    StatusBarIOS.setStyle(0);
    return {
      selectedTab: '我的帐户'
    }
  },
  changeTab(tabName) {
    this.setState({
      selectedTab: tabName
    });
  },
  render: function(){
    return (
      <TabBarIOS
        tintColor="#1E868C">
        <Icon.TabBarItem
        title="华大商城"
        iconName="ios-home-outline"
        selectedIconName="ios-home"
        onPress={ () => this.changeTab('华大商城') }
        selected={ this.state.selectedTab === '华大商城' }>
          <Store></Store>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="订单动态"
        iconName="ios-eye-outline"
        selectedIconName="ios-eye"
        onPress={ () => this.changeTab('订单动态') }
        selected={ this.state.selectedTab === '订单动态'}>
          <View><Text></Text></View>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="全部订单"
        iconName="ios-list-outline"
        selectedIconName="ios-list"
        onPress={ () => this.changeTab('全部订单') }
        selected={ this.state.selectedTab === '全部订单'}>
          <View><Text></Text></View>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="我的帐户"
        iconName="ios-person-outline"
        selectedIconName="ios-person"
        onPress={ () => this.changeTab('我的帐户') }
        selected={ this.state.selectedTab === '我的帐户'}>
          <User></User>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({

});


module.exports = Bar;


