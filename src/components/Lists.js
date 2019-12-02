import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {width, height} = Dimensions.get('window');
const localPhoto = 'http://localhost:35091/Content/base64/';
const photo = 'http://www.burkaysevilmis.com/Content/base64/';
const localDelete = 'http://localhost:35091/api/Test/Delete/';
const delete1 = 'http://www.burkaysevilmis.com/api/Test/Delete/';
export default class Lists extends Component {
  state = {
    animating: true,
  };
  Sil(id, text) {
    const {navigate} = this.props.navigation;
    Alert.alert(
      'Öğrenci Silme!',
      text + ' Silmek İstiyormusunuz?',
      [
        {
          text: 'Vazgeç',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () =>
            axios.get(delete1 + id).then(response => {
              console.log(JSON.stringify(response));
              if (true) {
                this.props.navigation.navigate('List');
              }
            }),
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={styles.listBox}>
        <ActivityIndicator
          animating={this.state.animating}
          color="#bc2b78"
          size="small"
        />
        <View style={styles.imageBox1}>
          <View style={styles.imageBox2}>
            <Image
              onLoadEnd={() => this.setState({animating: false})}
              style={styles.Image}
              resizeMode="cover"
              source={{
                uri: photo + this.props.img,
              }}
            />
          </View>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
        <View style={styles.updateBox1}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Update', {
                ad: this.props.text,
                soyad: this.props.soyad,
                sifre: this.props.sifre,
                gorsel: this.props.img,
                id: this.props.id,
              });
            }}>
            <View style={styles.updateBox2}>
              <Icon name="pen" size={22} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.deleteBox1}>
          <TouchableOpacity
            onPress={() => this.Sil(this.props.id, this.props.text)}>
            <View style={styles.deleteBox2}>
              <Icon name="trash" size={22} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listBox: {
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: 'white',
    marginTop: 44,
    borderRadius: 12,
    flexDirection: 'row',
  },
  imageBox1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox2: {
    width: '60%',
    height: '80%',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  textBox: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  updateBox1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBox2: {
    width: '60%',
    height: '40%',
  },
  deleteBox1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBox2: {
    width: '60%',
    height: '40%',
  },
});
