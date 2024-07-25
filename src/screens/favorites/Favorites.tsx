import {ic_search, ic_shopping_cart} from '@/assets/icons';
import {ButtonMain} from '@/commons';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {FavoriteProductsList} from '@/components';
import {Product} from '@/model/production.model';
import {getDataLocalStorage, setDataLocalStorage} from '@/utils';

type FavoritesProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'TabNavigation'>;
};
const Favorites = ({navigation}: FavoritesProps): JSX.Element => {
  const [favoriteProductList, setFavoriteProductList] = useState<Product[]>([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async (): Promise<void> => {
        try {
          const valueData = await getDataLocalStorage<Product[]>('favorites');
          if (valueData) {
            setFavoriteProductList(valueData);
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
      setDataLocalStorage('myCart', favoriteProductList);
      navigation.navigate('MyCart');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = useCallback(
    async (id: number): Promise<void> => {
      const updateProducts = favoriteProductList.filter(
        product => product.id !== id,
      );
      setFavoriteProductList(updateProducts);

      try {
        setDataLocalStorage('favorites', updateProducts);
      } catch (err) {
        console.error('Failed to update AsyncStorage:', err);
      }
    },
    [favoriteProductList],
  );

  const handleClickItem = useCallback(
    (product: Product): void => {
      navigation.navigate('Product', {product});
    },
    [favoriteProductList],
  );

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
        <FavoriteProductsList
          favoriteProductsList={favoriteProductList}
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
