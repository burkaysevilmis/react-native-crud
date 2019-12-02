import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
const {width, height} = Dimensions.get('window');
const localPhoto = 'http://localhost:35091/Content/base64/';
const photo = 'http://www.burkaysevilmis.com/Content/base64/';
export default class Update extends Component {
  state = {
    ad: '',
    soyad: '',
    sifre: '',
    gorsel: '',
    id: '',
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.setState({
      ad: navigation.getParam('ad'),
      soyad: navigation.getParam('soyad'),
      sifre: navigation.getParam('sifre'),
      gorsel: navigation.getParam('gorsel'),
      id: navigation.getParam('id'),
    });
  }
  openImagePicker() {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      maxWidth: 1000,
      maxHeight: 1000,
      title: 'Fotoğraf',
      takePhotoButtonTitle: 'Fotoğraf Çek',
      cancelButtonTitle: 'Vazgeç',
      chooseFromLibraryButtonTitle: 'Dosyalardan Seç',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // http://www.burkaysevilmis.com/api/Test/PostUser
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        this.setState({
          gorsel: response.data,
        });
      }
    });
  }
  kontrol() {
    if (
      this.state.ad != '' &&
      this.state.soyad != '' &&
      this.state.sifre != '' &&
      this.state.gorsel != ''
    ) {
      axios
        .post('http://www.burkaysevilmis.com/api/Test/UpdateUser', {
          ad: this.state.ad,
          soyad: this.state.soyad,
          sifre: this.state.sifre,
          isactive: true,
          gorsel: this.state.gorsel,
          userID: this.state.id,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      Alert.alert(
        'Kayıt Durumu',
        'Öğrenci Başarıyla Güncellendi.',
        [
          {
            text: 'Tamam',
            onPress: () => this.props.navigation.push('List'),
          },
        ],
        {cancelable: false},
      );
    } else {
      alert('Başarısız');
    }
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <View
          style={{
            width: width * 0.48,
            height: height * 0.23,
          }}>
          <Image
            resizeMode="contain"
            style={{width: '100%', height: '100%'}}
            source={{uri: photo + navigation.getParam('gorsel')}}
          />
        </View>
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
          <Text style={styles.soyad}>Soyad</Text>
          <TextInput
            style={styles.txtSoyad}
            onChangeText={text => this.setState({soyad: text})}
            value={this.state.soyad}
          />
          <Text style={styles.sifre}>Şifre</Text>
          <TextInput
            style={styles.txtSifre}
            onChangeText={text => this.setState({sifre: text})}
            value={this.state.sifre}
          />
          <TouchableOpacity
            onPress={() => this.openImagePicker()}
            style={{marginTop: 25}}>
            <View style={styles.btnPhoto}>
              <Text style={{color: 'white', fontSize: 15}}>Fotoğraf Çek</Text>
            </View>
          </TouchableOpacity>
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
