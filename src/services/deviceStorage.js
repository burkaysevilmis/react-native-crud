import AsyncStorage from '@react-native-community/async-storage';

const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async getItem(key) {
    await AsyncStorage.getItem(key).then(res => console.log(res));
  },

  async removeItem(key) {
    await AsyncStorage.getItem(key).then(res => console.log(res));
  },
};

export default deviceStorage;
