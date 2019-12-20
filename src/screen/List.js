import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  ScrollView,
  Button,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {width, height} = Dimensions.get('window');
import Lists from '../components/Lists';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
const getuserlocal = 'http://localhost:35091/api/Test/GetUser';
const url = 'http://www.burkaysevilmis.com/api/Test/GetUser';
export default class List extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Öğrenci Listesi',
      headerRight: () => (
        <Icon
          onPress={() => navigation.navigate('Insert')}
          style={{marginRight: 20}}
          name="plus"
          size={22}
        />
      ),
      headerLeft: () => (
        <Icon
          onPress={() => navigation.navigate('Login')}
          name="sign-out-alt"
          style={{marginLeft: 20}}
          size={22}
        />
      ),
    };
  };
  state = {
    veri: [],
    animating: true,
    refreshing: false,
  };
  VeriGetir() {
    axios.get(url).then(
      function(response) {
        this.setState({
          veri: response.data,
          animating: false,
          refreshing: false,
        });
        console.log(this.state.veri);
      }.bind(this),
    );
  }
  hanldeRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.VeriGetir();
      },
    );
  };

  componentDidMount() {
    this.VeriGetir();
  }

  render() {
    var liste = [];
    for (let index = 0; index < this.state.veri.length; index++) {
      liste[index] = (
        <Lists
          img={this.state.veri[index].gorsel}
          text={this.state.veri[index].ad}
          id={this.state.veri[index].userID}
          soyad={this.state.veri[index].soyad}
          sifre={this.state.veri[index].sifre}
          navigation={this.props.navigation}
        />
      );
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={this.state.animating}
          color="#bc2b78"
          size="large"
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.hanldeRefresh}
            />
          }>
          {liste}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3B2C52',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
