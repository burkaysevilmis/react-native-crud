import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import firebase from 'react-native-firebase';
const {width, height} = Dimensions.get('window');

export default class Login extends Component {
  state = {
    name: '',
    pass: '',
  };
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('before fcmToken: ', fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log('after fcmToken: ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        this.getToken();
      })
      .catch(error => {
        console.log('permission rejected');
      });
  }

  async checkPermission() {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log('Permission granted');
          this.getToken();
        } else {
          console.log('Request Permission');
          this.requestPermission();
        }
      });
  }

  async componentDidMount() {
    this.checkPermission();
  }
  Giris(isim, sifre) {
    let sayac = 0;
    if (isim != '' && sifre != '') {
      axios
        .get('http://www.burkaysevilmis.com/api/Test/GetUser')
        .then(response => {
          response.data.map(veri => {
            if (veri.ad == isim && veri.sifre == sifre) {
              sayac++;
            }
          });
          if (sayac > 0) {
            this.props.navigation.push('List');
          } else {
            alert('Kullanıcı Adı veya Şifre Yanlış!');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('İsim Şifre Boş Geçilemez!');
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <LinearGradient colors={['#000000', '#3B4371']} style={styles.container}>
        <Image
          style={styles.imageLogo}
          source={require('../imgMessage/man2.png')}
        />
        <View style={styles.loginBox}>
          <View style={styles.searchSection}>
            <Image
              style={{paddingRight: 25}}
              resizeMode="contain"
              source={require('../imgMessage/plane.png')}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#BBACAC"
              style={styles.nameText}
              onChangeText={value => this.setState({name: value})}
            />
          </View>
          <View style={styles.searchSection}>
            <Image
              style={{paddingRight: 25}}
              resizeMode="contain"
              source={require('../imgMessage/lock.png')}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#BBACAC"
              style={styles.paswordText}
              onChangeText={value => this.setState({pass: value})}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.Giris(this.state.name, this.state.pass)}
          style={styles.girisBtn}>
          <Text style={styles.logInText}>LOG IN</Text>
        </TouchableOpacity>
        <Text style={styles.forgetPass}>Forget password?</Text>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    width: width * 0.47,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  loginBox: {
    width: width * 0.8,
    height: height * 0.13,
    marginTop: 55,
  },
  nameText: {
    width: width * 0.79,
    height: height * 0.055,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  paswordText: {
    width: width * 0.79,
    height: height * 0.055,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  girisBtn: {
    backgroundColor: '#E33270',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.06,
    borderRadius: 8,
    marginTop: 85,
  },
  logInText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
  forgetPass: {
    color: '#BBACAC',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
  },
});