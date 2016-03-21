'use strict';
import React, {Component,TabBarIOS,StatusBarIOS,Text,View} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Store from './store';
import User from './user';
import Order from './order';
import Update from './update';

/**
 * isFirstTime:
 *   -true. Only User tab is enabled. User needs to fill
 *   out the info before using other functions.
 *   -false. fully functioned. 
 */

export default class extends Component{
  static defaultProps = {
    isFirstTime: "0"
  };

  static propTypes = {
    uid: React.PropTypes.string.isRequired,
    isFirstTime: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.isFirstTime==="1"? '我的帐户':'华大商城',
      isFirstTime: this.props.isFirstTime==="1"? true: false,
      uid: this.props.uid,
    };
  }

  componentDidMount() {
    StatusBarIOS.setStyle(0);
  }

  _changeTab(tabName) {
    if (!this.state.isFirstTime) {
      this.setState({
        selectedTab: tabName,
      });
    };
  }

  render() {
    return (
      <TabBarIOS
        tintColor="#1E868C">
        <Icon.TabBarItem
        title="华大商城"
        iconName="ios-home-outline"
        selectedIconName="ios-home"
        onPress={ () => this._changeTab('华大商城') }
        selected={ this.state.selectedTab === '华大商城' }>
          <Store/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="推广动态"
        iconName="ios-eye-outline"
        selectedIconName="ios-eye"
        onPress={ () => this._changeTab('推广动态') }
        selected={ this.state.selectedTab === '推广动态'}>
          <Update/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="全部订单"
        iconName="ios-list-outline"
        selectedIconName="ios-list"
        onPress={ () => this._changeTab('全部订单') }
        selected={ this.state.selectedTab === '全部订单'} >
          <Order/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="我的帐户"
        iconName="ios-person-outline"
        selectedIconName="ios-person"
        onPress={ () => this._changeTab('我的帐户') }
        selected={ this.state.selectedTab === '我的帐户'} >
          <User uid={this.state.uid} isFirstTime={this.state.isFirstTime} callbackLogout={this.props.callbackLogout}/>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

