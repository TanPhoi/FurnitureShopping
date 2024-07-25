import {ic_search, ic_shopping_cart, ic_star} from '@/assets/icons';
import {ProductListHome, PopularList} from '@/components';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Product} from '@/model/production.model';
import {productData} from '@/mock/productData';
import {getDataLocalStorage, setDataLocalStorage} from '@/utils';

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'TabNavigation'>;
};

const Home = ({navigation}: HomeProps): JSX.Element => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const saveData = async (): Promise<void> => {
      setDataLocalStorage('categoryProductData', productData);
    };

    const getData = async (): Promise<void> => {
      const data = await getDataLocalStorage<Product[]>('categoryProductData');
      if (data) {
        setProductList(data);
      }
    };

    saveData();
    getData();
  }, []);

  const handleClickItem = useCallback(
    (product: Product): void => {
      navigation.navigate('Product', {
        product,
      });
    },
    [productList],
  );

  return (
    <View style={styles.root}>
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <Image style={styles.icon} source={ic_search} />
        </TouchableOpacity>
        <View style={styles.tbLabel}>
          <Text style={styles.txtMakeHome}>Make home</Text>
          <Text style={styles.txtBeautiful}>BEAUTIFUL</Text>
        </View>
        <TouchableOpacity>
          <Image style={styles.icon} source={ic_shopping_cart} />
        </TouchableOpacity>
      </View>

      <View style={styles.popularContainer}>
        <View style={styles.boxPopular}>
          <View style={styles.boxIcon}>
            <Image style={styles.iconPopular} source={ic_star} />
          </View>
          <Text style={styles.txtPopular}>Popular</Text>
        </View>

        <View style={styles.popularListContainer}>
          <PopularList />
        </View>
      </View>

      <View style={styles.categoryProduct}>
        <ProductListHome onPress={handleClickItem} productsList={productList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: spacing.lg,
  },

  tabBar: {
    marginTop: spacing.xs,
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
  txtMakeHome: {
    fontSize: 18,
    color: colors.grey_2,
    lineHeight: 25,
    fontFamily: 'Gelasio',
  },
  txtBeautiful: {
    fontSize: 18,
    color: colors.primary,
    lineHeight: 25,
    fontFamily: 'Gelasio',
    fontWeight: '700',
  },

  popularContainer: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    columnGap: 25,
    alignItems: 'center',
    paddingLeft: spacing.lg,
  },

  boxPopular: {
    alignItems: 'center',
  },
  boxIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.black_font,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPopular: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  popularListContainer: {
    flex: 1,
  },
  txtPopular: {
    marginTop: spacing.xs,
    color: colors.primary,
    fontWeight: '600',
    fontFamily: 'NunitoSans',
  },
  categoryProduct: {
    flex: 1,
    marginTop: spacing.lg,
  },
});

export default Home;
