import {ic_add, ic_back, ic_favorites, ic_star} from '@/assets/icons';
import {ButtonMain} from '@/commons';
import {RootMainStackParamsList} from '@/routers/MainStackNavigator';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ProductProps = {
  navigation: NativeStackNavigationProp<RootMainStackParamsList, 'Product'>;
  route: RouteProp<RootMainStackParamsList, 'Product'>;
};
const Product = ({navigation, route}: ProductProps): JSX.Element => {
  const {id, image, label, price, rate, review, desc} = route.params;
  const [count, setCount] = useState<number>(1);
  const numSre = count <= 9 ? '0' : '';
  const handleMoreProduct = () => {
    setCount(count + 1);
  };
  const handleLessProduct = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.boxTop}>
          <TouchableOpacity style={styles.boxIcBack}>
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
                {count}
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
        <TouchableOpacity style={styles.boxIcFavorites}>
          <Image style={styles.iconFavorites} source={ic_favorites} />
        </TouchableOpacity>

        <View style={styles.boxButton}>
          <ButtonMain
            title={'Add to cart'}
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
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
