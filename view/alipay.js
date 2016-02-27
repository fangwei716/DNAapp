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
          url={"http://www.alipay.com"}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          style={{marginTop:60}}/>
    )
  }
})

module.exports = Alipay;


