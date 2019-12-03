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
