var Util = require('./utils');
var Icon = require('react-native-vector-icons/Ionicons');
var Store = require('./store');
var {User} = require('./user');
var Order = require('./order');
var Update = require('./update');

import React, {
  TabBarIOS,
  StyleSheet,
  StatusBarIOS,
  Text,
  View
} from 'react-native';

/**
 * isFirstTime:
 *   -true. Only User tab is enabled. User needs to fill
 *   out the info before using other functions.
 *   -false. fully functioned. 
 */

var Bar = React.createClass({
  getInitialState: function () {
    StatusBarIOS.setStyle(0);
    return {
      selectedTab: this.props.isFirstTime==="1"? '我的帐户':'华大商城',
      isFirstTime: this.props.isFirstTime==="1"? true: false
    }
  },
  changeTab(tabName) {
    if (!this.state.isFirstTime) {
      this.setState({
        selectedTab: tabName
      });
    };

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
        title="推广动态"
        iconName="ios-eye-outline"
        selectedIconName="ios-eye"
        onPress={ () => this.changeTab('推广动态') }
        selected={ this.state.selectedTab === '推广动态'}>
          <Update></Update>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="全部订单"
        iconName="ios-list-outline"
        selectedIconName="ios-list"
        onPress={ () => this.changeTab('全部订单') }
        selected={ this.state.selectedTab === '全部订单'}>
          <Order></Order>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="我的帐户"
        iconName="ios-person-outline"
        selectedIconName="ios-person"
        onPress={ () => this.changeTab('我的帐户') }
        selected={ this.state.selectedTab === '我的帐户'}>
          <User isFirstTime={this.state.isFirstTime} callbackLogout={this.props.callbackLogout}></User>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({

});


module.exports = Bar;


