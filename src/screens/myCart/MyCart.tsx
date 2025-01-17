import {ic_next} from '@/assets/icons';
import {ButtonMain, Header} from '@/commons';
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
import {Product} from '@/model/production.model';
import {
  getDataLocalStorage,
  removeDataLocalStorage,
  setDataLocalStorage,
} from '@/utils';
import {useFocusEffect} from '@react-navigation/native';
import {
  ADD_DATA_ERROR,
  GET_DATA_ERROR,
  REMOVE_DATA_ERROR,
} from '@/constants/message.constant';
import {DeliveredOrder} from '@/model/deliveredOrder.model';

type MyCartProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'MyCart'>;
};

const MyCart = ({navigation}: MyCartProps): JSX.Element => {
  const [productList, setProductList] = useState<Product[]>([]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        removeDataLocalStorage('myCart')
          .then(() => {
            setProductList([]);
          })
          .catch(error => {
            console.error(REMOVE_DATA_ERROR, error);
          });
      };
    }, []),
  );

  useEffect(() => {
    const getMyCartData = (): void => {
      getDataLocalStorage<Product[]>('myCart')
        .then(jsonValue => {
          if (jsonValue) {
            setProductList(jsonValue);
          }
        })
        .catch(error => {
          console.error(GET_DATA_ERROR, error);
        });
    };

    getMyCartData();
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

  const handleDeleteProduct = useCallback(
    (id: number): void => {
      const updateProducts = productList.filter(product => product.id !== id);
      setProductList(updateProducts);

      try {
        setDataLocalStorage('myCart', updateProducts);
      } catch (err) {
        console.error(ADD_DATA_ERROR, err);
      }
    },
    [productList],
  );

  const totalQuantity = useMemo(() => {
    return productList.reduce((sum, product) => sum + product.quantity, 0);
  }, [productList]);

  const getCurrentDate = (): string => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCheckOut = (): void => {
    getDataLocalStorage<DeliveredOrder[]>('orderSuccess')
      .then(existingOrders => {
        if (!existingOrders) {
          existingOrders = [];
        }
        const newId = Math.random();
        const newOrder: DeliveredOrder = {
          id: newId,
          time: getCurrentDate(),
          quantity: totalQuantity,
          totalAmount: totalPrice,
          type: 'processing',
        };
        existingOrders.push(newOrder);
        setDataLocalStorage('orderSuccess', existingOrders);
        navigation.navigate('OrderSuccess');
      })
      .catch(err => {
        console.error(GET_DATA_ERROR, err);
      });
  };

  const handleBack = (): void => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <View>
        <Header title={'My cart'} onPress={handleBack} />
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View style={styles.savedProductsContainer}>
          <ProductListMyCart
            productList={productList}
            onQuantityChange={handleQuantityChange}
            onDeleteProduct={handleDeleteProduct}
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
            <Text style={styles.txtPrice}>{`$ ${totalPrice.toFixed(2)}`}</Text>
          </View>

          <ButtonMain title={'Check out'} onPress={handleCheckOut} />
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
    marginBottom: spacing.lg,
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
});

export default MyCart;
