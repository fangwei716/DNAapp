/**
 * from react native tutorial
 */
'use strict';
import React,{PixelRatio} from 'react-native';
import Dimensions from 'Dimensions';

const Util = {
  //单位像素
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  //屏幕尺寸
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  //get 请求
  get(url, callback) {
    fetch(url,{headers:{'Cache-Control': 'no-cache'}})  
    .then((response) => {
      console.log(response)
      return response.json() // respose a json object
    })
    .then((responseData) => {
      callback(responseData);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  //post请求
  post(url, data, callback) {
    console.log(data);
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then((response) => {
      console.log(response)
      return response.json() // respose a json object
    })
    .then((responseData) => {
      callback(responseData);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE',
};

export default Util;