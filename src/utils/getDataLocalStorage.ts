import AsyncStorage from '@react-native-async-storage/async-storage';

// const getDataLocalStorage = async <T>(key: string): Promise<T | null> => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(key);
//     return jsonValue ? (JSON.parse(jsonValue) as T) : null;
//   } catch (error) {
//     console.error('Error fetching or parsing data from AsyncStorage:', error);
//     return null;
//   }
// };

// export default getDataLocalStorage;
const getDataLocalStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error('Error fetching data from AsyncStorage:', error);
    return null;
  }
};

export default getDataLocalStorage;
