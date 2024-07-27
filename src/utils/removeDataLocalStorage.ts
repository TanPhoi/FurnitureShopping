import AsyncStorage from '@react-native-async-storage/async-storage';

const removeDataLocalStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error remove data to AsyncStorage:', error);
    throw error;
  }
};

export default removeDataLocalStorage;
