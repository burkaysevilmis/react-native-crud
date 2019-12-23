/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
const {width, height} = Dimensions.get('window');

export default class Login extends Component {
  componentDidMount() {
    var x = deviceStorage.getStorageItem('token');
    console.log(x._55);
    if (x._55 !== null) {
      this.props.navigation.push('List');
    } else {
      false;
    }
  }
  state = {
    name: '',
    pass: '',
  };
  Giris(isim, sifre) {
    if (isim != '' && sifre != '') {
      axios
        .post('http://localhost:3000/authenticate/', {
          username: isim,
          password: sifre,
        })
        .then(response => {
          if (response.data.status == true) {
            deviceStorage.saveItem('token', response.data.token);
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#E33270'}}>
        <LinearGradient
          colors={['#000000', '#3B4371']}
          style={styles.container}>
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
                secureTextEntry={true}
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
      </SafeAreaView>
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
    height: height * 0.08,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  paswordText: {
    width: width * 0.79,
    height: height * 0.08,
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
