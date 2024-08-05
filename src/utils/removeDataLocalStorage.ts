import {REMOVE_DATA_ERROR} from '@/constants/message.constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeDataLocalStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(REMOVE_DATA_ERROR, error);
    throw error;
  }
};

export default removeDataLocalStorage;
