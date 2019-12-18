/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

export default class WebViewScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView source={{uri: 'https://github.com/facebook/react-native'}} />
      </SafeAreaView>
    );
  }
}
