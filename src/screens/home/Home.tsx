import {ic_search, ic_shopping_cart, ic_star} from '@/assets/icons';
import {CategoryProductList, PopularList} from '@/components';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  img_black_simple_lamp,
  img_coffee_chair,
  img_coffee_table,
  img_minimal_stand,
  img_simple_desk,
} from '@/assets/images';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categoryProductData = [
  {
    id: 1,
    image: img_black_simple_lamp,
    label: 'Black Simple Lamp',
    price: 12.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
    quantity: 1,
  },
  {
    id: 2,
    image: img_minimal_stand,
    label: 'Minimal Stand',
    price: 25.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
    quantity: 1,
  },
  {
    id: 3,
    image: img_coffee_chair,
    label: 'Coffee Chair',
    price: 20.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
    quantity: 1,
  },
  {
    id: 4,
    image: img_simple_desk,
    label: 'Simple Desk',
    price: 50.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
    quantity: 1,
  },
  {
    id: 5,
    image: img_coffee_table,
    label: 'Coffee Table',
    price: 50.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
    quantity: 1,
  },
];

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'TabNavigation'>;
};

const Home = ({navigation}: HomeProps): JSX.Element => {
  const [categoryProductList, setCategoryProductList] = useState<[]>([]);

  useEffect(() => {
    const saveData = async (): Promise<void> => {
      try {
        await AsyncStorage.setItem(
          'categoryProductData',
          JSON.stringify(categoryProductData),
        );
      } catch (err) {
        console.log('Error saving data to AsyncStorage:', err);
      }
    };
    saveData();
  }, []);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const jsonValue = await AsyncStorage.getItem('categoryProductData');

        if (jsonValue != null) {
          setCategoryProductList(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    getData();
  }, []);

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
        <CategoryProductList
          onPress={handleClickItem}
          categoryProductsList={categoryProductList}
        />
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
