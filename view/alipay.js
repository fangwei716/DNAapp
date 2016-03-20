import React, {Component,WebView} from 'react-native';

/**
 * Alipay
 * - Used for Alipay payment
 * - link varies. Refer to the alipay API
 */

export default class extends Component{
  render() {
    return(
      <WebView
        automaticallyAdjustContentInsets={false}
        url={"http://www.alipay.com"}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
        style={{marginTop:60}}
      />
    );
  }
}

