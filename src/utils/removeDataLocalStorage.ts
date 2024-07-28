import {message} from '@/constants/message.contant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeDataLocalStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(message.REMOVE, error);
    throw error;
  }
};

export default removeDataLocalStorage;
