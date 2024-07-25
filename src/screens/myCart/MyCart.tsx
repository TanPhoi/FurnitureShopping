import {ic_next} from '@/assets/icons';
import {ButtonMain, HeaderMain} from '@/commons';
import ProductListMyCart from '@/components/myCarts/ProductList';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '@/model/production.model';
import {getDataLocalStorage, setDataLocalStorage} from '@/utils';

type MyCartProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'MyCart'>;
};

const MyCart = ({navigation}: MyCartProps): JSX.Element => {
  const [productList, setProductList] = useState<Product[]>([]);
  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const jsonValue = await getDataLocalStorage<Product[]>('myCart');

        if (jsonValue) {
          setProductList(jsonValue);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const totalPrice = useMemo(() => {
    return productList.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );
  }, [productList]);

  const handleQuantityChange = useCallback(
    (id: number, newQuantity: number): void => {
      const updatedProducts = productList.map((product: Product) => {
        if (product.id === id) {
          return {...product, quantity: newQuantity};
        }
        return product;
      });

      setProductList(updatedProducts);
    },
    [productList],
  );

  const handleDeleteItem = useCallback(
    async (id: number): Promise<void> => {
      const updateProducts = productList.filter(product => product.id !== id);
      setProductList(updateProducts);

      try {
        setDataLocalStorage('myCart', updateProducts);
      } catch (err) {
        console.error('Failed to update AsyncStorage:', err);
      }
    },
    [productList],
  );

  const handleMyCard = (): void => {};

  const handleBack = (): void => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <View>
        <HeaderMain title={'My cart'} onPress={handleBack} />
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View style={styles.savedProductsContainer}>
          <ProductListMyCart
            productList={productList}
            onPress={function (product: Product): void {
              throw new Error('Function not implemented.');
            }}
            onQuantityChange={handleQuantityChange}
            onDeleteItem={handleDeleteItem}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.boxTxtInput}>
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your promo code"
            />

            <TouchableOpacity style={styles.boxIcon}>
              <Image style={styles.icon} source={ic_next} />
            </TouchableOpacity>
          </View>

          <View style={styles.boxTotal}>
            <Text style={styles.txtTotal}>Total:</Text>
            <Text style={styles.txtPrice}>{`$ ${totalPrice}.00`}</Text>
          </View>

          <View style={styles.boxButton}>
            <ButtonMain title={'Check out'} onPress={handleMyCard} />
          </View>
        </View>
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

  savedProductsContainer: {
    flex: 1,
    marginBottom: spacing.xs,
  },

  bottomContainer: {
    paddingHorizontal: spacing.lg,
    rowGap: 20,
    marginBottom: 20,
  },
  boxTxtInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: colors.secondary,
    elevation: 2,
  },
  txtInput: {
    paddingHorizontal: spacing.lg,
    flex: 1,
  },
  boxIcon: {
    width: 44,
    height: 44,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
    resizeMode: 'contain',
  },

  boxTotal: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTotal: {
    color: colors.grey,
    fontFamily: 'NunitoSans',
    fontSize: 20,
    fontWeight: '700',
  },
  txtPrice: {
    color: colors.black_font,
    fontFamily: 'NunitoSans',
    fontSize: 20,
    fontWeight: '700',
  },

  boxButton: {},
});

export default MyCart;
