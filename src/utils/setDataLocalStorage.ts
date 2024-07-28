import {message} from '@/constants/message.contant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setDataLocalStorage = async <T>(key: string, data: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(message.SET, error);
    throw error;
  }
};

export default setDataLocalStorage;
