import {ic_add, ic_back, ic_favorites, ic_star} from '@/assets/icons';
import {ButtonMain} from '@/commons';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type CategoryProduct = {
  id: number;
  image: ImageSourcePropType;
  label: string;
  price: number;
  rate: number;
  review: number;
  desc: string;
  quantity: number;
};

type ProductProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Product'>;
  route: RouteProp<RootStackParamsList, 'Product'>;
};

const Product = ({navigation, route}: ProductProps): JSX.Element => {
  const {id, image, label, price, rate, review, desc} = route.params;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const numSre = quantity <= 9 ? '0' : '';

  useEffect(() => {
    const checkIfFavorite = async (): Promise<void> => {
      try {
        const favoriteData = await AsyncStorage.getItem('favorites');
        let favorites = [];

        if (favoriteData) {
          try {
            favorites = JSON.parse(favoriteData);
            if (!Array.isArray(favorites)) {
              favorites = [];
            }
          } catch (error) {
            console.error('Error parsing favorites data:', error);
            favorites = [];
          }
        }

        const isAlreadyFavorite = favorites.some(
          (item: CategoryProduct) => item.id === id,
        );

        setIsFavorite(isAlreadyFavorite);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    checkIfFavorite();
  }, [id]);

  const handleMoreProduct = (): void => {
    setQuantity(quantity + 1);
  };

  const handleLessProduct = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBack = (): void => {
    navigation.goBack();
  };

  const handleAddToCart = async (): Promise<void> => {
    try {
      const newProduct: CategoryProduct = {
        id,
        image,
        label,
        price,
        rate,
        review,
        desc,
        quantity,
      };
      await AsyncStorage.setItem('myCart', JSON.stringify([newProduct]));
      navigation.navigate('MyCart');
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorites = async (): Promise<void> => {
    try {
      const storedData = await AsyncStorage.getItem('categoryProductData');
      if (storedData !== null) {
        let categoryProductData = JSON.parse(storedData);

        const itemToFavorite = categoryProductData.find(
          (item: CategoryProduct) => item.id === id,
        );

        if (itemToFavorite) {
          const favoriteData = await AsyncStorage.getItem('favorites');
          let favorites = [];

          if (favoriteData) {
            try {
              favorites = JSON.parse(favoriteData);
              if (!Array.isArray(favorites)) {
                favorites = [];
              }
            } catch (error) {
              console.error('Error parsing favorites data:', error);
              favorites = [];
            }
          }

          const isAlreadyFavorite = favorites.some(
            (item: CategoryProduct) => item.id === id,
          );

          if (isAlreadyFavorite) {
            favorites = favorites.filter(
              (item: CategoryProduct) => item.id !== id,
            );
            setIsFavorite(false);
          } else {
            favorites.push(itemToFavorite);
            setIsFavorite(true);
          }

          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        }
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.boxTop}>
          <TouchableOpacity style={styles.boxIcBack} onPress={handleBack}>
            <Image style={styles.iconBack} source={ic_back} />
          </TouchableOpacity>

          <Image style={styles.image} source={image} />

          <View style={styles.boxContainer}>
            <View style={styles.boxOne}></View>
            <View style={styles.boxTwo}></View>
            <View style={styles.boxThree}></View>
          </View>

          <View style={styles.boxRectangle}>
            <View style={styles.rectangleOne}></View>
            <View style={styles.rectangleTwo}></View>
            <View style={styles.rectangleThree}></View>
          </View>
        </View>

        <View style={styles.boxBottom}>
          <Text style={styles.txtLabel}>{label}</Text>

          <View style={styles.boxPrice}>
            <Text style={styles.txtPrice}>$ {price}</Text>

            <View style={styles.moreLessContainer}>
              <TouchableOpacity
                style={styles.boxMoreLess}
                onPress={handleMoreProduct}>
                <Image style={styles.iconMore} source={ic_add} />
              </TouchableOpacity>

              <Text style={styles.txtNumber}>
                {numSre}
                {quantity}
              </Text>

              <TouchableOpacity
                style={styles.boxMoreLess}
                onPress={handleLessProduct}>
                <View style={styles.iconLess}></View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rateContainer}>
            <View style={styles.boxRate}>
              <Image style={styles.iconStar} source={ic_star} />
              <Text style={styles.txtRate}>{rate}</Text>
            </View>
            <Text style={styles.txtReviews}>({review} reviews)</Text>
          </View>

          <View style={styles.boxDesc}>
            <Text style={styles.txtDesc}>{desc}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.boxIcFavorites,
            isFavorite && {backgroundColor: colors.primary},
          ]}
          onPress={handleFavorites}>
          <Image
            style={[
              styles.iconFavorites,
              isFavorite && {tintColor: colors.white},
            ]}
            source={ic_favorites}
          />
        </TouchableOpacity>

        <View style={styles.boxButton}>
          <ButtonMain title={'Add to cart'} onPress={handleAddToCart} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  boxIcBack: {
    position: 'absolute',
    top: 10,
    left: 32,
    width: 40,
    height: 40,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 6,
    elevation: 4,
    zIndex: 1,
  },
  iconBack: {
    width: 20,
    height: 20,
  },
  boxTop: {},
  image: {
    width: '88%',
    height: 455,
    resizeMode: 'cover',
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 84,
  },
  boxContainer: {
    position: 'absolute',
    top: 105,
    left: 20,
    backgroundColor: colors.secondary,
    width: 64,
    height: 192,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 4,
  },
  boxOne: {
    width: 34,
    height: 34,
    borderWidth: 4,
    borderColor: colors.grey_2,
    borderRadius: 50,
  },
  boxTwo: {
    width: 34,
    height: 34,
    borderWidth: 4,
    borderColor: colors.blur_grey,
    borderRadius: 50,
    backgroundColor: '#B4916C',
  },
  boxThree: {
    width: 34,
    height: 34,
    borderWidth: 4,
    borderColor: colors.blur_grey,
    borderRadius: 50,
    backgroundColor: '#E4CBAD',
  },
  boxRectangle: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    flexDirection: 'row',
    columnGap: 10,
  },
  rectangleOne: {
    width: 30,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.black_font,
  },
  rectangleTwo: {
    width: 15,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.blur_grey,
  },
  rectangleThree: {
    width: 15,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.blur_grey,
  },

  boxBottom: {
    flex: 1,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  txtLabel: {
    color: colors.black_font,
    fontFamily: 'Gelasio',
    fontSize: 24,
    fontWeight: '500',
  },
  boxPrice: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtPrice: {
    color: colors.black_font,
    fontFamily: 'NunitoSans',
    fontSize: 30,
    fontWeight: '700',
  },
  boxMoreLess: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: colors.gray_5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreLessContainer: {
    flexDirection: 'row',
    columnGap: 15,
    alignItems: 'center',
  },
  iconMore: {
    width: 14,
    height: 14,
  },
  txtNumber: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.9,
  },
  iconLess: {
    width: 14,
    height: 2,
    backgroundColor: colors.primary,
  },

  rateContainer: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
  },
  boxRate: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  iconStar: {
    width: 20,
    height: 20,
    tintColor: colors.yellow,
  },
  txtRate: {
    color: colors.black_font,
    fontFamily: 'NunitoSans',
    fontSize: 18,
    fontWeight: '700',
  },
  txtReviews: {
    color: colors.grey,
    fontFamily: 'NunitoSans',
    fontWeight: '600',
  },

  boxDesc: {
    marginTop: spacing.md,
  },
  txtDesc: {
    color: colors.black_3,
    fontFamily: 'NunitoSans',
    fontWeight: '300',
    textAlign: 'justify',
  },

  buttonContainer: {
    margin: spacing.lg,
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
  },
  boxIcFavorites: {
    padding: spacing.lg,
    backgroundColor: colors.secondary_button_gb,
    borderRadius: 10,
  },
  iconFavorites: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  boxButton: {
    flex: 1,
  },
});

export default Product;
