import {ic_search, ic_shopping_cart} from '@/assets/icons';
import {ButtonMain} from '@/commons';
import {SavedProductsList} from '@/components';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

type Product = {
  id: number;
  image: ImageSourcePropType;
  label: string;
  price: number;
  rate: number;
  review: number;
  desc: string;
  quantity: number;
};
type FavoritesProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'TabNavigation'>;
};
const Favorites = ({navigation}: FavoritesProps): JSX.Element => {
  const [saveProductList, setSaveProductList] = useState<Product[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async (): Promise<void> => {
        try {
          const valueData = await AsyncStorage.getItem('favorites');
          if (valueData !== null) {
            setSaveProductList(JSON.parse(valueData));
          }
        } catch (error) {
          console.error('Error fetching data from AsyncStorage:', error);
        }
      };

      getData();
    }, []),
  );

  const handleAddToMyCard = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('myCart', JSON.stringify(saveProductList));
      navigation.navigate('MyCart');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = async (id: number): Promise<void> => {
    const updateProducts = saveProductList.filter(product => product.id !== id);
    setSaveProductList(updateProducts);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updateProducts));
    } catch (err) {
      console.error('Failed to update AsyncStorage:', err);
    }
  };

  const handleClickItem = (
    id: number,
    image: ImageSourcePropType,
    label: string,
    price: number,
    rate: number,
    review: number,
    desc: string,
    quantity: number,
  ): void => {
    navigation.navigate('Product', {
      id,
      image,
      label,
      price,
      rate,
      review,
      desc,
      quantity,
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <Image style={styles.icon} source={ic_search} />
        </TouchableOpacity>
        <Text style={styles.txtFavorites}>Favorites</Text>
        <TouchableOpacity>
          <Image style={styles.icon} source={ic_shopping_cart} />
        </TouchableOpacity>
      </View>

      <View style={styles.savedProductsContainer}>
        <SavedProductsList
          savedProductsList={saveProductList}
          onPress={handleClickItem}
          onPressDelete={handleDeleteItem}
        />
      </View>

      <View style={styles.boxButton}>
        <ButtonMain title={'Add all to my cart'} onPress={handleAddToMyCard} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabBar: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
  },
  tbLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtFavorites: {
    fontSize: 16,
    color: colors.black_font,
    fontFamily: 'Merriweather',
    fontWeight: '700',
  },
  savedProductsContainer: {
    marginTop: spacing.lg,
  },
  boxButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
  },
});

export default Favorites;
