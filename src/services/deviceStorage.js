import AsyncStorage from '@react-native-community/async-storage';

const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async getStorageItem(key) {
    var value = await AsyncStorage.getItem(key);
    return value;
  },

  async removeItem(key) {
    await AsyncStorage.removeItem(key).then(res => console.log(res));
  },
};

export default deviceStorage;
