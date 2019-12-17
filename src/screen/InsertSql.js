import React, {Component} from 'react';
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
import Data from '../components/Data';
var service = new Data();
const {width, height} = Dimensions.get('window');

export default class Insert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      ad: '',
      sifre: '',
      idd: 78,
      adko: 100,
    };

    service.init();
  }

  guidGenerator() {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  kontrol() {
    if (this.state.ad != '' && this.state.sifre != '') {
      service.createTable('OfflineData', [
        {
          name: 'id',
          dataType: 'integer',
          isNotNull: true,
          options: 'PRIMARY KEY AUTOINCREMENT',
        },
        {
          name: 'query',
          dataType: 'text',
        },
      ]);
      service.insert('OfflineData', {
        query: `INSERT INTO Visit (id,ad) VALUES (${this.state.adko +
          '-' +
          this.guidGenerator() +
          '-' +
          this.state.idd},"${this.state.ad}")`,
      });
      var result = service.select('OfflineData');
      console.log(result);
      alert('Kayıt Başarılı.');
      this.setState({
        ad: '',
        sifre: '',
      });
    } else {
      alert('Boş Geçilemez!');
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
            onChangeText={text => this.setState({ad: text})}
            value={this.state.ad}
          />
          <Text style={styles.soyad}>Şifre</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.txtSoyad}
            onChangeText={text => this.setState({sifre: text})}
            value={this.state.sifre}
          />
          <TouchableOpacity
            onPress={() => this.kontrol()}
            style={styles.btnBox}>
            <View style={styles.btnGonder}>
              <Text style={{color: 'white', fontSize: 15}}>Gönder</Text>
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
  ad: {fontSize: 15, color: 'white'},
  txtAd: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    height: height * 0.06,
  },
  soyad: {fontSize: 15, color: 'white'},
  txtSoyad: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    height: height * 0.06,
  },
  sifre: {fontSize: 15, color: 'white'},
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
