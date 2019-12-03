import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import Data from '../components/Data';
import PushNotification from "react-native-push-notification";
var service = new Data()
const { width, height } = Dimensions.get('window');

export default class Insert extends Component {


  
  state = {
    ad: '',
    sifre: '',
  };
  constructor(props) {
    super(props)

    this.state = {
      records: []
    }

    service.init()
  }


componentDidMount(){
  PushNotification.localNotification({
    title: "My Notification Title", // (optional)
    message: "My Notification Message", // (required)
});
}



  kontrol() {
    debugger;
    if (this.state.ad != "" && this.state.sifre != "") {
      service.createTable("aloha", [{
        name: 'id',
        dataType: 'integer',
        isNotNull: true,
        options: 'PRIMARY KEY AUTOINCREMENT'
      }, {
        name: 'name',
        dataType: 'text'
      }, {
        name: 'sifre',
        dataType: 'text'
      }])
      service.insert("aloha", {
        name: this.state.ad,
        sifre: this.state.sifre,
      })
      var result = service.select("aloha")
      console.log(result);
      alert('Kayıt Başarılı.')
      this.setState({
        ad:'',
        sifre:'',
      })
    }
    else {
      alert('Boş Geçilemez!')
      return false;
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: width * 0.88,
            height: height * 0.43,
          }}>
          <Text style={styles.ad}>Ad</Text>
          <TextInput
            style={styles.txtAd}
            onChangeText={text => this.setState({ ad: text })}
            value={this.state.ad}
          />
          <Text style={styles.soyad}>Şifre</Text>
          <TextInput
            style={styles.txtSoyad}
            onChangeText={text => this.setState({ sifre: text })}
            value={this.state.sifre}
          />
          <TouchableOpacity
            onPress={() => this.kontrol()}
            style={styles.btnBox}>
            <View style={styles.btnGonder}>
              <Text style={{ color: 'white', fontSize: 15 }}>Gönder</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3B2C52',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ad: { fontSize: 15, color: 'white' },
  txtAd: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    height: height * 0.06,
  },
  soyad: { fontSize: 15, color: 'white' },
  txtSoyad: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    height: height * 0.06,
  },
  sifre: { fontSize: 15, color: 'white' },
  txtSifre: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    height: height * 0.06,
  },
  btnPhoto: {
    backgroundColor: '#3E8C98',
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGonder: {
    backgroundColor: '#037539',
    width: '50%',
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBox: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "YOUR GCM (OR FCM) SENDER ID",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});