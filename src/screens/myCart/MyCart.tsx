import {ic_next} from '@/assets/icons';
import {ButtonMain} from '@/commons';
import TabBarMain from '@/commons/tabBars/TabBarMain';
import BuyProductList from '@/components/myCarts/BuyProductList';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

type MyCartProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'MyCart'>;
};

const MyCart = ({navigation}: MyCartProps): JSX.Element => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const jsonValue = await AsyncStorage.getItem('myCart');

        if (jsonValue !== null) {
          const products = JSON.parse(jsonValue);
          setProductList(products);
          calculateTotalPrice(products);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const calculateTotalPrice = (products: Product[]): void => {
    const total = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );
    setTotalPrice(total);
  };

  const handleQuantityChange = (id: number, newQuantity: number): void => {
    const updatedProducts = productList.map((product: Product) => {
      if (product.id === id) {
        return {...product, quantity: newQuantity};
      }
      return product;
    });

    setProductList(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const handleDeleteItem = async (id: number): Promise<void> => {
    const updateProducts = productList.filter(product => product.id !== id);
    setProductList(updateProducts);

    calculateTotalPrice(updateProducts);

    try {
      await AsyncStorage.setItem('myCart', JSON.stringify(updateProducts));
    } catch (err) {
      console.error('Failed to update AsyncStorage:', err);
    }
  };

  const handleMyCard = (): void => {};
  const handleBack = (): void => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <View>
        <TabBarMain title={'My cart'} onPress={handleBack} />
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View style={styles.savedProductsContainer}>
          <BuyProductList
            buyProductList={productList}
            onPress={function (
              id: number,
              image: ImageSourcePropType,
              label: string,
              price: number,
              rate: number,
              review: number,
              desc: string,
            ): void {
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
