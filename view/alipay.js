import React, {
  WebView
} from 'react-native';

/**
 * Alipay
 * - Used for Alipay payment
 * - link varies. Refer to the alipay API
 */

var Alipay = React.createClass({
  render: function () {
    return(
           <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: "http://www.alipay.com"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}/>
    )
  }
})

module.exports = Alipay;


